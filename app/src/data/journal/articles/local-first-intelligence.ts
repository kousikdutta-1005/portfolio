import type { Article } from "../types"

export const localFirst: Article = {
  id: "local-first-intelligence",
  title: "The Fastest Network Request Is the One You Never Make",
  subtitle: "Keeping data and smarts on your own device, and why it changes the design",
  date: "Jan 2026",
  readTime: "5 min read",
  excerpt:
    "Cloud-first apps made a deal nobody asked you to sign. Your data lives on someone else's computer, and every click has to travel there and back. Local-first flips that. And it changes far more than speed.",
  tags: ["Local-first", "Performance", "Architecture"],
  content: [
    {
      type: "lede",
      text: "Open a document in a cloud app on a plane and you get a spinner over text you already had. That is not a bug. It is the app being honest about how it was built. The server owns the truth, and you are just a window looking at it.",
    },
    {
      type: "figure",
      src: "/assets/journal/cable-map.jpg",
      alt: "An old hydrographic chart of the world showing the network of submarine cables and telegraph lines strung between the continents.",
      caption: "Your data has a real address. Every request that crosses an ocean pays for the crossing in milliseconds, and no clever code makes the ocean narrower. Local-first is the decision not to cross it.",
      credit: "Bibliothèque nationale de France, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:The_telegraph_communications_of_the_world_-_afforded_by_the_submarine_cables,_the_principal_land_lines,_and_the_radio_stations_-_btv1b53158302t_(1_of_2).jpg",
      licence: "Public domain",
      aspect: "2 / 1",
    },
    {
      type: "p",
      text: "In 2019, the researchers at Ink & Switch named the alternative. Local-first software keeps the main copy of your data on your device. It syncs in the background. Syncing means quietly copying your changes to other devices and copying theirs back. The network becomes a bonus, not a requirement. Think of it like this. Local-first is notes in your own notebook, always in your pocket. Cloud-first is notes you can only read when the library is open. They listed seven goals. Among them: it is fast, it works offline, it is your data, and it lasts forever.",
    },
    {
      type: "quote",
      text: "In local-first applications, the availability of another computer should never prevent you from working.",
      author: "Kleppmann, Wiggins, van Hardenberg & McGranaghan",
      source: "Ink & Switch, Local-First Software, 2019",
    },
    {
      type: "sourcecard",
      title: "Local-First Software: You Own Your Data, in Spite of the Cloud",
      publisher: "Ink and Switch",
      description: "The original essay that names the seven goals of local-first and lays out why the network should be a bonus, not a requirement.",
      href: "https://www.inkandswitch.com/local-first/",
    },
    { type: "h2", text: "What actually changes in the interface" },
    {
      type: "p",
      text: "The loading spinner mostly disappears, and that one change spreads further than people expect. Once reads happen on your device, every action lands in under a tenth of a second. That is fast enough to feel instant, like flicking a light switch. Search updates as you type. Filters become play, not a careful request. Undo costs nothing. People start poking at their data instead of questioning it, and that change in behaviour is worth more than the milliseconds.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  subgraph Cloud["Cloud-first"]
    U1["Interaction"] --> N1["Network"] --> S1["Server"] --> N2["Network"] --> R1["Render<br/>~300-800 ms"]
  end
  subgraph Local["Local-first"]
    U2["Interaction"] --> L["Local store"] --> R2["Render<br/>~0-16 ms"]
    L -.->|"background sync"| SY["CRDT merge"]
    SY -.-> P[("Peers / server")]
  end`,
      caption:
        "Syncing moves off the path of your click entirely. The network stops being a step and runs in the background.",
    },
    {
      type: "scale",
      min: 0.0001,
      max: 1000,
      unit: "ms",
      points: [
        { at: 0.0001, label: "In-memory read", note: "~100 ns", tone: "good" },
        { at: 1, label: "On-disk local", note: "~1 ms SSD", tone: "good" },
        { at: 25, label: "Same-region server", note: "~25 ms there and back", tone: "warn" },
        { at: 150, label: "Cross-continent", note: "~150 ms there and back", tone: "bad" },
      ],
      caption:
        "Rough figures by scale, not measurements from one machine. Each step to the right is about ten times slower. Where your data lives decides which step you pay on every action.",
      source: "Typical figures; cf. latency numbers every programmer should know",
    },
    { type: "h2", text: "The hard part is merging, and it is a design problem" },
    {
      type: "p",
      text: "If two people edit the same thing while offline, something has to decide what the result means. Picture two people editing one shopping list. This is where CRDTs come in. A CRDT is a way to merge two people's edits automatically, with no server picking a winner. It is the technology behind Automerge and Yjs. It promises that every device ends up with the same result. It cannot promise that result is what a person actually wanted.",
    },
    {
      type: "p",
      text: "Text merges nicely. A shared counter merges fine. But say two people each grab the last free room. The merge is mathematically valid and completely wrong in real life. So the interface has to carry the idea of a merge that needs a human. And someone has to design what that looks like, without making people doubt their own data.",
    },
    {
      type: "ul",
      items: [
        "Show the merge, do not hide it. When a background sync changes something in front of the user, mark it. Quietly changing what someone is looking at is the fastest way to lose their trust.",
        "Keep the intent, not just the bytes. Store enough history to say Priya moved this to Tuesday while you were offline, instead of showing a bare change with no name on it.",
        "Design for later, not instant. A sync badge should say synced, not saved. In a system spread across devices, saved is a small lie, and people feel it when it breaks.",
      ],
    },
    {
      type: "diagram",
      chart: `flowchart LR
  A[Local edit] --> B[Append to op log]
  B --> C[Local state updates]
  B -.->|background| D[Send ops to peers]
  D --> E[Peer merges ops]
  E --> F{Semantic clash?}
  F -->|no| G[Same state everywhere]
  F -->|yes| H[Surface to the user]`,
      caption:
        "A CRDT sync loop. Your edits apply at once, then copy and merge in the background. Matching up is automatic. Only a real-world clash needs a person.",
    },
    { type: "h2", text: "Now put the model on the device too" },
    {
      type: "p",
      text: "The same logic applies to AI. Running a hosted model means a trip to a server and back, which costs several hundred milliseconds before the first word appears. Fine for a big question. Too slow for anything that should feel like typing. WebGPU arrived in Chrome in 2023 and is now widely available. It lets a browser tab run a small model on your own graphics chip, with no server in the loop.",
    },
    {
      type: "chart",
      unit: "ms",
      data: [
        { label: "Hosted model, first word", value: 700, display: "~700 ms" },
        { label: "Hosted, warmed up", value: 300, display: "~300 ms" },
        { label: "Small model on device", value: 40, display: "~40 ms", highlight: true },
        { label: "Local shortcut or index", value: 5, display: "~5 ms", highlight: true },
      ],
      caption:
        "Time to the first useful response. Where the model runs decides how fast the feature can ever feel.",
      source: "Order-of-magnitude figures; see W3C WebGPU and WebLLM benchmarks",
    },
    {
      type: "p",
      text: "This creates a choice that did not exist three years ago. Fast, constant help belongs on the device: autocomplete, ranking, sorting, search over your own notes. There it is free and private. Slow, high-value thinking belongs in the cloud, where the user has already agreed to wait.",
    },
    {
      type: "callout",
      title: "The new load state",
      text: "On-device models move the wait. Instead of waiting on every action, you wait once for a download of several hundred megabytes. Be honest about that warm-up. Let the product work in a basic mode right away, fetch in the background, and never block the first session on it.",
    },
    { type: "h2", text: "Why I think this becomes the default" },
    {
      type: "table",
      head: ["What you compare", "Cloud-first", "Local-first"],
      rows: [
        ["Speed", "A trip to the server every time", "Reads on device, instant"],
        ["Offline", "Spinner or dead", "Fully usable"],
        ["Ownership", "Server owns the truth", "Your device owns the truth"],
        ["Merging edits", "Last save on the server wins", "CRDT merge, always lines up"],
        ["Cost at scale", "Pay per call and per download", "Almost nothing per call"],
      ],
      caption:
        "The same five things a product team argues about, settled by where the truth lives before a single screen is drawn.",
      emphasiseColumn: 2,
    },
    {
      type: "p",
      text: "Privacy rules keep getting stricter. AI costs keep mattering as you grow. And people keep learning that software they do not control can vanish. Local-first answers all three at once. The data never leaves. The AI costs nothing per call. And the app keeps working even when the company behind it does not.",
    },
    {
      type: "p",
      text: "That last point is the one that moves me. Almost everything we build today dies the moment a server is switched off. Local-first is the first approach in twenty years that takes one idea seriously: a person's work should outlive the product that made it.",
    },
    {
      type: "takeaway",
      text: "Decide where the truth lives before you design a single screen. Put reads and small AI on the device to get instant, under a tenth of a second, for free. Then spend your real design effort on syncing, merging, and making a merge easy for a human to understand.",
    },
  ],
  references: [
    {
      label: "Local-First Software: You Own Your Data, in Spite of the Cloud",
      detail: "Kleppmann, Wiggins, van Hardenberg & McGranaghan, Ink & Switch, 2019",
      href: "https://www.inkandswitch.com/local-first/",
    },
    {
      label: "Automerge: CRDTs for Local-First Applications",
      detail: "Martin Kleppmann et al.",
      href: "https://automerge.org/",
    },
    {
      label: "WebGPU Specification",
      detail: "W3C GPU for the Web Working Group",
      href: "https://www.w3.org/TR/webgpu/",
    },
    {
      label: "WebLLM: High-Performance In-Browser LLM Inference",
      detail: "MLC AI",
      href: "https://webllm.mlc.ai/",
    },
    {
      label: "Designing Data-Intensive Applications",
      detail: "Martin Kleppmann, O'Reilly, 2017",
      href: "https://dataintensive.net/",
    },
    {
      label: "Prism: Latent-Space Interfaces",
      detail: "Linus Lee, on on-device inference and latent-space UI",
      href: "https://thesephist.com/posts/prism/",
    },
  ],
}
