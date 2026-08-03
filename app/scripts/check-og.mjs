/**
 * Social card gate.
 *
 * The site used to point every one of its 36 routes at a single image, so a
 * shared link never told you which page it was. Now each route has its own
 * card. This fails the build when a route is missing one — the failure mode
 * being guarded against is adding a journal article, forgetting `npm run og`,
 * and shipping 26 articles that all share the same picture.
 *
 * It also holds the cards to the social-card weight budget, since a link
 * preview that is slow to load is a link preview nobody sees, and checks that
 * every card is reachable through the content-hashed manifest. The hash is what
 * lets a card be corrected after it has been shared: platforms cache the copy
 * they derive from an image URL and do not re-derive it when the bytes change.
 */

import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { cardSpecs, loadManifest, CARD_DIR } from "./lib/og.mjs"

const OUT = new URL(`../public/${CARD_DIR}/`, import.meta.url).pathname
const MAX_CARD_KB = 400
const CARD_WIDTH = 2400
const CARD_HEIGHT = 1260

/**
 * JPEG dimensions from the frame header, so a card that silently drops back to
 * 1x is caught. Walks the marker segments to the SOF, which carries the size.
 */
function jpegSize(buffer) {
  let offset = 2
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null
    const marker = buffer[offset + 1]
    // SOF0-SOF15, excluding the non-frame markers DHT, JPG and DAC.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
    }
    offset += 2 + buffer.readUInt16BE(offset + 2)
  }
  return null
}

const failures = []
const specs = await cardSpecs()

let manifest = {}
let present = new Set()
try {
  manifest = await loadManifest()
  present = new Set(await readdir(OUT))
} catch {
  failures.push(`public/${CARD_DIR}/ is missing or has no manifest.json. Run \`npm run og\`.`)
}

for (const { slug } of specs) {
  const name = manifest[slug]
  if (!name) {
    failures.push(`No card for "${slug}" in the manifest. Run \`npm run og\`.`)
    continue
  }
  if (!present.has(name)) {
    failures.push(`${CARD_DIR}/${name} is in the manifest but not on disk. Run \`npm run og\`.`)
    continue
  }
  const kb = (await stat(join(OUT, name))).size / 1024
  if (kb > MAX_CARD_KB) {
    failures.push(`${CARD_DIR}/${name} is ${kb.toFixed(0)} KB, over the ${MAX_CARD_KB} KB card budget.`)
  }

  const size = jpegSize(await readFile(join(OUT, name)))
  if (!size) {
    failures.push(`${CARD_DIR}/${name} is not a readable JPEG.`)
  } else if (size.width !== CARD_WIDTH || size.height !== CARD_HEIGHT) {
    failures.push(
      `${CARD_DIR}/${name} is ${size.width}x${size.height}, expected ${CARD_WIDTH}x${CARD_HEIGHT}. Run \`npm run og\`.`
    )
  }
}

// A superseded card left on disk is dead weight, and the hashed filenames mean
// every edit leaves one behind.
const expected = new Set(Object.values(manifest))
for (const name of present) {
  if (name.endsWith(".jpg") && !expected.has(name)) {
    failures.push(`${CARD_DIR}/${name} is not in the manifest. Run \`npm run og\` to clear it.`)
  }
}

// index.html is what a crawler reads before any JavaScript runs, and it is the
// one place a card URL is still written as a literal.
if (manifest.home) {
  const html = await readFile(new URL("../index.html", import.meta.url).pathname, "utf8")
  for (const [, url] of html.matchAll(
    /<meta (?:property="og:image"|name="twitter:image") content="([^"]*)"/gu
  )) {
    if (!url.endsWith(`/${CARD_DIR}/${manifest.home}`)) {
      failures.push(`index.html points at ${url}, which is not the current home card. Run \`npm run og\`.`)
    }
  }
}

if (failures.length > 0) {
  console.error(`Social card check failed:\n${failures.map((line) => `  ${line}`).join("\n")}`)
  process.exit(1)
}

console.log(`Social cards: ${specs.length} routes, each with its own ${CARD_WIDTH}x${CARD_HEIGHT} card, all within budget.`)
