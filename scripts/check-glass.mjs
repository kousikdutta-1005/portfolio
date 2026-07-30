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
  "linear-gradient(145deg",
]

const missing = requiredSnippets.filter((snippet) => !css.includes(snippet))

if (missing.length > 0) {
  throw new Error(`Compiled liquid glass CSS is missing: ${missing.join(", ")}`)
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const requiredBlurRules = [
  [".case-study-nav-inner", "backdrop-filter:var(--liquid-blur-chrome)"],
  [".case-study-nav-item:before", "backdrop-filter:var(--liquid-blur-control)"],
  [".nav-link-interactive:before", "backdrop-filter:var(--liquid-blur-control)"],
  [".brand-signature:before", "backdrop-filter:blur(28px)"],
]

for (const [selector, declaration] of requiredBlurRules) {
  const rules = Array.from(
    css.matchAll(new RegExp(`[^{}]*${escapeRegExp(selector)}[^{}]*\\{[^}]*\\}`, "g")),
    (match) => match[0]
  )
  const hasUnprefixedBlur = rules.some((rule) =>
    new RegExp(`(?:^|[;{])${escapeRegExp(declaration)}`).test(rule)
  )

  if (!hasUnprefixedBlur) {
    throw new Error(`Compiled liquid glass CSS lost unprefixed blur for ${selector}.`)
  }
}
