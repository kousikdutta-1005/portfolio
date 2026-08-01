/**
 * Converts the raster images in public/assets/images to WebP at sensible
 * dimensions.
 *
 * The originals were exported straight from design tools: photographs saved as
 * lossless PNG, several of them mislabelled .jpg, and all of them far larger
 * than the size they render at. That put roughly 111 MB of images in the repo
 * and 5.5 MB on the homepage alone.
 *
 * Caps are set from the size each image actually renders at, doubled for
 * retina. The social card is left alone: several link scrapers still do not
 * handle WebP, and a broken preview on LinkedIn costs more than the bytes save.
 *
 * Run with --dry to see the savings without writing anything.
 */

import { readdir, stat, readFile, writeFile, unlink } from "node:fs/promises"
import { join, relative, extname } from "node:path"
import sharp from "sharp"

const ROOTS = ["public/assets/images", "public/assets/journal"]
const SRC_GLOBS = ["src", "scripts"]
const DRY = process.argv.includes("--dry")

// Paths kept as-is, matched against the path relative to ROOT.
const KEEP = [
  /^1GW8AENYNU5gayo8utt1YsKnfY\.jpg$/, // default Open Graph card
  /^precisely-devportal\/api-catalog\.png$/, // Open Graph card for that case study
]

// Longest-edge caps, first match wins. Values are 2x the rendered size.
const CAPS = [
  [/^about\//, 800], // gallery tiles render at 320px square
  [/^brands\//, 400], // logo lockups render under 200px
  [/.*/, 1600], // case study and hero imagery inside a 980px column
]

const QUALITY = 80

const walk = async (dir) => {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const capFor = (rel) => CAPS.find(([pattern]) => pattern.test(rel))[1]

const files = (await Promise.all(ROOTS.map(walk))).flat().filter((file) => /\.(png|jpe?g)$/i.test(file))

let before = 0
let after = 0
let converted = 0
let skipped = 0
const rename = new Map()

for (const file of files) {
  const root = ROOTS.find((candidate) => file.startsWith(candidate))
  const rel = relative(root, file)
  const publicPath = file.replace(/^public/, "")
  const size = (await stat(file)).size
  before += size

  if (KEEP.some((pattern) => pattern.test(rel))) {
    after += size
    skipped++
    continue
  }

  const cap = capFor(rel)
  const meta = await sharp(file).metadata()
  const pipeline = sharp(file)
  if (Math.max(meta.width, meta.height) > cap) {
    pipeline.resize({ width: cap, height: cap, fit: "inside", withoutEnlargement: true })
  }
  const buffer = await pipeline.webp({ quality: QUALITY, effort: 5 }).toBuffer()

  const target = file.replace(/\.(png|jpe?g)$/i, ".webp")
  after += buffer.length
  converted++
  rename.set(publicPath, publicPath.replace(/\.(png|jpe?g)$/i, ".webp"))

  if (!DRY) {
    await writeFile(target, buffer)
    if (target !== file) await unlink(file)
  }
}

// Rewrite every reference in one pass so nothing is left pointing at a
// filename that no longer exists.
let rewrittenFiles = 0
let rewrittenRefs = 0
const sourceFiles = (await Promise.all(SRC_GLOBS.map(walk)))
  .flat()
  .filter((file) => [".ts", ".tsx", ".js", ".mjs", ".css", ".json", ".html"].includes(extname(file)))

for (const file of sourceFiles) {
  const original = await readFile(file, "utf8")
  let next = original
  for (const [from, to] of rename) {
    if (!next.includes(from)) continue
    next = next.split(from).join(to)
    rewrittenRefs++
  }
  if (next !== original) {
    rewrittenFiles++
    if (!DRY) await writeFile(file, next)
  }
}

const mb = (n) => (n / 1048576).toFixed(1)
console.log(`${DRY ? "[dry run] " : ""}converted ${converted} images, kept ${skipped}`)
console.log(`  ${mb(before)} MB -> ${mb(after)} MB (${(100 - (after / before) * 100).toFixed(1)}% smaller)`)
console.log(`  rewrote ${rewrittenRefs} references across ${rewrittenFiles} files`)
