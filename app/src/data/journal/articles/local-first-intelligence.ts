import type { Article } from "../types"

export const localFirst: Article = {
  id: "local-first-intelligence",
  title: "The Fastest Network Request Is the One You Never Make",
  subtitle: "Keeping data and smarts on your own device, and why it changes the design",
  readTime: "9 min read",
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
      width: 1020,
      height: 1200,
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
    { type: "h2", text: "Be honest: local-first is often the wrong choice" },
    {
      type: "p",
      text: "The case above is real, but it is only half the ledger. A capable on-device model is big, and it has to live in the device's memory to be fast. Take Phi-3-mini, a small model built to run on a phone. It has 3.8 billion parameters. Squeezed down to four bits it still takes about 1.8 gigabytes, and Microsoft showed it running on an iPhone 14, fully offline, at over twelve words a second. That is a genuine achievement. It is also 1.8 gigabytes sitting in memory, a large slice of a phone that is also running everything else. Switch apps and the system can evict it, so you pay the load again. Anything much bigger than a few billion parameters does not fit at all.",
    },
    {
      type: "sourcecard",
      title: "Phi-3 Technical Report: A Capable Model Locally on Your Phone",
      publisher: "Abdin et al., Microsoft, 2024",
      description: "The report behind Phi-3-mini, including its size, its 4-bit footprint, and a demo running offline on an iPhone.",
      href: "https://arxiv.org/abs/2404.14219",
    },
    {
      type: "p",
      text: "Cold start is the next bill. Before the first word, the device has to download that model, hundreds of megabytes to a couple of gigabytes, and compile it for the local chip. A server never charged the user for this. The first session on a new device does.",
    },
    {
      type: "p",
      text: "Then there is power. A cached read off local disk costs almost nothing. Sustained generation runs the GPU or neural chip hot, drains the battery, and warms the device in your hand. I will not pretend to a single universal number, because it depends on the chip and the model. But a laptop on battery throttles, and a phone gets warm, and users notice both.",
    },
    {
      type: "p",
      text: "Updating is the tradeoff people forget. A hosted model you improve once, for everyone, overnight. An on-device model is thousands of copies scattered across the world. Shipping a better version means every device re-downloads gigabytes, on its own schedule, and you keep supporting the old versions until they catch up. A flaw in the model stops being a deploy and becomes a fleet update.",
    },
    {
      type: "p",
      text: "So the round trip to a server is genuinely right more often than local-first fans admit. Send it away when the model has to be frontier quality, when it needs fresh or shared data the device cannot hold, when the task is rare enough that a short wait is fine, or when the device is too weak or too full to carry the model at all. Crossing the ocean is the correct call whenever what waits on the far side cannot fit on this side.",
    },
    {
      type: "compare",
      left: {
        title: "Keep it on the device",
        items: [
          "Fast, repeated actions on personal data",
          "Works offline and stays private",
          "A small model that fits in memory",
          "The same task, many times a minute",
        ],
      },
      right: {
        title: "Send it to a server",
        items: [
          "Frontier quality the device cannot match",
          "Fresh or shared data the device lacks",
          "A rare task where a short wait is fine",
          "A weak or full device that cannot hold the model",
        ],
      },
      caption:
        "Local-first is a wrong default for anything needing a frontier model, shared truth, or a tiny install. It earns its keep for fast, private, repeated work over your own data.",
    },
    {
      type: "p",
      text: "One more tradeoff cuts against the privacy story. Putting the model on the device also hands the model to whoever owns the device. The weights ship with the app, and a determined person can pull them out. If the model is the product, on-device means giving away the thing you sell. A hosted model stays behind an interface you control. Local-first protects the user's data and exposes the maker's model. Which one matters more depends on whose secret you are keeping.",
    },
    {
      type: "p",
      text: "It is also worth puncturing the idea that local-first means no server. Most real local-first apps still run one, to relay changes between devices, to hold a backup, to serve people who share a document but are never online at the same time. Ink and Switch call it a sync server, and the honesty is in the name. It syncs, it does not own. But it is still infrastructure you build, pay for, and keep alive. Local-first moves the server off the path of your click. It does not always delete it. Anyone selling local-first as free of servers is selling the poster, not the product.",
    },
    {
      type: "p",
      text: "And building that sync is not a weekend. Merging edits correctly, handling a device that was offline for a month, migrating the data format after you have shipped, these are the hard, unglamorous parts, and they land on you instead of on a database vendor. The instant, offline, private product the user feels is bought with real engineering the user never sees. That is a fair trade for the right app. It is a waste for one that a plain server would have served just fine.",
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
      type: "p",
      text: "The merge problem does not shrink as you grow. It grows. Two people editing rarely clash. A team of fifty editing one shared space, half of them offline on a train, produces clashes daily, and every clash is a small design problem you now own. The cost of a merge that needs a human is paid by your users, in confusion, unless you have designed the moment it happens. Local-first hands you a better default and a harder edge case in the same box.",
    },
    { type: "h2", text: "What to do on Monday" },
    {
      type: "p",
      text: "Do not port your whole app to a local database this week. Take the single interaction people repeat most, a search, a filter, a re-sort, and move just its data onto the device so that one action lands instantly. Leave everything else on the server for now. Then measure whether people use that feature more once it stops asking the network for permission. If they do, you have earned the case to go further. If they do not, you just saved yourself a migration you did not need. Let where the truth lives be a decision you earn per feature, not a religion you adopt all at once.",
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
      label: "Phi-3 Technical Report: A Highly Capable Model Locally on Your Phone",
      detail: "Abdin et al., Microsoft, 2024",
      href: "https://arxiv.org/abs/2404.14219",
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
