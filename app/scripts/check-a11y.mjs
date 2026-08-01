import { readFileSync } from "node:fs"

/**
 * Accessibility gate.
 *
 * Static and dependency free so it can run inside the build. It checks the two
 * classes of failure that have actually shipped from this repo before:
 *
 *   1. A colour token pair that reads fine in one theme and fails contrast in
 *      the other (dark mode accent buttons shipped at 3.02:1).
 *   2. An inline text control that renders shorter than the 24px minimum
 *      target size.
 */

const css = readFileSync("src/index.css", "utf8")

const TEXT_MIN = 4.5
const UI_MIN = 3

/** Pairs are [foreground token, background token, minimum ratio, description]. */
const PAIRS = [
  ["foreground", "background", TEXT_MIN, "body text"],
  ["muted-foreground", "background", TEXT_MIN, "secondary text"],
  ["muted-foreground", "muted", TEXT_MIN, "secondary text on muted fills"],
  ["card-foreground", "card", TEXT_MIN, "card text"],
  ["popover-foreground", "popover", TEXT_MIN, "popover text"],
  ["primary-foreground", "primary", TEXT_MIN, "primary button label"],
  ["secondary-foreground", "secondary", TEXT_MIN, "secondary button label"],
  ["accent-foreground", "accent", TEXT_MIN, "accent button label"],
  ["destructive-foreground", "destructive", TEXT_MIN, "destructive button label"],
  ["accent", "background", TEXT_MIN, "link text"],
  ["ring", "background", UI_MIN, "focus ring"],
  // success, warning and destructive are used as small bold text in journal
  // scale rows, not just as indicator fills, so they need the text threshold.
  ["success", "background", TEXT_MIN, "success value text"],
  ["warning", "background", TEXT_MIN, "warning value text"],
  ["destructive", "background", TEXT_MIN, "destructive value text"],
]

/** Interactive text controls that have no padding of their own. */
const TARGETS = [
  ".text-link",
  ".footer-link",
  ".back-link",
  ".journal-back",
  ".journal-pagination-step",
  ".case-lock-input",
  ".case-lock-submit",
]

const TARGET_MIN_PX = 24

const readTokens = (block) => {
  const tokens = {}
  for (const match of block.matchAll(/--color-([\w-]+):\s*([^;]+);/g)) {
    tokens[match[1]] = match[2].trim()
  }
  return tokens
}

const sliceBlock = (source, opener) => {
  const start = source.indexOf(opener)
  if (start === -1) throw new Error(`check-a11y: could not find "${opener}" in src/index.css.`)
  let depth = 0
  for (let i = start + opener.length - 1; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1
    if (source[i] === "}") {
      depth -= 1
      if (depth === 0) return source.slice(start, i + 1)
    }
  }
  throw new Error(`check-a11y: unbalanced braces after "${opener}".`)
}

const parseColor = (value) => {
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (hex) {
    const raw = hex[1].length === 3 ? hex[1].replace(/./g, (c) => c + c) : hex[1]
    return [0, 2, 4].map((i) => parseInt(raw.slice(i, i + 2), 16))
  }
  const rgb = value.match(/^rgba?\(([^)]+)\)$/i)
  if (rgb) {
    const parts = rgb[1].split(/[,\s/]+/).filter(Boolean).map(Number)
    if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) return parts.slice(0, 3)
  }
  return null
}

const relativeLuminance = ([r, g, b]) => {
  const channel = (v) => {
    const s = v / 255
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const contrast = (a, b) => {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

// Self check. If the maths is wrong every result below is meaningless.
const sanity = contrast([0, 0, 0], [255, 255, 255])
if (Math.abs(sanity - 21) > 0.01) {
  throw new Error(`check-a11y: contrast maths is broken (black on white returned ${sanity}).`)
}

const themes = {
  light: readTokens(sliceBlock(css, "@theme {")),
  dark: readTokens(sliceBlock(css, ".dark {")),
}

const failures = []

for (const [theme, tokens] of Object.entries(themes)) {
  for (const [fgName, bgName, min, label] of PAIRS) {
    const fgValue = tokens[fgName]
    const bgValue = tokens[bgName]

    if (!fgValue || !bgValue) {
      failures.push(`${theme}: token --color-${fgValue ? bgName : fgName} is missing.`)
      continue
    }

    const fg = parseColor(fgValue)
    const bg = parseColor(bgValue)

    if (!fg || !bg) {
      failures.push(
        `${theme}: cannot read --color-${fg ? bgName : fgName} ("${fg ? bgValue : fgValue}"). ` +
          `Use a hex or rgb() value so this gate can check it.`
      )
      continue
    }

    const ratio = contrast(fg, bg)
    if (ratio + 0.005 < min) {
      failures.push(
        `${theme}: ${label} is ${ratio.toFixed(2)}:1, needs ${min}:1 ` +
          `(--color-${fgName} ${fgValue} on --color-${bgName} ${bgValue}).`
      )
    }
  }
}

// Collect every innermost rule (`selectors { declarations }`) once. Matching
// on the rule itself rather than anchoring to the preceding `}` matters: a
// global regex consumes that brace, so the rule following a multi-selector
// block used to be skipped entirely, which can hide a real failure.
const rules = Array.from(css.matchAll(/([^{}]+)\{([^{}]*)\}/g), (match) => ({
  selectors: match[1].split(",").map((part) => part.trim()),
  declarations: match[2],
}))

for (const selector of TARGETS) {
  const token = new RegExp(`\\${selector}(?![\\w-])`)
  const heights = rules
    .filter((rule) => rule.selectors.some((one) => token.test(one)))
    .map((rule) => rule.declarations.match(/min-height:\s*([\d.]+)px/))
    .filter(Boolean)

  if (heights.length === 0) {
    failures.push(
      `${selector} declares no min-height. Inline text controls need at least ${TARGET_MIN_PX}px.`
    )
    continue
  }

  const best = Math.max(...heights.map((match) => Number(match[1])))
  if (best < TARGET_MIN_PX) {
    failures.push(`${selector} has min-height ${best}px, needs at least ${TARGET_MIN_PX}px.`)
  }
}

if (failures.length > 0) {
  console.error(`\nAccessibility gate failed (${failures.length}):\n`)
  for (const failure of failures) console.error(`  - ${failure}`)
  console.error("")
  process.exit(1)
}

const checks = Object.keys(themes).length * PAIRS.length + TARGETS.length
console.log(`Accessibility gate passed (${checks} checks).`)
