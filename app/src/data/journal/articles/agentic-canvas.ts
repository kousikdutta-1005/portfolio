import type { Article } from "../types"

export const agenticCanvas: Article = {
  id: "agentic-canvas",
  title: "The Chat Box Is a Local Maximum",
  subtitle: "What replaces conversation when the machine can act",
  readTime: "8 min read",
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
      src: "/assets/journal/atc-room.webp",
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
    { type: "h2", text: "Three things a transcript cannot do" },
    {
      type: "p",
      text: "The chat log fails as a workspace for three specific reasons, and naming them tells you what to build instead. It is linear. It has no addressable state. And you cannot branch from it.",
    },
    {
      type: "p",
      text: "Linear means one axis, append-only. The transcript grows in a single direction, and the only move is to add another line at the bottom. There is no up, no sideways, no room to lay two attempts next to each other. A spreadsheet gives you a grid. A canvas gives you a plane. A chat gives you a rope, and you can only ever tie another knot at the end.",
    },
    {
      type: "p",
      text: "No addressable state means you cannot point at a past result and use it. A spreadsheet cell has an address, B7, and you can say add B7 to C7 and build on it forever. A chat line has no address. When the agent produced a good table six messages ago, you cannot hand that exact object back and say revise this. You retype it, or you scroll up, copy the text, and paste it into a new message. The result the agent already made is trapped in the scroll, unreachable by name.",
    },
    {
      type: "p",
      text: "No branching means you cannot fork. Say the agent drafts a plan and you want to try a cheaper variant without losing the first. In a chat you ask again, and the new answer buries the old one. The only fork is in your head, holding two versions in a memory that tops out at about four things. Research prototypes like Sensecape and Graphologue exist precisely to break this: they turn a model's linear replies into a space you can lay out, revisit, and split. That is the tell. The moment work gets real, people build a canvas around the chat.",
    },
    {
      type: "sourcecard",
      title: "Sensecape: Multilevel Exploration and Sensemaking with LLMs",
      publisher: "Suh et al., UIST 2023",
      description: "A research interface that turns linear model output into a space you can lay out, group, and revisit.",
      href: "https://arxiv.org/abs/2305.11483",
    },
    {
      type: "p",
      text: "So a working surface has to supply exactly what the transcript withholds. Addressability, so every output is an object you and the agent can name and reference. Branching, so any result can fork into a variant while the original survives, the way Save As or a git branch keeps the old version alive. Reversibility, so you can walk any change back. Get those three and the rope becomes a workbench.",
    },
    {
      type: "table",
      head: ["Property", "Chat log", "Canvas"],
      rows: [
        ["Shape", "One line, append-only", "A plane you lay work out on"],
        ["Addressable", "No handle on a past result", "Every output is a named object"],
        ["Branchable", "New answer buries the old", "Fork a variant, keep the original"],
        ["Reversible", "Undo means scroll and retype", "Walk any change back a step"],
      ],
      emphasiseColumn: 2,
      caption:
        "The three things a transcript cannot do, and what a canvas puts in their place. None of this is about tone. It is about whether work has a home outside the scroll.",
    },
    {
      type: "p",
      text: "Picture the difference with one task. You ask an agent to build a launch plan. On a canvas it drops a plan object on the board. You like the timeline but want a leaner budget, so you fork the plan into a second card and tell the agent to cut it by a third. Now two plans sit side by side, both live, both editable, and you compare them at a glance. In a chat, the leaner budget arrives as a wall of text below the first, which has already scrolled half off the screen. To compare them you hold both in your head, and your head holds about four things. The canvas does the remembering so you do not have to.",
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
    { type: "h2", text: "This argument is older than chat" },
    {
      type: "p",
      text: "Spatial working surfaces are not a reaction to chatbots. They are the main line of computing, and chat is the detour. Douglas Engelbart's 1968 demo, the one people call the mother of all demos, already had windows, linked documents, and two people editing a shared screen they could both point at. The direct manipulation work of the 1980s made the case plainly: people do better when they act on visible objects and see the result at once, instead of typing commands into a void and reading back a report. A chat log undoes both. It hides the objects and answers in prose. We did not discover a better interface. We shipped a worse one because it was faster to build.",
    },
    {
      type: "sourcecard",
      title: "The Mother of All Demos",
      publisher: "Douglas Engelbart, 1968",
      description: "The 1968 demonstration that introduced windows, hypertext links, and shared on-screen editing decades before chat.",
      href: "https://en.wikipedia.org/wiki/The_Mother_of_All_Demos",
    },
    {
      type: "p",
      text: "The fair objection is that chat won for good reasons, not just laziness. It is the most forgiving interface ever made: one box that accepts anything, teaches itself, and never shows an error for the wrong button because there are no buttons. For a brand new capability nobody knows how to use yet, that forgiveness is priceless, and a canvas full of specialised controls would have scared people off. So chat was the right start. The claim is narrower than it sounds. Chat is the right way in and the wrong place to keep the work. Once you know what you are doing, blankness stops helping and starts hiding the state you need to see.",
    },
    {
      type: "p",
      text: "The lesson repeats every generation. Command lines gave way to windows and a mouse because pointing at a thing beats describing it. Then, for a while, windows gave way to the chat box, because describing a thing is the fastest way to use a power you do not yet understand. Now the power is understood well enough to point at again. The swing is not random. It moves toward talking when a tool is new and strange, and back toward pointing once the work turns routine and the objects worth naming pile up.",
    },
    { type: "h2", text: "What to do on Monday" },
    {
      type: "p",
      text: "Take one thing your agent produces and stop treating it as a message. Give it an id, a name, and a place on screen that survives the next turn. Add two buttons: duplicate, so a result can fork without destroying the original, and undo, so any change walks back. That is the whole first step. You do not need a grand canvas to begin. You need one output that behaves like an object instead of a line in a transcript, and the rest of the surface tends to follow from that single decision.",
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
      label: "The Mother of All Demos",
      detail: "Douglas Engelbart, 1968",
      href: "https://en.wikipedia.org/wiki/The_Mother_of_All_Demos",
    },
    {
      label: "Sensecape: Multilevel Exploration and Sensemaking with LLMs",
      detail: "Suh, Min, Palani & Xia, UIST 2023",
      href: "https://arxiv.org/abs/2305.11483",
    },
    {
      label: "Graphologue: Exploring LLM Responses with Interactive Diagrams",
      detail: "Jiang et al., UIST 2023",
      href: "https://arxiv.org/abs/2305.11473",
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
