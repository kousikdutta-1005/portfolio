import type { Article } from "../types"

export const complexity: Article = {
  id: "conservation-of-complexity",
  title: "Somebody Has to Do the Hard Part",
  subtitle: "Tesler's Law and the real work of enterprise design",
  date: "Nov 2025",
  readTime: "5 min read",
  excerpt:
    "Every product has a hard part that will not go away. You cannot delete it. You can only choose who does the work: the person using it, the screen in front of them, or the engineers behind it. Most bad business software picks wrong.",
  tags: ["Enterprise", "Systems", "UX"],
  content: [
    {
      type: "lede",
      text: "Larry Tesler worked at Xerox PARC, Apple, and Amazon. He spent his career on one simple idea: every app has a hard part that will not go away. The only question is who does the work. Not whether. Who.",
    },
    {
      type: "figure",
      src: "/assets/journal/larry-tesler.jpg",
      alt: "A smiling man with glasses and grey hair, photographed close up against a plain background.",
      caption:
        "Larry Tesler, the man the law is named after. He worked at Xerox PARC and Apple, and he spent his career arguing that the software should carry the hard part, not the person using it.",
      credit: "Yahoo! Blog from Sunnyvale, California, USA, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Larry_Tesler_Smiles_at_Whisper_(cropped).jpeg",
      licence: "CC BY 2.0",
      licenceHref: "https://creativecommons.org/licenses/by/2.0",
      aspect: "3 / 2",
    },
    {
      type: "p",
      text: "He put a number on it. Say you cut one step from a job that a million people do. You just saved a million small moments of effort. It costs your team one engineer for one week. That trade is almost always worth it. It almost never gets made. The engineer's week shows up on a plan. The million tiny moments do not.",
    },
    {
      type: "quote",
      text: "Every application has an inherent amount of irreducible complexity. The only question is who will have to deal with it: the user, the application developer, or the platform developer.",
      author: "Larry Tesler",
      source: "Law of Conservation of Complexity",
    },
    {
      type: "sourcecard",
      title: "Tesler's Law: The Law of Conservation of Complexity",
      publisher: "Laws of UX",
      description: "A short, clear write-up of the law this whole piece is built on, in Tesler's own words.",
      href: "https://lawsofux.com/teslers-law/",
    },
    { type: "h2", text: "Where enterprise design goes wrong" },
    {
      type: "p",
      text: "Business software fails in the same way over and over. The work really is complicated: tax rules, medical steps, who is allowed to see what. Instead of taking that weight off you, the screen dumps all of it in your lap. Every box in the database becomes a box on the form. The screen turns into a photo of the database. That is the one thing it should never be.",
    },
    {
      type: "p",
      text: "Think of onions. Someone has to chop them. Either you chop them, or the shop sells them already chopped. The chopping never vanishes. It just moves to whoever is willing to pay for it. Software works the same way. The hard part is the onions. You are deciding who holds the knife.",
    },
    {
      type: "p",
      text: "The excuse is always the same: our users are experts, they want power. That is half true, and it is the wrong half. Experts want control over the choices that need their skill. They do not want to type in forty things the system already knows. It is like a company asking for your address on a form when they mailed you the letter. Being asked feels wrong, because it means the software does not understand the job.",
    },
    {
      type: "compare",
      left: {
        title: "A photo of the database",
        items: [
          "One form box for every database column",
          "Raw codes and ID numbers on show",
          "Errors only after you hit submit",
          "Boxes ordered by the table, not the task",
          "You are the glue holding it together",
        ],
      },
      right: {
        title: "A screen that did the work",
        items: [
          "A box appears only when a human must decide",
          "Codes turned into names, links followed for you",
          "Errors flagged as you type, before you commit",
          "Order follows the job, common path first",
          "The software is the glue",
        ],
      },
      caption:
        "Same power, two places to put the hard part. The right side is not weaker. It just costs more to build.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  C["The hard part of the work"] --> Q{"Who does the work?"}
  Q -->|"User"| U["40 boxes<br/>secret know-how<br/>needs training"]
  Q -->|"Interface"| I["Smart defaults<br/>shown in stages<br/>errors as you type"]
  Q -->|"Platform"| P["Guessed from context<br/>values worked out<br/>rules run for you"]
  U --> R1["Many errors<br/>few people use it"]
  I --> R2["Easy to learn<br/>grows with skill"]
  P --> R3["Feels invisible<br/>costs most to build"]`,
      caption:
        "The hard part does not shrink as you move down. It just moves. Each move costs build time and saves the user time.",
    },
    {
      type: "table",
      head: ["Who does the work", "What it costs to build", "What it buys the user"],
      rows: [
        ["User", "Almost nothing up front", "Slow work, mistakes, training, quiet churn"],
        ["Interface", "Design time: defaults, staged options, checks", "An easy path that grows with skill"],
        ["Platform", "The most engineering: guessing and working out", "Work that disappears, if you can still check it"],
      ],
      caption:
        "The same hard part, priced three ways. The cheapest one to build is the most expensive to use.",
      source: "After Larry Tesler, Law of Conservation of Complexity",
      emphasiseColumn: 2,
    },
    { type: "h2", text: "The three moves that actually work" },
    {
      type: "ol",
      items: [
        "Work it out before you ask. For every box on a form, ask how often the right answer is already knowable. From the person's role, the last record, the company's rules, today's date. If it is right more than seven times in ten, fill it in for them and let them edit it. Do not ask.",
        "Show things in stages, but be honest. Hiding advanced options only works if the simple path really finishes the job. If people must open the advanced part to succeed, you have not made it simpler. You added a step and hid the instructions.",
        "Sort by how often, not how important. The thing people do every hour and the thing they do once a year should not fight for the same space. Most dashboards are laid out like an org chart, not like the actual work. That is why the button everyone needs is buried in a menu.",
      ],
    },
    {
      type: "chart",
      unit: "",
      data: [
        { label: "Boxes shown by default", value: 6, display: "6 of 41", highlight: true },
        { label: "Filled in from context", value: 27, display: "27 of 41" },
        { label: "Advanced, opt-in", value: 8, display: "8 of 41" },
        { label: "Truly deleted", value: 0, display: "0, it just moved" },
      ],
      caption:
        "A setup flow I reworked: same power, one sixth of the boxes on show. Nothing was deleted. It was moved.",
      source: "Kousik Dutta, enterprise workflow redesign",
    },
    {
      type: "callout",
      title: "The question I ask in every review",
      text: "Who is paying for this? Not in money. In attention. If the answer is the user, and the fix was two weeks of engineering, you are making a bad trade for someone who is not in the room.",
    },
    { type: "h2", text: "Too simple is also a trap" },
    {
      type: "p",
      text: "The opposite mistake is real, and I have made it. You smooth an expert tool until it feels lovely, ship it, and find out the people who live in it eight hours a day now need three screens to do what one packed table did before. A busy screen is not clutter when the job is comparing things. A trading screen, an air traffic display, a code editor: overwhelming to a beginner, perfectly tuned for the person who actually uses it.",
    },
    {
      type: "p",
      text: "Edward Tufte made this point well. What matters is not how much is on the screen. It is how much of what is on the screen is real information. A packed screen of useful data beats a bare screen of pretty summaries. Expert users will always want the first one.",
    },
    { type: "h2", text: "Where AI fits in" },
    {
      type: "p",
      text: "Language models, the AI behind chatbots, are the best tool we have ever had for that bottom row: pushing the hard part down into the platform. A model can turn one sentence into forty correctly filled boxes. That is a real Tesler win. The skill needed drops, but the power stays.",
    },
    {
      type: "p",
      text: "But this only holds if you can check the result. If the model fills forty boxes and you cannot see, confirm, or fix what it picked, you have not taken the hard part away. You have hidden it. It will come back as a disaster at the worst moment. Work that is truly absorbed is invisible until you look for it. Work that is hidden is invisible until it breaks.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  T["The hard part: fixed"] --> U["User carries it"]
  U -->|"engineering"| I["Interface carries it"]
  I -->|"more work"| P["Platform carries it"]
  P -->|"you can check it"| G["Truly absorbed"]
  P -->|"hidden from user"| F["Comes back as a crisis"]`,
      caption:
        "The hard part moves right as you spend engineering. It never leaves the picture. The last fork is the whole game: absorbed means you can check it, hidden means it is just waiting.",
    },
    {
      type: "takeaway",
      text: "You cannot delete the hard part, only move it. Spend engineering to move it off the user. Spend design to keep the move visible when someone looks. And never mistake hiding it for solving it.",
    },
  ],
  references: [
    {
      label: "Tesler's Law: The Law of Conservation of Complexity",
      detail: "Laws of UX",
      href: "https://lawsofux.com/teslers-law/",
    },
    {
      label: "Living with Complexity",
      detail: "Don Norman, MIT Press, 2010",
      href: "https://jnd.org/books/",
    },
    {
      label: "The Visual Display of Quantitative Information",
      detail: "Edward Tufte, Graphics Press",
      href: "https://en.wikipedia.org/wiki/The_Visual_Display_of_Quantitative_Information",
    },
    {
      label: "Progressive Disclosure",
      detail: "Jakob Nielsen, Nielsen Norman Group",
      href: "https://www.nngroup.com/articles/progressive-disclosure/",
    },
    {
      label: "Hick's Law",
      detail: "Laws of UX",
      href: "https://lawsofux.com/hicks-law/",
    },
    {
      label: "State Machines and Statecharts",
      detail: "Stately / XState, on taming interface complexity",
      href: "https://stately.ai/docs/state-machines-and-statecharts",
    },
    {
      label: "AI SDK 3: Generative UI",
      detail: "Vercel, on models populating structured interfaces",
      href: "https://vercel.com/blog/ai-sdk-3-generative-ui",
    },
  ],
}
