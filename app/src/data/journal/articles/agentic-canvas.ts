import type { Article } from "../types"

export const agenticCanvas: Article = {
  id: "agentic-canvas",
  title: "The Chat Box Is a Local Maximum",
  subtitle: "What replaces conversation when the machine can act",
  readTime: "5 min read",
  excerpt:
    "Chat was the fastest way to ship a language model. It is not the right tool for real work. What agentic software needs is space, memory, and a place to stand while the machine runs.",
  tags: ["Agentic UI", "Interaction", "Systems"],
  content: [
    {
      type: "lede",
      text: "Chat won because it was the shortest path from a model to a product, not because it fits how we think. It is one long list you can only add to, with no sense of place and no way to hold two ideas side by side. We used to call that a terminal.",
    },
    {
      type: "p",
      text: "Amelia Wattenberger put the problem well. A chat box gives you a blank space and no hints. It offers endless options and zero guidance, so the user has to already know what the system can do. Good tools show what they do in their shape. A hammer tells you about nails.",
    },
    {
      type: "quote",
      text: "Good tools make it clear how they should be used. A chat interface is a text box that gives no hint about what it can do.",
      author: "Amelia Wattenberger",
      source: "Why Chatbots Are Not the Future",
    },
    {
      type: "sourcecard",
      title: "Why Chatbots Are Not the Future",
      publisher: "Amelia Wattenberger",
      description: "The argument that a blank chat box hides what a tool can do, with sketches of what could replace it.",
      href: "https://wattenberger.com/thoughts/boo-chatbots",
    },
    { type: "h2", text: "The problem is not talking. It is the single line." },
    {
      type: "figure",
      src: "/assets/journal/atc-room.jpg",
      alt: "An air traffic control approach room. Controllers sit at large radar screens in a dim room of 1990s equipment, watching shared displays.",
      caption:
        "Nobody runs an airport through a chat window. The work is spread out in space so everyone can see the whole picture at once. That is the case for a canvas over a chat log.",
      credit: "The original uploader was Duke le palois at French Wikipedia., via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:ATC_approach_room.jpg",
      licence: "CC BY-SA 2.5",
      licenceHref: "https://creativecommons.org/licenses/by-sa/2.5",
      width: 1200,
      height: 900,
    },
    {
      type: "p",
      text: "Human working memory holds about four things at once. So we push ideas out into the world: whiteboards, sticky notes, three windows side by side, a sketch in the margin. Every serious work tool ever built, the spreadsheet, the code editor, the music studio, the design app, gives your work a place. You can see the whole job at once, and point at any part of it.",
    },
    {
      type: "p",
      text: "A chat log throws that away. Your work lives in the scroll bar. Anything older than a screen is as good as gone. And because you take strict turns, like texting one line at a time, you cannot watch the machine while it works. You just wait, then read a wall of text about what it already did.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  subgraph Chat["Conversational model"]
    direction TB
    C1["User turn"] --> C2["Agent turn"] --> C3["User turn"] --> C4["Agent turn"]
  end
  subgraph Canvas["Agentic canvas"]
    direction LR
    S["Shared state"] --- A1["Agent working<br/>(observable)"]
    S --- U1["Human editing<br/>(concurrent)"]
    S --- AR["Objects<br/>(saved, nameable)"]
  end
  Chat -->|"add space + parallel work"| Canvas`,
      caption:
        "Chat forces you to take turns. A canvas lets you work at the same time. The human and the agent share one worktop instead of passing notes.",
    },
    {
      type: "compare",
      left: {
        title: "Chat log",
        items: [
          "Your work lives in the scroll bar",
          "Anything older than a screen is gone",
          "Strict turns: you wait, then read",
          "Outputs are messages, not objects",
          "No two ideas held side by side",
        ],
      },
      right: {
        title: "Agentic canvas",
        items: [
          "Your work is visible and nameable",
          "Work is saved as real objects",
          "Human and agent work at the same time",
          "Outputs are objects you can revise",
          "The whole task stays in view at once",
        ],
      },
      caption:
        "The difference is not tone or wording. It is whether the work has a place to live outside the transcript.",
    },
    { type: "h2", text: "Three things any agentic surface needs" },
    {
      type: "ol",
      items: [
        "Nameable objects. Everything the agent makes must be a real, saved object with a name, not a message. You should be able to name it, edit it, copy it into a new version, and hand it back to the agent without copy-paste.",
        "Visible work. The agent's plan must be clear before it runs and readable while it runs. Anthropic's own guidance on building agents is blunt about this. The more freedom you give an agent, the more you must show what it is doing and set guardrails. You are trading a sure result for more power.",
        "Easy to stop. A human must be able to stop, redirect, or undo at any step, and that must cost almost nothing. If stopping is hard, people stop watching. And agents no one watches fail quietly, at scale.",
      ],
    },
    {
      type: "sourcecard",
      title: "Building Effective Agents",
      publisher: "Anthropic",
      description: "Anthropic's plain guidance on giving agents freedom, showing their work, and setting guardrails.",
      href: "https://www.anthropic.com/engineering/building-effective-agents",
    },
    { type: "h2", text: "Designing for a machine that acts" },
    {
      type: "p",
      text: "The moment the model can act instead of just answer, the risk changes completely. A wrong sentence is annoying. A wrong action is an incident. Think of hitting undo in a document versus sending an email you cannot unsend. So the interface needs something chat never did: a sense of consequence.",
    },
    {
      type: "table",
      head: ["Consequence", "Example action", "What the UI does"],
      rows: [
        ["Reversible", "Rename a draft, tweak a value", "Just do it, toast with undo"],
        ["Recoverable", "Send mail, edit a shared doc", "Show the diff, one click to proceed"],
        ["Irreversible", "Delete records, deploy, spend", "Type the target name, no undo offered"],
      ],
      emphasiseColumn: 2,
      caption:
        "How much friction you add depends on whether the action can be undone, not on how sure the model is. The middle tier can be undone but it costs you, so it earns a diff: a quick before-and-after view.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "Matching friction to consequence: the UI leans harder the less an action can be undone.",
      text: `type Consequence = "reversible" | "costly" | "irreversible"

const gate: Record<Consequence, Gate> = {
  // Just do it. Show a toast with undo.
  reversible:   { confirm: false, undoWindowMs: 8000 },
  // Show the diff. One click to proceed.
  costly:       { confirm: "diff", undoWindowMs: 30000 },
  // Type the target name. No undo exists, so say so.
  irreversible: { confirm: "explicit", undoWindowMs: 0 },
}`,
    },
    {
      type: "p",
      text: "This is Jef Raskin's old point about modes and undo, aimed at agents. The goal is not to stop the agent from acting. It is to make the cost of being wrong match the cost of being stopped, and to keep most actions in the undo-able tier, where speed is free.",
    },
    {
      type: "callout",
      title: "The reversibility budget",
      text: "Count what fraction of your agent's available actions are reversible. If it is under 80 percent, you do not have an autonomy problem. You have an architecture problem. Build the undo before you build the agent.",
    },
    {
      type: "chart",
      unit: "%",
      data: [
        { label: "Reversible", value: 72, display: "72%" },
        { label: "Recoverable", value: 21, display: "21%" },
        { label: "Irreversible", value: 7, display: "7%", highlight: true },
      ],
      caption:
        "The mix of actions for an agent I reviewed. The seven percent you cannot undo is where nearly all the design work goes. A rough picture, from my own project logs.",
      source: "Kousik Dutta, project audit notes",
    },
    { type: "h2", text: "The command palette was the hint" },
    {
      type: "p",
      text: "The best interaction pattern of the last decade already solved half of this. The command palette lets you type in plain words, but from a short, visible list of actions, with instant preview. It is fast because it limits your choices. Agentic UI keeps that precision and lifts the ceiling.",
    },
    {
      type: "p",
      text: "My hunch is that chat shrinks into that role. Not the product. The way in. A thin, always-there box for saying what you want, sitting on top of a canvas where the real work piles up. The conversation becomes the steering wheel. The canvas holds the truth.",
    },
    { type: "h2", text: "What this asks of designers" },
    {
      type: "p",
      text: "Mostly, it asks us to design systems you can see the state of. That is an old craft. Don Norman has argued for showing system status since 1988, and it sits at number one in Nielsen's list of rules for a reason. Agentic software just raises the stakes. For the first time, the system is doing things while you look away.",
    },
    {
      type: "takeaway",
      text: "Chat is a steering wheel, not a workspace. Give the agent a surface where its work becomes saved, visible, and undo-able. Match the friction to the consequence, not to how confident the model sounds.",
    },
  ],
  references: [
    {
      label: "Why Chatbots Are Not the Future",
      detail: "Amelia Wattenberger",
      href: "https://wattenberger.com/thoughts/boo-chatbots",
    },
    {
      label: "Building Effective Agents",
      detail: "Anthropic Engineering",
      href: "https://www.anthropic.com/engineering/building-effective-agents",
    },
    {
      label: "10 Usability Heuristics for User Interface Design",
      detail: "Jakob Nielsen, Nielsen Norman Group",
      href: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    },
    {
      label: "The Humane Interface",
      detail: "Jef Raskin, Addison-Wesley, 2000",
      href: "https://en.wikipedia.org/wiki/The_Humane_Interface",
    },
    {
      label: "Direct Manipulation Interfaces",
      detail: "Hutchins, Hollan & Norman, 1985",
      href: "https://en.wikipedia.org/wiki/Direct_manipulation_interface",
    },
    {
      label: "Language Model Sketchbook, or Why I Hate Chatbots",
      detail: "Maggie Appleton",
      href: "https://maggieappleton.com/lm-sketchbook",
    },
    {
      label: "State Machines and Statecharts",
      detail: "Stately / XState documentation",
      href: "https://stately.ai/docs/state-machines-and-statecharts",
    },
    {
      label: "Malleable Software in the Age of LLMs",
      detail: "Geoffrey Litt",
      href: "https://www.geoffreylitt.com/2023/03/25/llm-end-user-programming.html",
    },
  ],
}
