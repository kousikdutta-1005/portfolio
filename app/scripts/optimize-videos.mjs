import { readdir, stat, rename, unlink } from "node:fs/promises"
import { execFile } from "node:child_process"
import { promisify } from "node:util"
import { join } from "node:path"

const run = promisify(execFile)
const root = new URL("../public/assets/videos/", import.meta.url).pathname
const dry = process.argv.includes("--dry")

/**
 * The source recordings are variable frame rate screen captures in a 120fps
 * container, which is far more temporal detail than a UI demo needs, and they
 * carry a silent audio track. Capping at 30fps, re-encoding at CRF 26, and
 * dropping the silent audio is where effectively all of the saving comes from.
 *
 * Resolution is deliberately left alone. The videos render in a 980px column,
 * so 1920 wide is roughly 2x for retina displays and scaling down would cost
 * sharpness for very little extra saving.
 */
const CRF = 26
const FPS = 30
const SILENCE_DB = -40

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (entry.name.endsWith(".mp4")) out.push(full)
  }
  return out
}

async function meanVolume(file) {
  try {
    const { stderr } = await run("ffmpeg", ["-i", file, "-af", "volumedetect", "-f", "null", "-"])
    return Number(stderr.match(/mean_volume:\s*(-?[\d.]+) dB/u)?.[1] ?? -100)
  } catch {
    return -100
  }
}

const files = await walk(root)
let before = 0
let after = 0

for (const file of files) {
  const original = (await stat(file)).size
  before += original

  // Only strip audio when it is genuinely silent. A narrated walkthrough must
  // keep its track, so this is measured per file rather than assumed.
  const volume = await meanVolume(file)
  const silent = volume < SILENCE_DB

  const tmp = `${file}.tmp.mp4`
  const args = [
    "-v", "error", "-y", "-i", file,
    "-c:v", "libx264", "-crf", String(CRF), "-preset", "slow",
    "-r", String(FPS), "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    ...(silent ? ["-an"] : ["-c:a", "aac", "-b:a", "96k"]),
    tmp,
  ]

  if (dry) {
    console.log(`${file.replace(root, "")}  ${(original / 1048576).toFixed(1)}MB  audio ${volume.toFixed(1)}dB${silent ? " (strip)" : " (keep)"}`)
    continue
  }

  await run("ffmpeg", args)
  const size = (await stat(tmp)).size

  if (size >= original) {
    await unlink(tmp)
    after += original
    console.log(`${file.replace(root, "")}  skipped, re-encode was not smaller`)
    continue
  }

  await rename(tmp, file)
  after += size
  console.log(
    `${file.replace(root, "")}  ${(original / 1048576).toFixed(1)}MB -> ${(size / 1048576).toFixed(1)}MB` +
      `  (-${(100 - (size / original) * 100).toFixed(0)}%)${silent ? "" : "  audio kept"}`,
  )
}

if (!dry) {
  console.log(
    `\nVideos ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB ` +
      `(-${(100 - (after / before) * 100).toFixed(0)}%)`,
  )
}
