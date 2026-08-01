/**
 * Trims the coordinate precision in the particle point cloud.
 *
 * The models were exported with three decimal places. They span roughly 280
 * units and render a few hundred pixels wide, so the third decimal is far
 * below a pixel. Rounding to one decimal leaves a worst-case error of 0.05
 * units, about 0.02% of the model, and makes the file compress substantially
 * better.
 */

import { readFile, writeFile } from "node:fs/promises"
import { gzipSync } from "node:zlib"

const FILE = "public/assets/models/points.json"
const DECIMALS = 1

const before = await readFile(FILE)
const models = JSON.parse(before)

let maxError = 0
const trimmed = {}
for (const [name, points] of Object.entries(models)) {
  trimmed[name] = points.map((point) =>
    point.map((value) => {
      const rounded = Number(value.toFixed(DECIMALS))
      maxError = Math.max(maxError, Math.abs(value - rounded))
      return rounded
    })
  )
}

const after = Buffer.from(JSON.stringify(trimmed))
await writeFile(FILE, after)

const kb = (n) => (n / 1024).toFixed(0)
console.log(`points.json: ${kb(before.length)} KB -> ${kb(after.length)} KB raw`)
console.log(`  gzipped:   ${kb(gzipSync(before, { level: 9 }).length)} KB -> ${kb(gzipSync(after, { level: 9 }).length)} KB`)
console.log(`  worst-case coordinate error: ${maxError.toFixed(4)} units`)
console.log(`  models: ${Object.keys(trimmed).length}, points each: ${Object.values(trimmed)[0].length}`)