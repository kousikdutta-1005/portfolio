import type { Article } from "../types"

export const material: Article = {
  id: "material-and-depth",
  title: "Glass Is Not a Style",
  subtitle: "How surfaces, depth, and real-world instincts help an interface make sense",
  date: "Dec 2025",
  readTime: "5 min read",
  excerpt:
    "See-through glass became a trend, so it became decoration. It was never meant to be that. In an interface, the look of a surface does real work: it tells you which layer you are on, where to look, and where you are.",
  tags: ["Material", "Spatial", "Craft"],
  content: [
    {
      type: "lede",
      text: "Every argument about flat design versus making things look real missed the actual question. The question is not how realistic an interface should look. It is how much of your everyday sense of space it borrows. People are amazing at reading stacked, layered space. Refusing to use that is not restraint. It is throwing away free brainpower.",
    },
    {
      type: "figure",
      src: "/assets/journal/opaque-glass.jpg",
      alt: "A sheet of frosted, opaque glass. Light passes through it but shapes behind it are softened into blur.",
      caption: "You cannot read what is behind frosted glass, but you know something is there. That is the whole job of a see-through surface in an interface. It is information about layers, not decoration.",
      credit: "Titus Tscharntke, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Opaque_glass.jpg",
      licence: "Public domain",
      aspect: "3 / 2",
    },
    {
      type: "p",
      text: "Apple's spatial guidance makes the practical case plainly. In visionOS, glass surfaces let digital content sit in a real room without hiding it, and they make layers read as layers. The blur is not decoration. It is how the system shows you what is in front of what, in a place where drop shadows mean nothing because there is no page.",
    },
    {
      type: "quote",
      text: "Materials provide visual separation between content and its surroundings, and adapt to the environment so people stay oriented.",
      author: "Apple Human Interface Guidelines",
      source: "Designing for visionOS",
    },
    {
      type: "sourcecard",
      title: "Designing for visionOS: Materials",
      publisher: "Apple",
      description: "Apple's own guidance on how glass materials separate content from its surroundings and keep people oriented across layers.",
      href: "https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos",
    },
    { type: "h2", text: "What a surface tells you" },
    {
      type: "ul",
      items: [
        "Layer. Something see-through is sitting on top of something else. Think of frosted bathroom glass. You can see enough of what is behind it to know you have not left. That is why a thin sheet feels temporary and a solid page feels like a place you arrived.",
        "Focus. Blur is attention you can see. Softening the background is the most direct way to say the important thing is here, without shouting or fading everything to black.",
        "Continuity. If the surface actually samples the content behind it, moving it changes what you see through it. Like a rainy window: you know the street is still there. That link is what makes it feel like a real object, not a grey rectangle.",
      ],
    },
    {
      type: "diagram",
      chart: `flowchart TB
  E["Page or room behind"] --> B["Take a sample"]
  B --> F1["Blur: drop detail"]
  F1 --> F2["Boost colour"]
  F2 --> F3["Tint: light or dark"]
  F3 --> F4["Hairline edge"]
  F4 --> M["Reads as a layer"]
  M --> Z{"Contrast check"}
  Z -->|"fails"| S["More tint"]
  Z -->|"passes"| OK["Ship"]`,
      caption:
        "A surface is a recipe, not one setting. Skip the colour step and it looks like fog. Skip the edge and it dissolves.",
    },
    {
      type: "table",
      head: ["What you tune", "What it means", "Reads as"],
      rows: [
        ["Blur amount", "Gap between two layers", "How far back the content sits"],
        ["See-through", "Whether you have left the page", "A quick sheet vs a place"],
        ["Hairline border", "The edge of the surface", "A real object, not fog"],
        ["Shadow", "Height under one light", "How high the layer floats"],
      ],
      caption:
        "Each setting carries a specific meaning about layer and focus. Tune them on purpose and they speak. Tune them at random and they say nothing.",
      source: "Apple Human Interface Guidelines, Materials",
      emphasiseColumn: 1,
    },
    { type: "h2", text: "The mistake everyone makes" },
    {
      type: "p",
      text: "Putting glass on everything. The moment every surface is see-through, nothing looks layered. Layering is a relationship, and relationships need contrast. A page where the nav, the cards, the pop-ups, and the buttons are all frosted has no order at all. It just has a texture.",
    },
    {
      type: "p",
      text: "My rule: glass is for things that float or come and go. Navigation that hovers over content, sheets, pop-ups, controls that follow you. Content itself sits on solid ground, because content is the thing you are meant to trust and read.",
    },
    {
      type: "compare",
      left: {
        title: "Decorative glass",
        items: [
          "Slapped on every surface at once",
          "Same blur on nav, cards, pop-ups and buttons",
          "Fixed tint that ignores what is behind",
          "Fails against a busy background",
          "Animates the blur and drops frames",
        ],
      },
      right: {
        title: "Load-bearing glass",
        items: [
          "Saved for floating, passing things",
          "Content kept on solid ground",
          "Tint raised until body text passes 4.5:1",
          "One height scale, one light source",
          "Given its own layer so it stays smooth",
        ],
      },
      caption:
        "Same effect, opposite intent. Load-bearing glass earns its cost by carrying a signal about layer and focus. Decorative glass just spends the frame budget.",
    },
    {
      type: "callout",
      title: "The worst-case backdrop test",
      text: "Take your see-through surface and put the busiest, brightest image in your product behind it. If body text on that surface drops below 4.5:1 contrast, the material is just decoration and it is failing. Raise the tint until it passes. Then save that value as your standard.",
    },
    { type: "h2", text: "Depth on a flat screen" },
    {
      type: "p",
      text: "On a flat screen you have four honest tools for depth. It is worth knowing what each one really means, instead of reaching for a shadow every time.",
    },
    {
      type: "ol",
      items: [
        "Overlap. One thing covering another is the strongest, oldest depth cue we have. It costs nothing and it never lies.",
        "Blur. Like a camera focusing. It uses the same machinery as your eye, which is why it feels real and not just drawn.",
        "Motion parallax. Things at different depths move at different speeds as you scroll. Very convincing in small doses. Past about twenty percent difference it makes people queasy.",
        "Shadow. The weakest and most abused cue. A shadow says there is one light. If your shadows disagree about where that light is, the interface looks sloppy, even to people who cannot say why.",
      ],
    },
    {
      type: "diagram",
      chart: `flowchart TB
  Toast[Toast: over everything] --> Modal[Modal: dims the base]
  Modal --> Sheet[Sheet or popover]
  Sheet --> Nav[Nav: floats on content]
  Nav --> Base[Content: opaque ground]`,
      caption:
        "The stack from a passing toast down to the solid base. Glass belongs to the floating layers. The base stays solid so the content underneath stays easy to trust and read.",
    },
    {
      type: "code",
      language: "css",
      caption:
        "One light source, one height scale, worked out once rather than tuned per component.",
      text: `:root {
  /* Light comes from above and slightly front. Never varies. */
  --shadow-color: 220 40% 4%;

  --elevation-1: 0 1px 2px hsl(var(--shadow-color) / 0.06);
  --elevation-2: 0 4px 12px hsl(var(--shadow-color) / 0.08);
  --elevation-3: 0 12px 32px hsl(var(--shadow-color) / 0.12);
}

.surface-floating {
  background: color-mix(in oklab, var(--color-card) 72%, transparent);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid color-mix(in oklab, currentColor 8%, transparent);
  box-shadow: var(--elevation-2);
}

@supports not (backdrop-filter: blur(1px)) {
  /* The fallback is opaque, not transparent. Never sacrifice legibility. */
  .surface-floating { background: var(--color-card); }
}`,
    },
    { type: "h2", text: "The speed cost nobody mentions" },
    {
      type: "p",
      text: "See-through surfaces are expensive to draw. Each one makes the browser sample and reprocess the area behind it every frame it changes. Stack three, animate them, and even a fast laptop drops below sixty frames per second. That cost is the real limit on how much glass you use. And it quietly enforces good design: glass becomes scarce, so it stays meaningful.",
    },
    {
      type: "p",
      text: "In practice that means putting each see-through surface on its own layer, never animating the blur amount itself, and instead fading a surface that is already blurred.",
    },
    { type: "h2", text: "Where this is heading" },
    {
      type: "p",
      text: "Interfaces are moving into places the designer does not control. A headset in someone's living room. A car in changing light. A screen sitting behind whatever content is there. In those places fixed colours stop being reliable. A surface that reacts to its surroundings is the only thing that stays readable. We are heading toward interfaces judged by how they behave in changing light, not by their hex codes. That is much closer to how industrial designers have always worked.",
    },
    {
      type: "takeaway",
      text: "Use surfaces to show what floats and what is grounded, never just to decorate. Test glass against your busiest background. Build shadows from a single light source. And spend the performance budget only on the few surfaces where depth actually means something.",
    },
  ],
  references: [
    {
      label: "Designing for visionOS: Materials",
      detail: "Apple Human Interface Guidelines",
      href: "https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos",
    },
    {
      label: "Materials",
      detail: "Apple Human Interface Guidelines",
      href: "https://developer.apple.com/design/human-interface-guidelines/materials",
    },
    {
      label: "backdrop-filter performance considerations",
      detail: "MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter",
    },
    {
      label: "WCAG 2.2 Contrast (Minimum)",
      detail: "W3C Web Accessibility Initiative",
      href: "https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html",
    },
    {
      label: "Ten Principles for Good Design",
      detail: "Dieter Rams, Vitsœ",
      href: "https://www.vitsoe.com/us/about/good-design",
    },
    {
      label: "Interaction Design",
      detail: "Rauno Freiberg, on craft and interaction detail",
      href: "https://rauno.me/craft/interaction-design",
    },
    {
      label: "Great Animations",
      detail: "Emil Kowalski, on animation craft",
      href: "https://emilkowal.ski/ui/great-animations",
    },
  ],
}
