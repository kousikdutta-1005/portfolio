/**
 * Asset weight budget.
 *
 * The site once shipped 111 MB of images because design-tool exports went into
 * the repo untouched: photographs saved as lossless PNG at several times their
 * rendered size. The homepage alone was 8 MB. Nothing caught it, because
 * nothing was watching.
 *
 * This fails the build when an asset drifts back over budget. Run
 * `npm run optimize:images` to fix the usual cause.
 */

import { readdir, stat } from "node:fs/promises"
import { join, relative } from "node:path"

const IMAGE_DIRS = ["public/assets/images", "public/assets/journal"]
const PUBLIC = "public"
const POINTS = "public/assets/models/points.json"

// Social cards must stay PNG or JPEG: several link scrapers do not render
// WebP, and a broken preview costs more than the bytes.
const SOCIAL = new Set(["1GW8AENYNU5gayo8utt1YsKnfY.jpg", "precisely-devportal/api-catalog.png"])

const MAX_IMAGE_KB = 400
const MAX_SOCIAL_KB = 700
const MAX_IMAGES_TOTAL_MB = 15
const MAX_POINTS_MB = 1.6

const walk = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const failures = []
let total = 0

for (const file of (await Promise.all(IMAGE_DIRS.map(walk))).flat()) {
  const rel = relative(PUBLIC, file).replace(/^assets\/(images|journal)\//, "")
  const { size } = await stat(file)
  total += size
  const kb = size / 1024

  if (SOCIAL.has(rel)) {
    if (kb > MAX_SOCIAL_KB) failures.push(`${rel} is ${kb.toFixed(0)} KB, over the ${MAX_SOCIAL_KB} KB social-card budget.`)
    continue
  }

  if (/\.(png|jpe?g)$/i.test(rel)) {
    failures.push(`${rel} is a ${rel.split(".").pop().toUpperCase()}. Convert it with \`npm run optimize:images\`.`)
    continue
  }

  if (kb > MAX_IMAGE_KB) {
    failures.push(`${rel} is ${kb.toFixed(0)} KB, over the ${MAX_IMAGE_KB} KB per-image budget.`)
  }
}

const totalMb = total / 1048576
if (totalMb > MAX_IMAGES_TOTAL_MB) {
  failures.push(`Image folders total ${totalMb.toFixed(1)} MB, over the ${MAX_IMAGES_TOTAL_MB} MB budget.`)
}

const publicModels = (await walk("public/assets/models")).filter((file) => file.endsWith(".glb"))
if (publicModels.length > 0) {
  failures.push(
    `${publicModels.length} .glb source model(s) are in public/assets/models and would be deployed unused. Move them to assets-source/models/.`
  )
}

const pointsMb = (await stat(POINTS)).size / 1048576
if (pointsMb > MAX_POINTS_MB) {
  failures.push(`points.json is ${pointsMb.toFixed(2)} MB, over the ${MAX_POINTS_MB} MB budget. Run \`npm run optimize:points\`.`)
}

if (failures.length > 0) {
  console.error(`\nAsset weight budget exceeded (${failures.length}):\n`)
  for (const failure of failures) console.error(`  - ${failure}`)
  console.error("")
  process.exit(1)
}

console.log(
  `Asset budget passed (images ${totalMb.toFixed(1)} MB of ${MAX_IMAGES_TOTAL_MB} MB, points ${pointsMb.toFixed(2)} MB of ${MAX_POINTS_MB} MB).`
)
