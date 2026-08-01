import type { Article } from "../types"

export const latency: Article = {
  id: "latency-is-a-feeling",
  title: "Latency Is a Feeling",
  subtitle: "What the science says about response time",
  date: "Apr 2026",
  readTime: "5 min read",
  excerpt:
    "The limits on how fast a screen must respond were found in 1968 and confirmed in 1982. They have not moved, because human senses have not moved. How fast your product feels comes down to three numbers.",
  tags: ["Performance", "Psychology", "Craft"],
  content: [
    {
      type: "lede",
      text: "Speed is not really a property of your software. It is a property of the person using it, and it was measured before most of us were born. Robert Miller published the limits in 1968. IBM put a price on them in 1982. Nothing since has changed the numbers, because the numbers describe a nervous system, not a network.",
    },
    {
      type: "figure",
      src: "/assets/journal/ibm-3278.jpg",
      alt: "An IBM 3278 terminal from the early 1980s, a boxy beige monitor showing green text on a black screen, with an attached keyboard.",
      caption: "The 400 millisecond Doherty Threshold was measured on machines like this one, in 1982. The hardware is museum furniture now and the number has not moved, because it was never about the hardware. It was about people.",
      credit: "Marcin Wichary from San Francisco, Calif., via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:IBM_3278_terminal.jpg",
      licence: "CC BY 2.0",
      licenceHref: "https://creativecommons.org/licenses/by/2.0",
      aspect: "3 / 2",
    },
    { type: "h2", text: "The three numbers" },
    {
      type: "ul",
      items: [
        "100 milliseconds. Below this, the screen feels like it reacted to you. Cause and effect fuse, like a light switch: you flick it, the light is on. The interface feels like part of your hand.",
        "1 second. You notice the delay, but your train of thought survives it. It is like a tap that takes a second to run warm. You do not strictly need feedback here, but you feel the gap.",
        "10 seconds. This is the limit of attention. Past it, the user's mind wanders off to something else. You have lost them, even if the task finishes later.",
      ],
    },
    {
      type: "p",
      text: "Then in 1982, Walter Doherty and Ahrvind Thadani at IBM found something sharper. They timed expert users against how fast the system replied. When the reply dropped below about 400 milliseconds, people did not just work a bit faster. They jumped to a new gear. They stopped waiting on the machine, and the machine started waiting on them. They called it the Doherty Threshold, and it is still the most valuable number in interface design.",
    },
    {
      type: "quote",
      text: "Productivity soars when a computer and its users interact at a pace that ensures neither has to wait on the other.",
      author: "Walter J. Doherty & Ahrvind J. Thadani",
      source: "IBM Systems Journal, 1982",
    },
    {
      type: "scale",
      min: 50,
      max: 10000,
      unit: "ms",
      points: [
        {
          at: 100,
          label: "Feels instant",
          note: "cause and effect fuse",
          tone: "good",
        },
        {
          at: 400,
          label: "Doherty flow",
          note: "the machine waits on you",
          tone: "good",
        },
        {
          at: 1000,
          label: "Thought holds",
          note: "delay noticed, focus survives",
          tone: "warn",
        },
        {
          at: 10000,
          label: "Attention gone",
          note: "the user context switches away",
          tone: "bad",
        },
      ],
      caption:
        "Response limits, unchanged since 1968. The axis is log scaled because the mind is too. The jump from 100 ms to 400 ms is felt far more sharply than the jump from 5 s to 10 s.",
      source: "Miller 1968; Doherty & Thadani 1982; Nielsen 1993",
    },
    { type: "h2", text: "Why INP replaced the metric you learned" },
    {
      type: "p",
      text: "Google retired First Input Delay in March 2024 and replaced it with Interaction to Next Paint, or INP. That is a fancy name for a simple idea: how long from your tap to the screen actually changing. The old metric only timed how long the browser took to start handling your tap. INP times the whole trip, tap to visible change, for every action in the session, and reports one of the worst.",
    },
    {
      type: "p",
      text: "So the industry standard moved from timing the machine getting ready to timing the user's whole experience of one action. Google's bar for good is 200 milliseconds. That is Doherty's number with a bit of browser tax added on.",
    },
    {
      type: "table",
      head: ["INP rating", "Threshold", "What the user feels"],
      rows: [
        ["Good", "at or under 200 ms", "Interactions keep pace with intent"],
        ["Needs improvement", "200 to 500 ms", "A noticeable hitch on some taps"],
        ["Poor", "over 500 ms", "The interface feels like it stalled"],
      ],
      caption:
        "Google reports the INP that your unluckier sessions hit, not your typical one. So the poor row is the tap your worst-served users feel.",
      source: "web.dev, Interaction to Next Paint",
      emphasiseColumn: 1,
    },
    {
      type: "sourcecard",
      title: "Interaction to Next Paint (INP)",
      publisher: "web.dev",
      description: "Google's own page for the metric, with the exact good, needs improvement, and poor thresholds shown as a chart.",
      href: "https://web.dev/articles/inp",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  I["You tap"] --> D["Wait for main thread"]
  D --> P["Your code runs"]
  P --> R["Style, layout, paint"]
  R --> V["Next frame shows"]
  V --> M["INP = full time<br/>aim under 200 ms"]`,
      caption:
        "INP times the whole path from your tap to a visible change. Most teams speed up only the middle bit.",
    },
    { type: "h2", text: "You cannot beat physics, so beat the feeling" },
    {
      type: "p",
      text: "A round trip to a server on another continent costs you 150 milliseconds before your code runs one line. If the tap has to be confirmed by that server first, you have already lost the Doherty Threshold. So you stop confirming, and start predicting.",
    },
    {
      type: "p",
      text: "Optimistic UI just means: show the result at once, then check with the server behind the scenes. You apply the change on screen the instant the user acts. You send the request in the background. You fix things up if the real answer disagrees. It feels free because, to the user, it was. Now all the design work moves to the two percent of cases where the server says no.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "In optimistic UI, the interesting design work is all in the undo when it fails.",
      text: `async function toggleFavourite(id: string) {
  const previous = store.get(id)
  store.set(id, { ...previous, favourite: !previous.favourite }) // 0 ms

  try {
    await api.favourite(id)
  } catch {
    store.set(id, previous)          // revert, but do not startle
    notify({
      tone: "quiet",                 // never a red modal
      text: "Couldn't save that. Retrying.",
      action: { label: "Undo", run: () => store.set(id, previous) },
    })
  }
}`,
    },
    {
      type: "callout",
      title: "The rule I hold teams to",
      text: "Every optimistic action needs a designed undo. If you did not design the failure state, the feature is not finished. It is just a bet that the network never drops.",
    },
    { type: "h2", text: "Where the money is" },
    {
      type: "stats",
      items: [
        {
          value: "1%",
          label: "of sales lost per 100 ms of added latency",
          source: "Amazon, 2006",
        },
        {
          value: "20%",
          label: "drop in traffic from a 500 ms slower results page",
          source: "Google, 2006",
        },
        {
          value: "8.4%",
          label: "lift in retail conversions from a 0.1 s speedup",
          source: "Deloitte with Google, 2020",
        },
      ],
      caption:
        "Three decades, three companies, one direction. Latency is one of the few design levers with a revenue line you can point to.",
    },
    {
      type: "sourcecard",
      title: "Milliseconds Make Millions",
      publisher: "Deloitte with Google",
      description: "The 2020 study behind the conversion numbers, showing what a 0.1 second speedup did to real retail sales.",
      href: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html",
    },
    {
      type: "p",
      text: "The money case has been public for twenty years. Amazon reported that every 100 milliseconds of extra delay cost about one percent of sales. Google found that adding half a second to a search page cut traffic by around twenty percent. These are old numbers from a slower web, and people keep finding the same thing since. Deloitte's 2020 study with Google found that a 0.1 second speedup lifted retail sales by over eight percent.",
    },
    {
      type: "p",
      text: "What I take from this is simple. Latency is one of the very few design choices with a revenue line you can point straight at. That makes it the easiest craft argument you will ever win in a room full of executives.",
    },
    { type: "h2", text: "The part that is actually about design" },
    {
      type: "p",
      text: "When you genuinely cannot go faster, you shape the wait. A spinner just says I have no idea how long this is. A skeleton that matches the layout to come is a promise. Show results as they arrive, first line first, and a ten second wait becomes a one second wait plus nine seconds of reading. The total time is the same. The feeling is not even close. It is like waiting at a counter: it is easier when you can see the person already fetching your order from the back room. Emil Kowalski and Rauno Freiberg both make this point about motion. The interactions that feel fastest are rarely the ones that finish first. They are the ones that respond first.",
    },
    {
      type: "takeaway",
      text: "Design to 100 milliseconds for feedback and 400 for flow. Treat anything past a second as a wait you must shape, not hide. Perceived speed is not a line in a performance budget. It is the most measurable piece of craft you own.",
    },
  ],
  references: [
    {
      label: "Response Times: The 3 Important Limits",
      detail: "Jakob Nielsen, based on Miller (1968) and Card et al. (1991)",
      href: "https://www.nngroup.com/articles/response-times-3-important-limits/",
    },
    {
      label: "The Economic Value of Rapid Response Time",
      detail: "Walter J. Doherty & Ahrvind J. Thadani, IBM, 1982",
      href: "https://jlelliotton.blogspot.com/p/the-economic-value-of-rapid-response.html",
    },
    {
      label: "Interaction to Next Paint (INP)",
      detail: "Google, web.dev",
      href: "https://web.dev/articles/inp",
    },
    {
      label: "Doherty Threshold",
      detail: "Laws of UX",
      href: "https://lawsofux.com/doherty-threshold/",
    },
    {
      label: "Milliseconds Make Millions",
      detail: "Deloitte with Google, 2020",
      href: "https://www.deloitte.com/ie/en/services/consulting/research/milliseconds-make-millions.html",
    },
    {
      label: "Great Animations",
      detail: "Emil Kowalski, on perceived responsiveness",
      href: "https://emilkowal.ski/ui/great-animations",
    },
    {
      label: "Invisible Details of Interaction Design",
      detail: "Rauno Freiberg",
      href: "https://rauno.me/craft/interaction-design",
    },
  ],
}
