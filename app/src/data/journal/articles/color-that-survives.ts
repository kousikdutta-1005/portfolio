import type { Article } from "../types"

export const color: Article = {
  id: "color-that-survives",
  title: "Color That Survives Dark Mode, Low Vision, and Real Screens",
  subtitle: "Why hex lies, what OKLCH fixes, and how to build a ramp that holds",
  readTime: "9 min read",
  excerpt:
    "Equal lightness in HSL does not mean equal brightness to the eye. That gap is why so many color systems look uneven, break in dark mode, and fail people with low vision. OKLCH closes it, and the rest is discipline.",
  tags: ["Color", "Accessibility", "Design Systems"],
  content: [
    {
      type: "lede",
      text: "A color system has to work in three hard places at once: in dark mode, at low contrast, and for the one in twelve men who cannot tell your red from your green. The formats most of us reach for, hex and HSL, actively lie about how bright a color looks. OKLCH does not. Build on the honest format and the hard places get easier.",
    },
    {
      type: "figure",
      src: "/assets/journal/munsell-tree.jpg",
      alt: "Albert Munsell's three dimensional color tree, arranging painted chips by hue, lightness, and chroma on separate axes.",
      caption: "Munsell built this model in 1905 to make the point that color needs three separate axes, and that the steps between chips have to be perceptually even, not just mathematically even. He made it a physical object because a color space that looks wrong is wrong, and you can only check that with your eyes. That is the entire case for OKLCH over HSL: equal numbers are worthless unless they also look equally spaced.",
      credit: "Hannes Grobe, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Munsell_color-tree_hg.jpg",
      licence: "CC BY-SA 4.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/4.0",
      width: 1200,
      height: 1089,
    },
    {
      type: "p",
      text: "I used to build color ramps in HSL and wonder why they looked lumpy. I would set every step to the same lightness, say 50 percent, spin the hue around, and get a yellow that glowed and a blue that sank into the page. Same number, wildly different brightness. The tools were not broken. HSL was telling me a value that has almost nothing to do with what my eye actually sees.",
    },
    { type: "h2", text: "Hex and HSL lie about brightness" },
    {
      type: "p",
      text: "HSL has three parts: hue, saturation, and lightness. The lightness number sounds like it should match how bright a color looks. It does not. A pure yellow at 50 percent lightness is dazzling. A pure blue at the same 50 percent looks nearly black. The human eye is far more sensitive to green and yellow than to blue, and HSL ignores that completely. So a ramp built on equal HSL lightness is uneven the moment you change hue.",
    },
    {
      type: "p",
      text: "Think of it like weighing fruit by counting pieces. Twelve grapes and twelve melons are both twelve, but nobody would call them the same weight. HSL counts pieces. It gives you a tidy number that does not track the thing you care about. For a single color you can eyeball your way past this. For a system of tints and shades across many hues, the error compounds until the whole set looks amateur.",
    },
    {
      type: "compare",
      left: {
        title: "HSL, equal lightness",
        items: [
          "Every step set to L 50%",
          "Yellow glows, blue looks almost black",
          "Perceived brightness jumps between hues",
          "Ramps look uneven with no obvious fix",
          "The number does not match the eye",
        ],
      },
      right: {
        title: "OKLCH, equal lightness",
        items: [
          "Every step set to L 0.7",
          "Yellow and blue read at the same brightness",
          "Perceived brightness is actually constant",
          "Ramps step evenly by construction",
          "The number is built from vision research",
        ],
      },
      caption:
        "The same intent, equal lightness across hues, produces an uneven set in HSL and an even one in OKLCH. The format is doing the work.",
    },
    {
      type: "p",
      text: "OKLCH also has three parts: lightness, chroma, and hue. The difference is that its lightness is perceptual. It is built from a model of how people actually judge brightness, so equal L values look equally bright no matter the hue. Chroma is how vivid the color is, and it behaves independently of lightness, which HSL never managed. OKLCH landed in the CSS Color 4 specification and ships in every current browser, so this is production CSS, not a lab toy.",
    },
    {
      type: "code",
      language: "css",
      caption:
        "A five step ramp where only lightness moves, from 0.95 down to 0.35. Because OKLCH lightness is perceptual, the steps feel evenly spaced to the eye, not just evenly numbered.",
      text: `:root {
  --blue-100: oklch(0.95 0.03 250);
  --blue-300: oklch(0.80 0.09 250);
  --blue-500: oklch(0.62 0.16 250);
  --blue-700: oklch(0.48 0.13 250);
  --blue-900: oklch(0.35 0.08 250);
}`,
    },
    { type: "h2", text: "Building a ramp with even steps" },
    {
      type: "p",
      text: "A color ramp is the set of tints and shades for one hue, from the palest tint to the darkest shade. The goal is even perceptual steps, so the jump from step 100 to 300 feels the same size as 300 to 500. In OKLCH you get this almost for free: hold the hue steady, move lightness in even amounts, and shape the chroma. Chroma needs shaping because the most vivid colors live in the middle of the lightness range. Very light and very dark colors cannot hold much chroma, so you ease it up toward the middle steps and back down at the ends.",
    },
    {
      type: "p",
      text: "The kitchen version: making a paint by mixing white into a base color. Each scoop of white should feel like the same step lighter. If you measure the white by volume it works. If you measure it by counting drops of different sizes, some steps jump and some barely move. OKLCH lightness is the honest volume measure. HSL lightness is the mismatched drops.",
    },
    {
      type: "p",
      text: "One more thing OKLCH gives you is a way to catch colors that cannot be shown. Every screen can only display so many colors, a boundary called the gamut, and it is easy to ask for a vivid color that falls outside it. In OKLCH the chroma value maps to how vivid a color is, so you can raise chroma step by step and see exactly where a hue runs out of room on the darkest and lightest steps. That is why real ramps ease chroma down at the two ends: not for taste, but because the vivid version simply does not exist there, and the browser would quietly clip it to something you did not choose.",
    },
    { type: "h2", text: "Dark mode is not an inversion" },
    {
      type: "p",
      text: "Here is the mistake I see most: dark mode built by inverting the light theme. Flip white to black, swap the ramp end for end, ship it. It always looks harsh, and there are three reasons. First, a fully saturated color that looked calm on white screams on black, so you have to pull chroma down in the dark. Second, pure black backgrounds are wrong, which I will come back to. Third, the ramp itself has to be rebuilt, because the steps that gave good contrast on light do not line up on dark.",
    },
    {
      type: "p",
      text: "The real method is to design dark mode as its own theme with shared rules. Lift the darkest surface off pure black to a very dark gray, so about OKLCH lightness 0.18 rather than 0. Reduce chroma across the ramp, often by a third, so colors sit back instead of vibrating. Then re-pick which step of each ramp carries text, buttons, and borders, checking contrast against the new surfaces rather than assuming the light theme choices transfer. It is more work than an inversion. It is the difference between a theme that feels designed and one that feels flipped.",
    },
    {
      type: "callout",
      title: "Pure black on OLED is a trap",
      text: "The argument for pure black is power: OLED pixels are off at true black, so it saves battery. The cost is worse. On OLED, high contrast edges against pure black cause smearing during scroll and visible ghosting, and the lack of any surface makes depth impossible to show. A very dark gray surface costs a sliver of battery and buys back readability and hierarchy. Both Material Design 3 and Apple's guidance use elevated dark surfaces, not black, for exactly this reason.",
    },
    { type: "h2", text: "Contrast maths, and where it breaks" },
    {
      type: "p",
      text: "The legal standard for contrast is WCAG 2, and its core rule is a ratio. Normal body text needs a contrast ratio of at least 4.5 to 1 against its background to pass level AA. Large text needs 3 to 1. The stricter AAA level asks for 7 to 1. These numbers come from a formula based on relative luminance, and for most everyday color pairs the formula is a solid guide that keeps text readable.",
    },
    {
      type: "scale",
      min: 1,
      max: 21,
      unit: ": 1",
      points: [
        { at: 3, label: "3:1", note: "AA for large text and UI components", tone: "warn" },
        { at: 4.5, label: "4.5:1", note: "AA for normal body text, the common target", tone: "good" },
        { at: 7, label: "7:1", note: "AAA for normal text", tone: "good" },
        { at: 21, label: "21:1", note: "Pure black on pure white, the ceiling", tone: "warn" },
      ],
      caption:
        "The WCAG 2 contrast ladder runs from 1:1, invisible, up to 21:1, black on white. AA at 4.5:1 is the line that matters legally for body text.",
      source: "W3C, Understanding Success Criterion 1.4.3 Contrast (Minimum)",
    },
    {
      type: "p",
      text: "The WCAG 2 formula has known failure cases, and it is worth being honest about them. It handles light backgrounds better than dark ones, so some pairings that pass the maths look too faint on a dark surface, and some that fail look perfectly fine. It also treats a thin one pixel line and a block of body text the same, though they read very differently. This is not a secret. It is why a successor is being worked on.",
    },
    {
      type: "table",
      head: ["", "WCAG 2 contrast", "APCA (WCAG 3 draft)"],
      rows: [
        ["Status", "Current standard, legally cited", "Draft, not yet a standard"],
        ["Model", "Ratio of relative luminance", "Perceptual lightness difference"],
        ["Handles dark mode", "Poorly, known to misjudge", "Designed to handle it"],
        ["Accounts for text size and weight", "Only two coarse buckets", "Yes, built in"],
        ["What to ship today", "This one, it is the requirement", "Test with it, do not rely on it"],
      ],
      caption:
        "APCA, the Accessible Perceptual Contrast Algorithm, is the candidate in the WCAG 3 draft. It fixes real WCAG 2 flaws, but WCAG 2.2 AA is still the standard you are held to.",
      emphasiseColumn: 1,
    },
    {
      type: "p",
      text: "APCA, short for Accessible Perceptual Contrast Algorithm, is the candidate replacement being explored for WCAG 3. It measures the perceived lightness difference between text and background, and it accounts for text size and weight, which WCAG 2 barely does. I test with it because it catches dark mode problems the old formula misses. I do not ship against it alone, because WCAG 3 is an early draft and could change. If you have a legal or contractual accessibility requirement today, it points at WCAG 2.2 AA, full stop.",
    },
    {
      type: "sourcecard",
      title: "Understanding SC 1.4.3: Contrast (Minimum)",
      publisher: "W3C Web Accessibility Initiative",
      description:
        "The primary source for the 4.5:1 and 3:1 thresholds, the luminance formula behind them, and the reasoning for each number.",
      href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    },
    { type: "h2", text: "Never let hue carry the meaning alone" },
    {
      type: "p",
      text: "Color blindness is common enough that it is never an edge case. Around one in twelve men and one in two hundred women see color differently, roughly 300 million people, about four and a half percent of everyone. The most common types blur exactly the reds and greens that interfaces love to use for error and success. So a status dot that is only red or green tells a large group of your users nothing at all.",
    },
    {
      type: "stats",
      items: [
        {
          value: "1 in 12",
          label: "Men with some form of color blindness",
          source: "Colour Blind Awareness",
        },
        {
          value: "1 in 200",
          label: "Women with some form of color blindness",
          source: "Colour Blind Awareness",
        },
        {
          value: "~300M",
          label: "People worldwide, about 4.5 percent of the population",
          source: "Colour Blind Awareness",
        },
      ],
      caption:
        "These are not rare conditions. A red and green only status system fails a group larger than the population of most countries.",
    },
    {
      type: "p",
      text: "The rule is simple and WCAG makes it explicit: color must never be the only way you carry information. Pair every color signal with a second channel. An error gets red plus an icon plus a text label. A required field gets a color plus an asterisk plus a note. A line chart gets color plus a distinct shape or a direct label on each line. Picture a hospital form that marks urgent cases only by a red tint on gray paper under fluorescent light. The color that seemed obvious on your monitor can vanish in the real setting. The second channel is what survives.",
    },
    {
      type: "callout",
      title: "AAA everywhere is not better design",
      text: "It is tempting to chase the 7:1 AAA contrast on everything and call it the accessible choice. It often is not. Maximum contrast on every element flattens hierarchy, because when everything shouts, nothing leads, and long reading at pure black on white causes real eye strain from halation, where bright edges seem to bleed. AAA is the right target for dense body text and small type. For large headings and secondary UI, AA with deliberate hierarchy usually reads better. More contrast is a tool, not a score to max out.",
    },
    {
      type: "callout",
      title: "Prediction: OKLCH becomes the default authoring format for systems",
      text: "I could be wrong, but here is what the data points to. OKLCH shipped across all major browsers in 2023, and the tooling, from oklch.com to design token pipelines, has moved to it fast. I think within a couple of years, serious design systems will author their ramps in OKLCH and treat hex as an export format, the way we treat compiled output. What would prove me wrong: if browser color management stays inconsistent enough that teams keep hand correcting OKLCH values back to hex, the promise of perceptual evenness breaks in practice, and hex stays the source of truth.",
    },
    {
      type: "takeaway",
      text: "Author your colors in OKLCH so equal lightness means equal brightness. Build ramps with even perceptual steps and shaped chroma. Design dark mode as its own theme on a lifted surface, never a pure black inversion. Meet WCAG 2.2 AA because it is the standard, test with APCA because it is better, and never let hue carry meaning by itself.",
    },
  ],
  references: [
    {
      label: "CSS Color Module Level 4",
      detail: "W3C spec that defines the oklch() function and its perceptual lightness",
      href: "https://www.w3.org/TR/css-color-4/",
    },
    {
      label: "OKLCH in CSS: why we moved from RGB and HSL",
      detail: "Evil Martians on how OKLCH fixes uneven lightness across hues",
      href: "https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl",
    },
    {
      label: "OKLCH Color Picker and Converter",
      detail: "Interactive tool for building and inspecting OKLCH ramps",
      href: "https://oklch.com/",
    },
    {
      label: "Understanding SC 1.4.3: Contrast (Minimum)",
      detail: "W3C source for the 4.5:1 and 3:1 AA thresholds",
      href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    },
    {
      label: "Understanding SC 1.4.1: Use of Color",
      detail: "W3C rule that color must not be the only means of conveying information",
      href: "https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",
    },
    {
      label: "About Colour Blindness",
      detail: "Colour Blind Awareness on prevalence: 1 in 12 men, about 300 million people",
      href: "https://www.colourblindawareness.org/colour-blindness/",
    },
    {
      label: "APCA / Visual Contrast (WCAG 3 draft)",
      detail: "The perceptual contrast algorithm being explored for WCAG 3",
      href: "https://apcacontrast.com/",
    },
    {
      label: "Material Design 3: Color system",
      detail: "Google's dark theme guidance using elevated surfaces, not pure black",
      href: "https://m3.material.io/styles/color/system/overview",
    },
    {
      label: "Color: Apple Human Interface Guidelines",
      detail: "Apple on system colors, dark mode, and contrast",
      href: "https://developer.apple.com/design/human-interface-guidelines/color",
    },
  ],
}
