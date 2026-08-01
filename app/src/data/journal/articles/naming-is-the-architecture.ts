import type { Article } from "../types"

export const informationArchitecture: Article = {
  id: "naming-is-the-architecture",
  title: "Naming Is the Architecture",
  subtitle: "The invisible design work that decides whether anyone finds anything",
  readTime: "10 min read",
  excerpt:
    "A label is a promise. Get the words wrong and no layout, no animation, no colour can save the product. This is the design work that ships before a single pixel.",
  tags: ["Information Architecture", "Research", "Naming"],
  content: [
    {
      type: "lede",
      text: "A label is a promise about what happens when you click it. Break that promise and the person is lost, no matter how good the layout looks. The structure of a product, what is grouped with what and what it is all called, is decided before any screen is designed. That is the most leveraged design work there is, and it is nearly invisible, which is exactly why it gets skipped.",
    },
    {
      type: "figure",
      src: "/assets/journal/herbarium.jpg",
      alt: "A tall wooden herbarium cabinet with rows of shallow drawers for storing pressed plant specimens.",
      caption: "A specimen in a cabinet like this is only findable if it was named and filed correctly; get the name wrong and the plant still exists but is effectively lost forever. The object survives, the retrieval does not. A bad label in a product does the same quiet damage, which is why naming is the thing people actually navigate by.",
      credit: "Auckland Museum, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Cabinet,_herbarium_(AM_91425-1).jpg",
      licence: "CC BY 4.0",
      licenceHref: "https://creativecommons.org/licenses/by/4.0",
      width: 1200,
      height: 813,
    },
    { type: "h2", text: "A bad label costs more than a bad layout" },
    {
      type: "p",
      text: "Move a button and a confused user still reaches the goal, a second later. Mislabel that button and they walk the wrong way with total confidence, and they do not come back to check. A wrong word does not slow people down, it sends them somewhere else. Think of a hospital with clear, beautiful signs that all say the wrong department. The building is not broken. The naming is, and the naming is what people navigate by.",
    },
    {
      type: "p",
      text: "This is why I treat words as the first design layer, not the last. In a lot of teams, copy is the thing that gets poured in at the end, after the boxes are drawn. That is backwards. The label is the interface. Everything else is styling on top of a decision the words already made.",
    },
    {
      type: "p",
      text: "A concrete case from a banking app I looked at. The main action was labelled Transfers. In testing, people who wanted to pay back a friend for dinner did not touch it, because to them a transfer was a formal bank-to-bank event, not settling up with a mate. Renaming it Send money lifted use of the feature with no other change. Same button, same place, same colour. One different word, a different mental model, a different result. The layout was never the variable.",
    },
    {
      type: "callout",
      title: "The gap you cannot see from the inside",
      text: "Your team named the product from the inside, using the words of the people who built it. Your users arrive from the outside, with the words of their own job. The distance between those two vocabularies is where findability quietly dies, and no amount of visual polish closes it.",
    },
    { type: "h2", text: "Test the structure before the pixels exist" },
    {
      type: "p",
      text: "You can test an information architecture before anyone opens a design tool, which is the cheapest research in the whole process. Two methods do most of the work. Card sorting hands people your content on cards and asks them to group it and name the groups, so you learn how they carve up the space. Tree testing does the reverse: you give them your proposed structure as plain text, no visuals, and ask them to find things, so you learn whether the labels actually lead where people expect. Both run on a spreadsheet's worth of effort and both save months.",
    },
    {
      type: "p",
      text: "There are two flavours of card sort. An open sort lets people name the groups themselves, which surfaces their own vocabulary. A closed sort gives them your category names and asks them to file cards underneath, which tests names you already have. You do not need a cast of thousands. Around fifteen participants stabilises the big patterns in a card sort. Tree testing wants more, closer to fifty, because you are measuring success rates per task and rates need volume to be trustworthy. Either way the cost is a few hours, not a few sprints.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  A["Content and tasks"] --> B["Card sort:<br/>how users group"]
  B --> C["Draft structure<br/>and labels"]
  C --> D["Tree test:<br/>can they find it?"]
  D --> E{"Findable?"}
  E -->|"no"| C
  E -->|"yes"| F["Now design screens"]`,
      caption:
        "The order that saves the most rework. Every loop here is cheap. The same loop after visual design is not.",
    },
    {
      type: "p",
      text: "There is a third, sharper test: the first click. You show one screen and one task and record where the person clicks first. It sounds trivial. It is one of the strongest predictors of task success we have. When the first click is down the right path, most people finish. When it is down the wrong path, most do not, and they rarely recover.",
    },
    {
      type: "stats",
      items: [
        {
          value: "87%",
          label: "eventually succeed when their first click is down the right path",
          source: "MeasuringU, Getting the First Click Right",
        },
        {
          value: "46%",
          label: "eventually succeed when their first click is down the wrong path",
          source: "MeasuringU, Getting the First Click Right",
        },
        {
          value: "1",
          label: "screen and one task is all a first-click test needs to run",
          source: "MeasuringU",
        },
      ],
      caption:
        "The first click nearly doubles the odds of success. Your top-level labels are not decoration, they are the fork in the road.",
    },
    {
      type: "p",
      text: "Card sorting, tree testing, and the first click are not rivals. They answer different questions at different moments, and a solid process uses all three in turn: sort to shape the structure, tree test to check the labels, first-click test to confirm the choice. Here is how they line up.",
    },
    {
      type: "table",
      head: ["Method", "What it tests", "When to run it", "What you get"],
      rows: [
        ["Card sorting", "How users would group and name things", "Before you have a structure", "Their mental model and vocabulary"],
        ["Tree testing", "Whether your labels lead where expected", "On a draft structure, text only", "Findability score per task"],
        ["First-click test", "Whether the first choice is right", "On any screen or wireframe", "Success odds before you build"],
      ],
      caption:
        "Three cheap tests, three different questions. None of them needs a finished design, which is the whole point.",
      emphasiseColumn: 1,
    },
    { type: "h2", text: "Your users already told you the words" },
    {
      type: "p",
      text: "The taxonomy you designed and the vocabulary your users speak are almost never the same, and you do not have to guess at the difference. Your search logs are the best free research you own. Every query is a person telling you, in their own words, what they wanted and what they called it. When people keep searching for a word that appears nowhere in your navigation, that is not a search problem. That is a naming problem the search box happened to record.",
    },
    {
      type: "p",
      text: "A concrete case. A shop labels a category Outerwear. The search log fills with coat, jacket, raincoat, anorak. Nobody types outerwear, because nobody says outerwear out loud. The fix is not a synonym ring bolted onto search. The fix is to call the category what people call it. Search logs are a nightly usability test that your users run for free, and most teams never read the results.",
    },
    {
      type: "p",
      text: "The internal words are the sneakiest, because they feel correct to everyone in the building. A team that ships a Platform will name a nav item Platform. A user hunting for one tool inside it has no idea that is where it lives. Every industry has words that mean something precise to insiders and nothing to newcomers, and a product that leads with those words quietly sorts its audience into people who already knew and people who leave. Say the label aloud to someone outside your team. If they ask what it means, it is the wrong label.",
    },
    {
      type: "compare",
      left: {
        title: "Named from the inside",
        items: [
          "Outerwear, Solutions, Resources",
          "Reflects your org chart",
          "Feels tidy in a workshop",
          "Users search for the real word instead",
          "Support tickets ask where things are",
        ],
      },
      right: {
        title: "Named from the user's mouth",
        items: [
          "Coats and Jackets, Pricing, Guides",
          "Reflects the user's task",
          "Feels obvious, almost boring",
          "The nav word matches the search word",
          "People find it and stop asking",
        ],
      },
      caption:
        "Boring labels win. If a category name would sound strange said aloud in a shop, it is the wrong name.",
    },
    {
      type: "p",
      text: "One more structural truth: some things belong in more than one place. A red silk dress is both Dresses and Sale and Red. Forcing every item into one true location, a strict single hierarchy, breaks the moment reality gets messy. Polyhierarchy, letting an item live under several parents at once, matches how people actually look. They do not memorise your tree. They approach from whichever branch their task started on, and the structure should meet them on any of them.",
    },
    {
      type: "p",
      text: "The everyday form of this is faceted navigation, the filters down the side of a shop. Colour, size, price, brand, on sale: each is a different way into the same set of products, and a shopper mixes them freely. Trying to force that into one nested tree, where a product has a single home, fights how people narrow a choice. Let items carry tags and let people combine them. The single true location is a filing-cabinet idea. Users are not filing, they are hunting, and hunters come at the same prey from many directions.",
    },
    { type: "h2", text: "The magic number that was never about menus" },
    {
      type: "p",
      text: "You have heard that a menu should hold seven items, give or take two, because of Miller's law. That is one of the most misquoted findings in our field. George Miller's 1956 paper measured two specific things: how many distinct points people can tell apart along a single scale, like pitches of a tone, and how many chunks they can hold in immediate memory for a few seconds. Neither of those is a navigation menu, which sits in front of your eyes the whole time and does not need to be memorised at all.",
    },
    {
      type: "quote",
      text: "My problem is that I have been persecuted by an integer.",
      author: "George A. Miller",
      source: "The Magical Number Seven, Plus or Minus Two, 1956",
    },
    {
      type: "p",
      text: "Miller opened his paper half joking that the number seven followed him around, and he would be dismayed to see it used to cap menus. A menu can hold four items or forty. What matters is that the items are scannable, well grouped, and clearly labelled, because reading a visible list is not the same task as holding sounds in your head. Later memory research pushed the real span of working memory down toward a handful of chunks anyway. The lesson is not a number. It is that you should never trim a menu to hit a figure that was measured on a completely different task.",
    },
    {
      type: "callout",
      title: "The Miller's law misfire, in one line",
      text: "Miller measured how many things you can hold in your head with nothing to look at. A menu is a thing you look at. Cutting a clear seven-item list down to five to obey a 1956 memory experiment makes the product worse, not more scientific.",
    },
    {
      type: "p",
      text: "So how deep should structure go? The honest answer is that depth and breadth trade off, and the evidence leans toward broad and shallow over narrow and deep. Every level down is another decision, another chance to guess wrong, another click before feedback. Nielsen Norman Group's testing lands here repeatedly: users do better with a few wide levels than with many narrow ones. Deep trees hide things. But a totally flat wall of fifty links is its own failure, because nothing is grouped and the eye has nowhere to rest. The craft is grouping, not counting.",
    },
    {
      type: "p",
      text: "There is a cost to every extra level, and it is not only the click. Each step down asks the person to hold a guess in mind and wait to see if it paid off. Get it wrong three levels deep and the walk back is long and demoralising, which is when people give up and use search instead. This is also why mega-menus earn their keep: they flatten two or three levels into one glance, so the choice happens once, in the open, rather than as a chain of blind bets. Show the branches instead of making people tunnel through them.",
    },
    { type: "h2", text: "A name in a codebase outlives everything" },
    {
      type: "p",
      text: "Naming is not only user-facing. Inside a design system or a codebase, a component name is an interface too, and a bad one propagates for years. Call a component Card when half of them are not cards and every new engineer inherits the confusion. Rename it later and you touch a thousand files, so nobody does, and the wrong word calcifies into the architecture. The cost of a bad name is not paid once. It is paid every time someone reads it, which in a shared system is thousands of times.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "The names on the left describe how the thing was built. The names on the right describe what it is for. Only one of these survives a new hire's first week.",
      text: `// Named after implementation. Ages badly.
<FlexWrapper2 />
<GenericModal variant="v3" />
<DataTableAdvanced mode="compact" />

// Named after intent. Reads like the domain.
<Toolbar />
<ConfirmDialog />
<InvoiceList density="compact" />`,
    },
    {
      type: "p",
      text: "The reason bad names persist is that renaming is expensive and invisible, so it never wins a priority meeting. A rename touches every file that imports the thing, risks breaking something, and produces no new feature to demo. So the wrong word survives, and every engineer who joins learns it, uses it, and passes it on. The cheapest moment to name something well is before anyone depends on it. After that the name is load-bearing, and load-bearing names are the ones nobody dares to touch.",
    },
    {
      type: "callout",
      title: "Prediction",
      text: "I could be wrong, but here is what the data points to. First-click success nearly doubles when the top-level label is right, and search logs already expose the words users use. So I expect the teams that win the next few years to treat naming as a measured discipline, testing labels against real query data, not as a copywriting afterthought. What would prove me wrong: products that route users well while ignoring their search vocabulary entirely. If mismatched labels stop hurting findability, I have the mechanism wrong. I do not think they will.",
    },
    {
      type: "takeaway",
      text: "Design the words before the screens. Card sort to learn how users group, tree test to check your labels lead where expected, and read your search logs, which are free usability tests you are already running. Name things the way users say them out loud, let items live in more than one place, and stop trimming menus to hit a number from a 1956 memory study. The architecture is the naming.",
    },
  ],
  references: [
    {
      label: "The Magical Number Seven, Plus or Minus Two",
      detail: "George Miller's 1956 paper, the primary source people misquote about menu length.",
      href: "https://psychclassics.yorku.ca/Miller/",
    },
    {
      label: "Miller's Law",
      detail: "Laws of UX on what Miller actually found and how it is misapplied to interface design.",
      href: "https://lawsofux.com/millers-law/",
    },
    {
      label: "Card Sorting: Uncover Users' Mental Models",
      detail: "Nielsen Norman Group on running open and closed card sorts to shape structure.",
      href: "https://www.nngroup.com/articles/card-sorting-definition/",
    },
    {
      label: "Tree Testing",
      detail: "Nielsen Norman Group on testing findability on a text-only structure before design.",
      href: "https://www.nngroup.com/articles/tree-testing/",
    },
    {
      label: "Getting the First Click Right",
      detail: "MeasuringU on why the first click predicts task success, with the 87 versus 46 percent finding.",
      href: "https://measuringu.com/first-click/",
    },
    {
      label: "Flat vs. Deep Website Hierarchies",
      detail: "Nielsen Norman Group on the breadth versus depth tradeoff in navigation.",
      href: "https://www.nngroup.com/articles/flat-vs-deep-hierarchy/",
    },
    {
      label: "IA vs. Navigation",
      detail: "Nielsen Norman Group on the difference between structure and the menus that expose it.",
      href: "https://www.nngroup.com/articles/ia-vs-navigation/",
    },
    {
      label: "Information Architecture",
      detail: "Interaction Design Foundation's overview of IA as a design discipline.",
      href: "https://www.interaction-design.org/literature/topics/information-architecture",
    },
    {
      label: "Optimal Workshop",
      detail: "The tooling most teams use to run card sorts, tree tests, and first-click studies.",
      href: "https://www.optimalworkshop.com/",
    },
  ],
}
