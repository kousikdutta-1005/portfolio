import type { Article } from "../types"

export const designEngineering: Article = {
  id: "design-engineering",
  title: "The Handoff Was Always a Translation Loss",
  subtitle: "Why a design decision should compile, not get redrawn from a picture",
  readTime: "8 min read",
  excerpt:
    "A mockup is a picture of a decision, and a picture leaves things out. Every time it crosses to another team, more gets lost. The fix is to write the decision as data a build can turn into code, so nobody has to guess it back.",
  tags: ["Design Engineering", "Systems", "Tooling"],
  content: [
    {
      type: "lede",
      text: "Here is the uncomfortable truth about a design file. It is a photo of a cake, not the recipe. The recipe lives in your head: why this spacing, which rule you were following, which tricky case you were guarding against. The file carries none of that. It carries a picture, and a hope.",
    },
    {
      type: "figure",
      src: "/assets/journal/typesetting.webp",
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
      text: "An engineer works backwards from the picture and tries to guess the recipe. They get it eighty percent right, which is impressive. The missing twenty percent turns into a ticket called polish that nobody ever picks up. Multiply that by every screen, every sprint, every year. That pile of lost twenty percents is exactly what people mean when they say a product feels cheap.",
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
        title: "Decisions written as data",
        items: [
          "Intent named as a token with a value and a type",
          "One source builds every platform",
          "A drift from the source fails a check before merge",
          "Versioned and reviewed like any other code",
        ],
      },
      caption:
        "The shift is not about tooling taste. It is about where the decision lives: in a picture someone has to decode, or in something the build can read.",
    },
    { type: "h2", text: "A token is a decision you can compile" },
    {
      type: "p",
      text: "A design token is a named decision. Instead of writing a colour as a hex code inside a picture, you give it a name that carries meaning: surface-raised, text-secondary, accent-pressed. It is like calling a colour danger instead of copying the same hex everywhere. The name holds the intent. Once a machine can read the intent, it can be checked, versioned, and reasoned about.",
    },
    {
      type: "p",
      text: "The idea comes from Salesforce. Around 2014 two people there, Jina Anne and Jon Levine, gave it a name and built an early tool called Theo that turned one list of decisions into files for every platform. Amazon later released Style Dictionary, which does the same job and is now the tool most teams reach for. The W3C then started writing a shared file format so tokens are not locked to one vendor. So this is not a fad. It is a decade-old practice that finally has a standard.",
    },
    {
      type: "sourcecard",
      title: "What Are Design Tokens?",
      publisher: "CSS-Tricks",
      description: "A plain walk through of the idea and its Salesforce origin, with the Theo tool that started it.",
      href: "https://css-tricks.com/what-are-design-tokens/",
    },
    { type: "h2", text: "Follow one token through the whole pipeline" },
    {
      type: "p",
      text: "The word token hides a journey. The same decision wears three different bodies before it reaches a screen, and something can break at each change of clothes. Follow one accent colour from a designer's swatch to a running app.",
    },
    {
      type: "p",
      text: "Stage one is a value in a design tool. In Figma the accent is a swatch in a styles panel, a hex like #2F6BFF with a friendly name. It looks solid, but it means nothing to code. It is still a picture of a decision. The thing that breaks here is naming. If the swatch is called blue instead of accent, the intent is gone. If two swatches share a hex but mean different things, an export flattens them into one and a later change hits both.",
    },
    {
      type: "p",
      text: "Stage two is a platform neutral format. You export that swatch as one line in a JSON file: a name, a value, and a type that says this is a colour. This is the hop that matters, because the decision finally leaves the picture and becomes plain text any machine can read. The thing that breaks here is drift. If a human exports by hand, the file and the design tool slide apart within a week. The fix is to make the design tool the source and generate the file, never retype it.",
    },
    {
      type: "p",
      text: "Stage three is code. A build step, usually Style Dictionary, reads that JSON and writes a real file for each platform: a CSS custom property named --accent for the web, a Swift constant for iOS, an Android colour resource. The thing that breaks here is the long tail. A flat colour converts cleanly. A gradient, a shadow, a font stack, or a value in rem does not, because every platform spells those differently, and the build needs a rule for each type or it quietly drops them.",
    },
    {
      type: "p",
      text: "The two code bodies are not the same kind of thing, and the difference matters. A CSS custom property is alive at runtime. The browser reads --accent while the page is running, so you can swap it for a dark theme or a tenant brand without rebuilding anything. A Swift constant is baked in when the app is compiled, so changing it means a new build and a trip through the app store. Same decision, two lifespans. Knowing which is which is the difference between a theme that switches instantly and one that ships next week.",
    },
    {
      type: "p",
      text: "This is why the type on each token is not decoration. Style Dictionary reads the type and picks a transform, which is just a small rule for converting one value into one platform's dialect. A colour becomes a hex on the web and a Color in Swift. A dimension becomes a rem on the web and a plain number of points on iOS. Get the type wrong and the transform guesses, which is how a spacing value ends up as sixteen pixels in one place and sixteen points in another and nobody notices until the layout looks off on a phone.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "One decision, three bodies. The JSON on top is the single source. A build writes the two files below it. Change the hex once and both platforms move together.",
      text: `// source of truth: platform neutral, DTCG shape
{
  "color": {
    "accent": { "$type": "color", "$value": "#2F6BFF" }
  }
}

// generated for web
:root { --accent: #2F6BFF; }

// generated for iOS
enum Palette { static let accent = Color(hex: 0x2F6BFF) }`,
    },
    {
      type: "table",
      head: ["Stage", "What the token is here", "What breaks at this hop"],
      rows: [
        [
          "Design tool",
          "A named swatch, a picture of a value",
          "Bad names, two intents sharing one hex",
        ],
        [
          "Neutral format",
          "A line of JSON: name, value, type",
          "Hand export drifts from the design file",
        ],
        [
          "Platform code",
          "A CSS variable or a Swift constant",
          "Gradients, shadows and units convert badly",
        ],
      ],
      caption:
        "The same decision, three times, in three bodies. Most token programmes fail not at the idea but at one of these hops, and the failure is always a quiet drift, not a crash.",
      emphasiseColumn: 2,
    },
    {
      type: "sourcecard",
      title: "Style Dictionary",
      publisher: "Amazon, open source",
      description: "The build step that reads one token file and writes CSS, Swift, Android and more. See the transforms that handle each type.",
      href: "https://styledictionary.com/",
    },
    {
      type: "quote",
      text: "A design system isn't a project. It's a product, serving products.",
      author: "Nathan Curtis",
      source: "EightShapes",
    },
    { type: "h2", text: "The honest case against the pipeline" },
    {
      type: "p",
      text: "For a small team this whole machine is overhead, and hand written CSS is faster. That is true, and I have learned it the hard way. If you are two people shipping one web app, you do not need a build that emits Swift and Android for platforms you will never have. Setting up Style Dictionary, agreeing a naming scheme, and wiring the export can eat a week you could have spent shipping the actual product. I once spent three days building a token pipeline for a prototype that shipped on one platform and got thrown away a month later. Nobody but me ever read a single token.",
    },
    {
      type: "p",
      text: "So the pipeline is not free virtue. It is a trade. It starts paying the day your decisions have to live in more than one place: a second codebase, a native app, a marketing site on a different stack, or a brand that gets restyled twice a year. Below that line, a variables file in plain CSS is the right amount of structure. The rule I use now is simple. Add the pipeline the day you copy a hex code into a second codebase, and not one day before.",
    },
    {
      type: "table",
      head: ["Skip the pipeline when", "Build the pipeline when"],
      rows: [
        ["One platform, one codebase", "Web plus at least one native app"],
        ["Two or three people who talk daily", "Enough people that nobody sees every change"],
        ["A brand that never moves", "A brand that gets restyled on a schedule"],
        ["Hand written CSS you can hold in your head", "Values you keep copying between repos"],
      ],
      caption:
        "The pipeline is a tax below a certain size and a saving above it. The honest skill is knowing which side of the line you are on, and not setting it up out of fashion.",
      emphasiseColumn: 1,
    },
    { type: "h2", text: "Why this is suddenly urgent" },
    {
      type: "p",
      text: "Machines now write most of the boilerplate. When a model generates your components, the quality of what comes out is capped by the quality of the rules you handed it. A design system that is a beautiful PDF is invisible to a code writing model. A design system written as tokens with values and types is the most useful context you can give it, because it can read the decision instead of guessing at a screenshot.",
    },
    {
      type: "p",
      text: "This is the practical reason the token to code step has become the highest payoff skill on a product team. Not because every designer should learn React. Plenty of great designers never will. It is because the things that now control what gets built are files, and someone with design judgement needs to be writing them.",
    },
    {
      type: "p",
      text: "There is a quieter payoff too. When decisions live as data, you can ask questions of them. How many greys do we really have. Which spacing steps does nobody use. Where does a raw hex still hide instead of a token. A picture cannot answer any of that. A folder of JSON can, with a script you write in an afternoon. The design system stops being a thing you believe in and becomes a thing you can measure.",
    },
    {
      type: "callout",
      title: "The rule of thumb",
      text: "If a decision can be broken quietly, it will be. Anything you care about enough to write down twice should move out of a document and into a token file the build can read, so a drift shows up as a failed check and not as a slow decay nobody notices.",
    },
    { type: "h2", text: "What I actually do differently" },
    {
      type: "ol",
      items: [
        "Prototype in the real medium. The browser tells the truth about text wrapping, focus order, and how a value actually renders. A design file cannot lie to you if you never let it speak.",
        "Ship the decision, not the picture. When I settle a colour, a spacing step, or a radius, what I hand over is a token added to the source, not a redlined screenshot for someone to copy.",
        "Generate, never retype. The design tool is the source. The JSON is generated from it, and the platform files are generated from the JSON. The moment a human retypes a value, the drift begins.",
        "Put the check in the build. Contrast ratios and token drift should fail a merge, not wait for a reviewer to notice. If it is not checked, it rots.",
      ],
    },
    {
      type: "callout",
      title: "Prediction: static redlined handoff is gone from serious design systems by 2028",
      text: "I am basing this on tokens being a decade old and now having a W3C format plus a default build tool in Style Dictionary. My hunch is that within a few years, handing an engineer a flat mockup to rebuild by hand will look as odd as faxing a contract. I could be wrong. If token tooling stays too fiddly for small teams to adopt, the old handoff survives simply because it needs no setup, and I will have called it early.",
    },
    { type: "h2", text: "The objection, and my answer" },
    {
      type: "p",
      text: "People worry this turns design into engineering and drains the craft out of it. I think the opposite happens. Every hour not spent nudging spacing by a pixel or explaining a value for the fourth time is an hour freed for the work only a designer can do: deciding what the product should mean, how it should feel, and what it should refuse to do.",
    },
    {
      type: "takeaway",
      text: "Stop shipping pictures of decisions. Write the decision as a token with a value and a type, and let the build turn it into code for every platform. The handoff was always a translation loss. The fix is to remove the translation.",
    },
  ],
  references: [
    {
      label: "Design Tokens Community Group Format",
      detail: "W3C Design Tokens Community Group",
      href: "https://tr.designtokens.org/format/",
    },
    {
      label: "What Are Design Tokens?",
      detail: "CSS-Tricks, on the Salesforce origin and Theo",
      href: "https://css-tricks.com/what-are-design-tokens/",
    },
    {
      label: "Style Dictionary",
      detail: "Amazon, open-source token build tool",
      href: "https://styledictionary.com/",
    },
    {
      label: "Using CSS Custom Properties",
      detail: "MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",
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
      label: "Notes on the Synthesis of Form",
      detail: "Christopher Alexander, Harvard University Press, 1964",
      href: "https://www.hup.harvard.edu/books/9780674627512",
    },
  ],
}
