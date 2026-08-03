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
 * preview that is slow to load is a link preview nobody sees.
 */

import { readdir, readFile, stat } from "node:fs/promises"
import { join } from "node:path"
import { cardSpecs, CARD_DIR } from "./lib/og.mjs"

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

let present = new Set()
try {
  present = new Set(await readdir(OUT))
} catch {
  failures.push(`public/${CARD_DIR}/ does not exist. Run \`npm run og\`.`)
}

for (const { slug } of specs) {
  const name = `${slug}.jpg`
  if (!present.has(name)) {
    failures.push(`${CARD_DIR}/${name} is missing. Run \`npm run og\`.`)
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

const expected = new Set(specs.map(({ slug }) => `${slug}.jpg`))
for (const name of present) {
  if (name.endsWith(".jpg") && !expected.has(name)) {
    failures.push(`${CARD_DIR}/${name} has no matching route. Run \`npm run og\` to clear it.`)
  }
}

if (failures.length > 0) {
  console.error(`Social card check failed:\n${failures.map((line) => `  ${line}`).join("\n")}`)
  process.exit(1)
}

console.log(`Social cards: ${specs.length} routes, each with its own ${CARD_WIDTH}x${CARD_HEIGHT} card, all within budget.`)
