import type { Article } from "../types"

export const provenance: Article = {
  id: "provenance",
  title: "Trust Is a Rendering Problem",
  subtitle: "Designing provenance into retrieval-augmented systems",
  date: "Jul 2026",
  readTime: "5 min read",
  excerpt:
    "RAG fixed the engineering half of AI making things up. The human half is still wide open, and it is ours. Here is a simple way to show where an answer came from, and how much to trust it.",
  tags: ["AI UX", "Trust", "Research"],
  content: [
    {
      type: "lede",
      text: "A model that is right 95 percent of the time, with no way to tell which 5 percent is wrong, is less useful than one that is right 80 percent of the time and admits when it is unsure. Being accurate is an engineering goal. Knowing when to doubt itself is a design one.",
    },
    {
      type: "p",
      text: "Retrieval-augmented generation, or RAG, solved the obvious problem. RAG just means the AI looks things up first, then answers. Instead of asking the model to recall a fact from memory, you fetch it from a real source and hand it over. The AI makes things up far less often. Engineering calls it a win and moves on.",
    },
    {
      type: "sourcecard",
      title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      publisher: "Meta AI / NeurIPS 2020",
      description: "The original RAG paper and its diagram of how a model fetches real documents before it answers.",
      href: "https://arxiv.org/abs/2005.11401",
    },
    {
      type: "p",
      text: "But the user is left knowing exactly as little as before. They read smooth, confident text with no way to tell where a sentence came from. Was it the fetched document, the model's own memory, or the join where the two were stitched together? Smooth writing is not proof. We have just moved the problem from the model to the screen.",
    },
    {
      type: "diagram",
      chart: `flowchart TD
  Q["Query"] --> E["Embed"]
  E --> V[("Vector store")]
  V --> R["Top-k chunks"]
  R --> L["Model"]
  L --> A["Answer"]
  R --> P["Where it came from<br/>claim to source"]
  P --> UI["Rendered answer<br/>with attribution"]
  A --> UI
  L -.->|"unsupported span"| W["Flag: no source"]
  W --> UI`,
      caption:
        "The map of where the answer came from is a real output, not a debug note. If you do not show it, it does not exist.",
    },
    { type: "h2", text: "Three levels of attribution" },
    {
      type: "figure",
      src: "/assets/journal/card-catalog.jpg",
      alt: "An open library card catalogue drawer packed with index cards. One card is raised to show a bibliographic reference, with coloured clips marking groups.",
      caption:
        "Before search engines, this was how you proved where a fact came from. Every card pointed at a real shelf. Good attribution does the same for an answer, and it is the part most AI still skips.",
      credit: "TBurmeister (WMF), via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Card_catalog_at_the_Indiana_State_Library_-_interior_view_of_catalog_cards.jpg",
      licence: "CC BY-SA 4.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/4.0",
      aspect: "3 / 2",
    },
    {
      type: "p",
      text: "Most products ship level one and call it citations. The gap between one and three is where trust actually lives. Think of a recipe that tells you which shop each ingredient came from. Good attribution does that for an answer.",
    },
    {
      type: "ol",
      items: [
        "Document level. A list of links under the answer. Cheap, common, and almost useless. It proves the system read something, not that this sentence came from it.",
        "Passage level. Each claim points to an exact passage in an exact source. Hover or tap the claim and you see the exact text. This is the lowest bar for anything a professional will act on.",
        "Conflict level. The system tells you when its sources disagree, and shows you both. This is where an AI tool stops acting like an oracle and starts acting like a research tool.",
      ],
    },
    {
      type: "compare",
      left: {
        title: "Answer with no sources",
        items: [
          "Smooth text in one confident voice",
          "No way to see which claim came from where",
          "You must redo the search to check it",
          "Sources that disagree stay hidden",
        ],
      },
      right: {
        title: "Answer with sources",
        items: [
          "Each claim linked to a source passage",
          "Hover or tap reveals the exact passage",
          "Checking takes seconds, not minutes",
          "Sources that disagree are shown, not blended",
        ],
      },
      caption:
        "Same model, same documents. The only difference is whether the screen shows the evidence or hides it.",
    },
    {
      type: "quote",
      text: "Users need to be able to verify AI output, and the interface must make verification cheaper than doing the task manually. Otherwise the AI is a liability.",
      author: "Ben Shneiderman",
      source: "Human-Centered AI, Oxford University Press",
    },
    {
      type: "sourcecard",
      title: "Human-Centered Artificial Intelligence: Reliable, Safe & Trustworthy",
      publisher: "Ben Shneiderman",
      description: "The case that people must be able to check AI output, and that the interface has to make checking cheap.",
      href: "https://arxiv.org/abs/2002.04087",
    },
    { type: "h2", text: "The cost-of-checking test" },
    {
      type: "p",
      text: "Here is the only number I care about when reviewing an AI feature. Measure how long it takes a user to confirm an answer is right. If checking takes longer than just doing the work, the feature is a loss, no matter how good the demo looked.",
    },
    {
      type: "chart",
      unit: "s",
      data: [
        { label: "Do it manually", value: 240, display: "4 min" },
        { label: "Answer, no citations", value: 300, display: "5 min" },
        { label: "Document-level links", value: 150, display: "2.5 min" },
        { label: "Passage-level sources", value: 35, display: "35 s", highlight: true },
      ],
      caption:
        "Time to check one fact in an internal-docs assistant. A rough pattern from testing sessions I have run. The shape holds even when the exact numbers move.",
      source: "Kousik Dutta, moderated testing notes",
    },
    {
      type: "p",
      text: "Look at the second bar. An answer with no sources is often slower than no answer at all. The user now has to work out the search that would have found the source. You added a step and called it automation.",
    },
    { type: "h2", text: "Showing doubt without wrecking the page" },
    {
      type: "p",
      text: "The naive move is a percentage. Ninety-two percent sure. Users cannot act on that. Worse, models are famously bad at judging their own odds. What works is simple ranking, shown visually, and tied to what is at stake.",
    },
    {
      type: "ul",
      items: [
        "Backed claims look normal. Full contrast, no fuss. This is the default, and it should feel like reading, not like an audit.",
        "Unbacked bits fade back: lower contrast, a thin underline, and a way to ask why. Never a red warning. You are flagging doubt, not an error.",
        "Sources that disagree get a real UI element: both claims side by side, both sources named, no blending. The model must never average two clashing documents into one confident sentence.",
        "Old sources show their age. A right answer from a document replaced eight months ago is a wrong answer with good manners.",
      ],
    },
    {
      type: "table",
      head: ["Support level", "How it looks", "What you can do"],
      rows: [
        ["Backed", "Full contrast, reads as normal text", "Hover shows the exact source passage"],
        ["Reasoned", "Normal weight, a small join mark", "Shows the sources it reasoned across"],
        ["Unbacked", "Lower contrast, thin underline", "Tap to ask why, never a red alert"],
        ["Conflict", "Both claims shown side by side", "Each source named, no blending"],
        ["Old", "An age badge on the citation", "Warns when the source is out of date"],
      ],
      emphasiseColumn: 1,
      caption:
        "Doubt shown as a simple ranking tied to what is at stake, never a raw percentage the user cannot act on.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "Where a claim came from is built into the response, not tacked on afterwards.",
      text: `type Span = {
  text: string
  support:
    | { kind: "grounded"; sourceId: string; offset: [number, number] }
    | { kind: "inferred"; from: string[] }   // reasoned across sources
    | { kind: "unsupported" }                // model memory only
    | { kind: "conflict"; sources: string[] }
}

// The renderer never receives a plain string.
// If a span cannot declare its support, it does not render.
function Answer({ spans }: { spans: Span[] }) { /* ... */ }`,
    },
    {
      type: "callout",
      title: "The design constraint that changes everything",
      text: "Make it impossible for the screen to show a claim with no source. Not a lint rule, not a guideline. A type error. Trust lasts exactly as long as the code forces it.",
    },
    { type: "h2", text: "Why this is a design problem and not an ML one" },
    {
      type: "p",
      text: "No model upgrade removes the need to show where the answer came from. Even a perfectly accurate system on your company's documents needs to show its work. The user's question is rarely just what is true. It is true according to whom, as of when, and does anyone here disagree. Those are editorial questions. They have always been design questions.",
    },
    {
      type: "p",
      text: "This is why I think these source patterns will end up in design systems, the way focus states and empty states did. A citation is not a link. It is a component with states, thresholds, keyboard behaviour, and a clear story for when the source is deleted, locked, or wrong.",
    },
    {
      type: "takeaway",
      text: "Stop designing the answer. Design the evidence around it. The goal you can measure is not accuracy. It is cutting the cost of checking until trusting the machine is faster than doubting it.",
    },
  ],
  references: [
    {
      label: "Human-Centered Artificial Intelligence: Reliable, Safe & Trustworthy",
      detail: "Ben Shneiderman, 2020",
      href: "https://arxiv.org/abs/2002.04087",
    },
    {
      label: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
      detail: "Lewis et al., Meta AI / NeurIPS 2020",
      href: "https://arxiv.org/abs/2005.11401",
    },
    {
      label: "AI Chat Is Not (Always) the Answer",
      detail: "Nielsen Norman Group",
      href: "https://www.nngroup.com/articles/ai-chat-not-the-answer/",
    },
    {
      label: "Patterns for Building LLM-based Systems and Products",
      detail: "Eugene Yan",
      href: "https://eugeneyan.com/writing/llm-patterns/",
    },
    {
      label: "Squish Meets Structure: Designing with Language Models",
      detail: "Maggie Appleton",
      href: "https://maggieappleton.com/squish-structure",
    },
  ],
}
