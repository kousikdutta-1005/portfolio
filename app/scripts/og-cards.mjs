/**
 * Social card generator.
 *
 * Every route gets its own 1200x630 card instead of all 36 sharing one image.
 * Cards are drawn in real Chrome from the site's own tokens, then committed, so
 * a normal `npm run build` needs no browser. Run this after adding an article:
 *
 *   npm run og
 *
 * check-og.mjs fails the build if a route is missing its card, so forgetting is
 * caught rather than shipped.
 */

import { mkdir, readdir, unlink } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { cardSpecs } from "./lib/og.mjs"
import { renderCard } from "./lib/og-template.mjs"

const OUT = new URL("../public/assets/og/", import.meta.url).pathname
const QUALITY = 88

// Cards are drawn at 2x. Platforms re-encode what they fetch, and handing them
// a 1200px JPEG to re-compress produced a visibly soft preview; giving them
// twice the pixels means their downscale is the last lossy step, not the second.
const SCALE = 2

const CHROME_PATHS = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
]

let chromium
try {
  ;({ chromium } = await import("playwright-core"))
} catch {
  console.error(
    "og-cards needs playwright-core to drive Chrome.\n" +
      "  npm i -D playwright-core\n" +
      "Cards are committed, so this is only needed when regenerating them."
  )
  process.exit(1)
}

const executablePath = CHROME_PATHS.find((path) => existsSync(path))
if (!executablePath) {
  console.error(`No Chrome or Chromium found. Looked in:\n${CHROME_PATHS.map((p) => `  ${p}`).join("\n")}`)
  process.exit(1)
}

const specs = await cardSpecs()
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: SCALE,
})

const failures = []
const written = new Set()

for (const spec of specs) {
  const html = renderCard(spec)
  await page.setContent(html, { waitUntil: "load" })
  await page.waitForTimeout(180)

  // A clipped card is worse than a plain one, so refuse to write it.
  const overflow = await page.evaluate(() => ({
    x: document.body.scrollWidth - document.body.clientWidth,
    y: document.body.scrollHeight - document.body.clientHeight,
  }))
  if (overflow.x > 1 || overflow.y > 1) {
    failures.push(`${spec.slug} overflows by ${overflow.x}px wide, ${overflow.y}px tall.`)
    continue
  }

  const file = join(OUT, `${spec.slug}.jpg`)
  await page.screenshot({ path: file, type: "jpeg", quality: QUALITY })
  written.add(`${spec.slug}.jpg`)
}

await browser.close()

// Drop cards for articles that no longer exist, so the folder cannot silently grow.
for (const name of await readdir(OUT)) {
  if (name.endsWith(".jpg") && !written.has(name)) {
    await unlink(join(OUT, name))
    console.log(`  removed stale ${name}`)
  }
}

if (failures.length > 0) {
  console.error(`\nog-cards failed:\n${failures.map((line) => `  ${line}`).join("\n")}`)
  process.exit(1)
}

console.log(`Wrote ${written.size} social cards to public/assets/og/.`)
