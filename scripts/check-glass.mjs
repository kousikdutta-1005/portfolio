import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const cssFile = readdirSync("dist/assets").find((file) => file.endsWith(".css"))

if (!cssFile) {
  throw new Error("No compiled CSS asset found in dist/assets.")
}

const css = readFileSync(join("dist/assets", cssFile), "utf8")

const requiredSnippets = [
  "case-study-nav-inner",
  "case-study-nav-item:before",
  "nav-link-interactive:before",
  "brand-signature:before",
  "-webkit-backdrop-filter:var(--liquid-blur-chrome)",
  "-webkit-backdrop-filter:var(--liquid-blur-control)",
  "linear-gradient(145deg",
]

const missing = requiredSnippets.filter((snippet) => !css.includes(snippet))

if (missing.length > 0) {
  throw new Error(`Compiled liquid glass CSS is missing: ${missing.join(", ")}`)
}
