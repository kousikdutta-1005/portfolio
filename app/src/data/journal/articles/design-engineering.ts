import type { Article } from "../types"

export const designEngineering: Article = {
  id: "design-engineering",
  title: "The Handoff Was Always a Translation Loss",
  subtitle: "Why design systems are turning into recipes a machine can follow",
  readTime: "5 min read",
  excerpt:
    "A mockup is a picture of a decision, and a picture leaves things out. Every time it crosses to another team, more gets lost. Design engineering is not a job title. It is the removal of that gap.",
  tags: ["Design Engineering", "Systems", "Tooling"],
  content: [
    {
      type: "lede",
      text: "Here is the uncomfortable truth about a design file. It is a photo of a cake, not the recipe. The recipe lives in your head: why this spacing, which rule you were following, which tricky case you were guarding against. The file carries none of that. It carries a picture, and a hope.",
    },
    {
      type: "figure",
      src: "/assets/journal/typesetting.jpg",
      alt: "A tray of small metal type letters being set by hand in a printing works, each letter picked from its compartment and lined up in a frame.",
      caption: "A person had to place every letter by hand, and if the message changed, someone rebuilt the whole page. That is what a mockup handoff still is. A design system that compiles is the printing press equivalent of not doing this by hand.",
      credit: "Brian Smithson from Milton Keynes, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Print_works_typesetting,_Beamish_Museum,_12_November_2011.jpg",
      licence: "CC BY 2.0",
      licenceHref: "https://creativecommons.org/licenses/by/2.0",
      width: 1200,
      height: 900,
    },
    {
      type: "p",
      text: "Then an engineer works backwards from the picture and tries to guess the recipe. They get it eighty percent right, which is impressive. The missing twenty percent turns into a ticket called polish that nobody ever picks up. Multiply that by every screen, every sprint, every year. That pile of lost twenty percents is exactly what people mean when they say a product feels cheap.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  D["Decision<br/>intent and rules"] --> M["Mockup<br/>pixels only"]
  M --> E["Engineer<br/>re-guesses intent"]
  E --> B{"80% recovered?"}
  B -->|"yes"| S["Shipped screen"]
  B -.->|"lost 20%"| T["Polish ticket"]
  T -.->|"never picked up"| S`,
      caption:
        "Every hop the decision makes drops something a picture cannot carry. The lost twenty percent does not vanish. It becomes a backlog nobody prioritises.",
    },
    {
      type: "compare",
      left: {
        title: "Mockup handoff",
        items: [
          "Intent lives only in the designer's head",
          "An engineer rebuilds it, roughly right",
          "The gap becomes a polish ticket",
          "Nothing can be checked, compared, or versioned",
        ],
      },
      right: {
        title: "Decisions written as rules",
        items: [
          "Intent named as a token or a rule",
          "One source builds every platform",
          "Breaking the rule fails a check before merge",
          "Versioned and reviewed like any other code",
        ],
      },
      caption:
        "The shift is not about tooling taste. It is about where the decision lives: in a picture someone has to decode, or in something the build can check.",
    },
    { type: "h2", text: "Tokens were the first step" },
    {
      type: "p",
      text: "Design tokens quietly proved the idea works. A design token is just a named decision. Instead of writing a colour as a hex code in a picture, you give it a name that carries meaning: surface-raised, text-secondary, accent-pressed. It is like calling a colour danger instead of copying the same hex code everywhere. Then one source turns that named decision into CSS variables, Swift constants, Android resources, and Figma styles.",
    },
    {
      type: "p",
      text: "The clever part is not the automation. It is that the token has a name, and the name holds the intent. Once a machine can read the intent, it can be checked, versioned, compared, and reasoned about. That is the whole game.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  S["Design decisions<br/>named, meaningful"] --> T["Token source<br/>JSON / DTCG"]
  T --> B{"Build step"}
  B --> C1["CSS custom properties"]
  B --> C2["Swift / Compose"]
  B --> C3["Figma variables"]
  B --> C4["Docs + contrast report"]
  C4 -.->|"fails contrast check"| X["Block merge"]`,
      caption:
        "One decision, many outputs, one check. Contrast can be tested by the build because the decision is data, not a picture.",
    },
    {
      type: "sourcecard",
      title: "Design Tokens Community Group Format",
      publisher: "W3C Design Tokens Community Group",
      description: "The open file format for tokens, so you can see the exact shape one source builds every platform from.",
      href: "https://tr.designtokens.org/format/",
    },
    {
      type: "quote",
      text: "A design system isn't a project. It's a product, serving products.",
      author: "Nathan Curtis",
      source: "EightShapes",
    },
    { type: "h2", text: "What sits above tokens" },
    {
      type: "p",
      text: "Tokens solved values. The unsolved layer is how things fit together, and that is where most of the real design judgement lives. The spacing rhythm. What can nest inside what. Density modes. Which components may sit in which containers. What happens to a layout at 320 pixels when a forty-character German word lands in the heading.",
    },
    {
      type: "p",
      text: "Today those rules live in documentation, which really means they live nowhere. The direction I find genuinely exciting is writing them as rules the build can check for you.",
    },
    {
      type: "table",
      head: ["Layer", "What it solves today", "What is still unsolved"],
      rows: [
        [
          "Token layer",
          "Colour, type and space as named values",
          "Meaning drifting as brands multiply",
        ],
        [
          "Fit-together layer",
          "Mostly prose: nesting, density, rhythm",
          "Rules the build can actually check",
        ],
        [
          "Behaviour layer",
          "Component states and props in code",
          "Timing, focus order and motion as promises",
        ],
      ],
      caption:
        "Tokens are a solved problem. The value now moves up the stack, into the layers where the real design judgement has never been machine readable.",
      emphasiseColumn: 2,
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "Fit-together rules as data. A linter can check this. A PDF guideline cannot.",
      text: `export const composition = {
  card: {
    // The most-violated rule in every design system ever shipped.
    nestable: false,
    allowedChildren: ["heading", "body", "metric", "actionRow"],
    padding: { compact: "space-4", default: "space-6" },
    maxActions: 2,
  },
  actionRow: {
    // Primary actions are a scarcity resource, not a style.
    maxPrimary: 1,
    order: ["secondary", "primary"],
  },
} satisfies CompositionRules`,
    },
    {
      type: "callout",
      title: "The rule of thumb",
      text: "If a design rule can be broken quietly, it will be. Anything you care about enough to write down twice should move out of documentation and into the type system, the linter, or the build check.",
    },
    { type: "h2", text: "Why this is suddenly urgent" },
    {
      type: "p",
      text: "Because machines now write most of the boilerplate. When a machine is generating your components, the quality of what comes out is capped by the quality of the rules you gave it. A design system that is a beautiful PDF is invisible to a code-writing model. A design system written as typed building blocks, tokens, and fit-together rules is the most powerful prompt you will ever write.",
    },
    {
      type: "p",
      text: "This is the practical reason design engineering has become the highest-payoff skill on a product team. Not because every designer should learn React. Plenty of great designers never will. It is because the things that now control what gets built are code, and someone with design judgement needs to be writing them.",
    },
    { type: "h2", text: "What I actually do differently" },
    {
      type: "ol",
      items: [
        "Prototype in the real medium. Not because code prototypes look nicer, but because the browser tells the truth about text wrapping, focus order, scrolling, and how a spring animation actually feels at 120 frames a second. A design file cannot lie to you if you never let it speak.",
        "Ship the building block, not the screen. When I solve an interaction, what I hand over is a component with clear rules and states, added to the system. The screen is just a result of that.",
        "Write the failure states first. Empty, loading, error, no permission, offline, too long, too many. This is where products actually get judged, and it is always the part left out of the mockup.",
        "Put craft in the build. Contrast ratios, reduced-motion versions, visible focus, bundle size. If it is not checked, it rots.",
      ],
    },
    { type: "h2", text: "The objection, and my answer" },
    {
      type: "p",
      text: "People worry this turns design into engineering and drains the craft out of it. I think the opposite happens. Every hour not spent nudging spacing by a pixel or explaining a hover state for the fourth time is an hour freed for the work only a designer can do: deciding what the product should mean, how it should feel, and what it should refuse to do.",
    },
    {
      type: "takeaway",
      text: "Stop shipping pictures of decisions. Ship the decisions themselves, in a form the build can check and a machine can read. The design system is no longer documentation. It is the recipe your product is built from.",
    },
  ],
  references: [
    {
      label: "Design Tokens Community Group Format",
      detail: "W3C Design Tokens Community Group",
      href: "https://tr.designtokens.org/format/",
    },
    {
      label: "A Design System Isn't a Project. It's a Product, Serving Products.",
      detail: "Nathan Curtis, EightShapes",
      href: "https://eightshapes.com/",
    },
    {
      label: "Atomic Design",
      detail: "Brad Frost",
      href: "https://atomicdesign.bradfrost.com/",
    },
    {
      label: "Invisible Details of Interaction Design",
      detail: "Rauno Freiberg",
      href: "https://rauno.me/craft/interaction-design",
    },
    {
      label: "Modern Fluid Typography Using CSS Clamp",
      detail: "Adrian Bece, Smashing Magazine",
      href: "https://www.smashingmagazine.com/2022/01/modern-fluid-typography-css-clamp/",
    },
    {
      label: "Notes on the Synthesis of Form",
      detail: "Christopher Alexander, Harvard University Press, 1964",
      href: "https://www.hup.harvard.edu/books/9780674627512",
    },
  ],
}
