import type { Article } from "../types"

export const complexity: Article = {
  id: "conservation-of-complexity",
  title: "Somebody Has to Do the Hard Part",
  subtitle: "Tesler's Law and the real work of enterprise design",
  readTime: "9 min read",
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
      width: 939,
      height: 1200,
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
    {
      type: "p",
      text: "Tesler worked this out while at Xerox PARC in the mid-1980s, and it has a second name that explains it better: the waterbed theory. Press a waterbed down in one spot and it bulges up somewhere else. You never removed the water. You moved it. Complexity behaves the same way. His own framing was blunt. There are far more users than developers, so a week of the team's pain is worth a huge amount of saved user pain. And he chose one word on purpose. Irreducible. He meant the complexity you cannot delete, only relocate.",
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
    { type: "h2", text: "Where the complexity actually goes" },
    {
      type: "p",
      text: "Moving complexity is not the same as deleting it, and every place it can land sends a bill to someone real. There are three landing spots. It helps to name the person who pays before you decide to move it.",
    },
    {
      type: "p",
      text: "Push it down to the platform and it lands on an engineer. Someone has to write the code that guesses and fills and checks, and then keep it alive for years. That is a maintenance cost, and it shows up later as pages at three in the morning, as changes that get slower because the smart code is fragile, and as a system only one person on the team understands. Absorbed complexity is not free. It is a debt the team pays in small instalments, forever.",
    },
    {
      type: "p",
      text: "Push it onto the user badly and it lands on a support team. Every confusing form becomes a ticket, a training session, a phone call, and a quiet fraction of people who give up and leave. In enterprise software the support cost of one bad screen usually dwarfs the engineering hour that would have fixed it. The user's pain does not vanish when you ignore it. It reappears further down the corridor as a cost centre nobody connects back to the design.",
    },
    {
      type: "p",
      text: "Push it into automation and it can land on infrastructure. Working things out for the user often means more computing, more storage, and more services to run and watch. A model that fills the form for you has a bill measured in compute and a fresh set of failure modes to monitor. The complexity turned into an operations cost. Someone still pays. It just wears a different uniform.",
    },
    {
      type: "table",
      head: ["Where it lands", "Who pays", "How the bill arrives"],
      rows: [
        ["The platform code", "An engineer, for years", "Night pages, slower changes, one-person systems"],
        ["The user", "A support team", "Tickets, training, calls, quiet churn"],
        ["The automation", "Infrastructure", "Compute, storage, new failure modes to watch"],
      ],
      caption:
        "Complexity you relocate always lands on someone. Naming the payer before you move it is the difference between a real fix and a hidden bill charged to a team that never sat in the room.",
      emphasiseColumn: 1,
    },
    {
      type: "p",
      text: "So the platform should absorb it is not a free win. It is a choice about who pays: the engineer in maintenance, the support team in tickets, or the infrastructure in running cost. The skill is picking the cheapest payer for the value at stake, with eyes open, not pretending the cost went away because you can no longer see it.",
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
    { type: "h2", text: "Sometimes the right move is to delete it" },
    {
      type: "p",
      text: "There is an honest objection to all of this. Tesler's law can become an excuse. Someone has to deal with it is true, but it can quietly justify never simplifying at all. If you decide up front that the complexity is fixed, you stop asking the better question. Does this part need to exist.",
    },
    {
      type: "p",
      text: "Fred Brooks drew the line that matters. In his 1986 essay No Silver Bullet he split complexity into two kinds. Essential complexity is baked into the problem itself. Filing a tax return really is complicated, and no clever interface can delete the tax code. Accidental complexity is the mess we piled on top: the extra step, the field nobody reads, the feature one customer asked for in 2019 and no one has touched since. Tesler's law only covers the first kind. Remember, he chose the word irreducible.",
    },
    {
      type: "sourcecard",
      title: "No Silver Bullet: Essence and Accident in Software Engineering",
      publisher: "Fred Brooks, via Wikipedia",
      description: "The 1986 essay that split complexity into essential and accidental, the distinction that tells you when to move a problem and when to delete it.",
      href: "https://en.wikipedia.org/wiki/No_Silver_Bullet",
    },
    {
      type: "p",
      text: "So before you move complexity, prove it is essential. Half the time the honest fix is not to relocate the hard part. It is to cut it. Delete the feature. Drop the option nobody picks. Kill the field the system does not truly need. Moving accidental complexity down to the platform just buries junk in a more expensive place, and now an engineer maintains that junk forever. The waterbed only conserves water you actually meant to keep.",
    },
    {
      type: "p",
      text: "My rule now runs in that order. First ask if the complexity is essential. If it is not, delete it and stop there. Only what survives that cut has earned the harder argument about who should carry it. Skip the first step and you spend real engineering moving weight that should never have been on the scale.",
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
      type: "callout",
      title: "Prediction: enterprise software will compete on absorbed complexity, not features",
      text: "My bet rests on models making it cheap to push work down onto the platform, so the winners over the next decade will be the tools that move the hard part off the user and can still prove it stayed correct. What would prove me wrong: if the running cost and the failure modes of that absorption stay high enough that buyers keep preferring software that shows every box and lets a trained expert drive. I lean the first way, but I have been surprised by this market before.",
    },
    {
      type: "takeaway",
      text: "You cannot delete essential complexity, only move it, and every move bills an engineer, a support team, or your infrastructure. Cut the accidental parts first. Spend engineering to move what is left off the user. And never mistake hiding it for solving it.",
    },
  ],
  references: [
    {
      label: "Tesler's Law: The Law of Conservation of Complexity",
      detail: "Laws of UX",
      href: "https://lawsofux.com/teslers-law/",
    },
    {
      label: "Law of Conservation of Complexity",
      detail: "Waterbed theory and Tesler's framing, via Wikipedia",
      href: "https://en.wikipedia.org/wiki/Law_of_conservation_of_complexity",
    },
    {
      label: "No Silver Bullet: Essence and Accident in Software Engineering",
      detail: "Fred Brooks, 1986, via Wikipedia",
      href: "https://en.wikipedia.org/wiki/No_Silver_Bullet",
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
