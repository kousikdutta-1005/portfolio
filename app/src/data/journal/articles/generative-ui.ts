import type { Article } from "../types"

export const generativeUi: Article = {
  id: "generative-ui",
  title: "The Interface Is Now a Variable",
  subtitle: "Generative UI and the end of the fixed screen",
  date: "Aug 2026",
  readTime: "5 min read",
  excerpt:
    "For sixty years we drew every screen in advance. Generative UI ends that. Now the layout is built on the spot, from what the user asks for. Here is what really changes for designers.",
  tags: ["Generative UI", "AI", "React"],
  content: [
    {
      type: "lede",
      text: "Every screen you have ever designed hides one assumption. You knew, ahead of time, what would be on it. Generative UI takes that away. Once it is gone, most of what we call design has to be rebuilt from scratch.",
    },
    {
      type: "p",
      text: "Jakob Nielsen called AI the first new way of using computers in sixty years. For the first time, users say what they want, not the steps to get there. He called this intent-based design: you state the outcome. But here is the part nobody quotes. If the user names an outcome, someone still has to build the screen that delivers it. And that someone is no longer a person drawing rectangles.",
    },
    {
      type: "quote",
      text: "AI is introducing the first new user-interface paradigm in 60 years. Users tell the computer the desired outcome, not how to do it.",
      author: "Jakob Nielsen",
      source: "Nielsen Norman Group, 2023",
    },
    {
      type: "sourcecard",
      title: "Generative UI and Outcome-Oriented Design",
      publisher: "Nielsen Norman Group",
      description: "Nielsen's walk-through of intent-based design, where users state the outcome and the interface is built to match.",
      href: "https://www.nngroup.com/articles/generative-ui/",
    },
    { type: "h2", text: "From a drawn screen to a computed one" },
    {
      type: "figure",
      src: "/assets/journal/type-case.jpg",
      alt: "An old printer's type case, a shallow wooden tray split into many small compartments, each holding pieces of metal type.",
      caption:
        "A printer could set any sentence ever written, but only from the letters in this box. A component registry is the same idea. A small set of parts, and endless arrangements.",
      credit: "Unknown engraver, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:La_casse_d%E2%80%99imprimerie_avec_ses_cassetins_ou_compartiments_pour_les_diverse_lettres.png",
      licence: "Public domain",
      aspect: "3 / 2",
    },
    {
      type: "p",
      text: "The old way was a relay race. A designer drew a screen. An engineer rebuilt it in code. A server sent data, and the browser turned it into pixels. Every possible version had to be planned in advance. Empty state, loading state, error state, twelve versions of one table: all drawn, all shipped, most never seen.",
    },
    {
      type: "p",
      text: "Generative UI cuts the relay short. The AI takes the request, picks from a registry, and streams the finished screen down. The registry is just the box of parts the AI is allowed to use. React Server Components made this work. What travels across the network is no longer raw data, it is ready-made screen pieces. Your app stops growing with every new view, because views are built the moment someone asks.",
    },
    {
      type: "sourcecard",
      title: "Generative User Interfaces",
      publisher: "Vercel",
      description: "The AI SDK docs show how a model picks a component and streams a real screen back, with runnable code.",
      href: "https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  A["User intent"] --> B["Model"]
  B --> C{"Component registry"}
  C -->|"trusted parts only"| D["Composed UI"]
  D --> E["Streamed to client"]
  B -.->|"no matching part"| F["Fallback: text + raw data"]
  F --> E`,
      caption:
        "The registry is your design system. It is the only thing standing between a request and chaos.",
    },
    {
      type: "compare",
      left: {
        title: "Drawn-screen pipeline",
        items: [
          "Designer draws every state by hand",
          "Engineer rebuilds the drawing in code",
          "Server ships data, browser builds fixed pixels",
          "Every version planned in advance",
          "A new view means new code in the app",
        ],
      },
      right: {
        title: "Computed-screen pipeline",
        items: [
          "Designer builds the parts and the rules",
          "AI picks parts from a trusted box",
          "Server streams ready-made screen pieces, not data",
          "Screens built the moment someone asks",
          "A new view is a new arrangement, no new code",
        ],
      },
      caption:
        "Same four steps, flipped ownership. You stop drawing finished screens. You start building the parts screens are made from.",
    },
    { type: "h2", text: "The registry is the design work" },
    {
      type: "p",
      text: "Most teams miss this part. The AI can only use the parts you have built. So your component library stops being a nice-to-have and becomes the whole rulebook. It sets the limit on every screen your product can ever show. Think of Lego. You can build endless things, but only from the bricks in the box. Nathan Curtis said a design system is a product that serves products. Here it is more like a box of bricks: a small set of parts, endless builds.",
    },
    {
      type: "p",
      text: "So the payoff moves. Ship one more beautiful screen and you have added one screen. Add one good building block and you have added every future screen that block can be part of. That is a very different return on the same day of work.",
    },
    {
      type: "callout",
      title: "The test I use",
      text: "Can I describe this part's job, its inputs, and how it fails in three plain sentences the AI could act on? If not, it is not a building block. It is a screenshot with extra steps.",
    },
    { type: "h2", text: "Three things break immediately" },
    {
      type: "ol",
      items: [
        "Layout stability. If the screen is built on the spot, content shows up in any order and any amount. Fixed heights, locked columns, and pixel-perfect spacing stop being promises and become wishes.",
        "Learnability. Jakob's Law says people spend most of their time on other apps, so they expect yours to work the same way. A screen that rebuilds itself every time gives them no habit to lean on. So you have to anchor the familiar things instead: navigation, colour, motion, and type.",
        "Accountability. When a person designs a screen, a person owns that call. When the AI builds it, you have to record the trail on purpose: what was shown, from which part, on what data, and how sure it was.",
      ],
    },
    { type: "h2", text: "What replaces the mockup" },
    {
      type: "p",
      text: "Not nothing. The thing you hand over just changes shape. Instead of a screen you ship three things. Building blocks with firm rules. Layout rules that say what can sit next to what. And fallbacks that say what the screen becomes when the AI is unsure or wrong.",
    },
    {
      type: "table",
      head: ["Rule", "What it locks down", "Why the AI needs it"],
      rows: [
        ["Schema", "Allowed inputs and their limits", "Blocks bad data before it shows"],
        ["Confidence", "How sure the data is", "Lets the part show doubt on screen"],
        ["Limits", "Neighbours, nesting, how many", "Blocks layouts that break"],
        ["Fallback", "What shows when data is thin", "Guarantees a clean empty state"],
        ["Failure", "What happens on bad or missing input", "Stops silent breakage"],
      ],
      emphasiseColumn: 1,
      caption:
        "A component is not a real building block until every row here has an answer the AI could act on.",
    },
    {
      type: "code",
      language: "typescript",
      caption: "A building block's rules are a design decision written as a type.",
      text: `export const registry = {
  metricCard: {
    render: MetricCard,
    schema: z.object({
      label: z.string().max(48),
      value: z.number(),
      delta: z.number().optional(),
      confidence: z.enum(["high", "medium", "low"]),
    }),
    // Composition rule: never more than 4 in a row,
    // never nested inside another card.
    constraints: { maxSiblings: 4, nestable: false },
  },
} satisfies Registry`,
    },
    {
      type: "p",
      text: "Notice that confidence is required, not a nice extra. Here, how sure the AI is counts as data. If it is guessing, the part must be able to show that on screen. You make that call once, in the building block, not a thousand times across screens.",
    },
    {
      type: "diagram",
      chart: `flowchart TD
  H[High confidence] --> R1[Render rich primitive]
  R1 --> M{Confidence drops}
  M -->|medium| R2[Simpler primitive plus note]
  M -->|low| R3[Raw data in a plain table]
  M -->|none| R4[Text answer plus retry]`,
      caption:
        "The fallback ladder. As the AI grows less sure, the screen trades polish for honesty one rung at a time. The building block decides which rung it stands on.",
    },
    { type: "h2", text: "The uncomfortable part" },
    {
      type: "p",
      text: "Generative UI is genuinely worse than a hand-drawn screen for any problem you already understand. If the task is small, repeated, and clear, like a checkout, a settings page, or a login, a fixed screen wins on speed, trust, and cost. Bret Victor's point in Magic Ink still holds. Most software problems are really information problems. The best answer is often a still screen that answers the question before you ask it.",
    },
    {
      type: "p",
      text: "So the real skill is not building generative screens. It is knowing where the line is. Generation earns its keep when the problem is too big to list out. Think open exploration, rare support cases, or free-form making. Anywhere the number of possible questions is bigger than the number of screens you could ever draw.",
    },
    {
      type: "takeaway",
      text: "Stop designing screens. Start designing the box of parts those screens are built from. Your payoff is no longer the finished screen. It is the parts, rules, and failure states that decide what the machine is allowed to build for you.",
    },
  ],
  references: [
    {
      label: "AI: First New UI Paradigm in 60 Years",
      detail: "Jakob Nielsen, Nielsen Norman Group",
      href: "https://www.nngroup.com/articles/ai-paradigm/",
    },
    {
      label: "Generative UI and Outcome-Oriented Design",
      detail: "Nielsen Norman Group",
      href: "https://www.nngroup.com/articles/generative-ui/",
    },
    {
      label: "React Server Components RFC",
      detail: "React core team",
      href: "https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md",
    },
    {
      label: "Generative User Interfaces",
      detail: "Vercel AI SDK documentation",
      href: "https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces",
    },
    {
      label: "AI SDK 3.0: Generative UI",
      detail: "Vercel Engineering",
      href: "https://vercel.com/blog/ai-sdk-3-generative-ui",
    },
    {
      label: "Magic Ink: Information Software and the Graphical Interface",
      detail: "Bret Victor, 2006",
      href: "https://worrydream.com/MagicInk/",
    },
    {
      label: "Jakob's Law of Internet User Experience",
      detail: "Laws of UX",
      href: "https://lawsofux.com/jakobs-law/",
    },
  ],
}
