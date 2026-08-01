import type { Article } from "../types"

export const accessibility: Article = {
  id: "solve-for-one",
  title: "Solve for One, Help Everyone",
  subtitle: "Accessibility as a design method, not a box to tick",
  readTime: "7 min read",
  excerpt:
    "The dropped kerb was built for wheelchairs. Now everyone uses it: the suitcase, the pram, the bad knee. Designing for one person at the edge is not charity. It is the most reliable way to make something better for everyone, and the data proves it.",
  tags: ["Accessibility", "Inclusive Design", "Method"],
  content: [
    {
      type: "lede",
      text: "The most useful thing I ever learned about accessibility is that it is really a research method wearing a rulebook. When you design for a person at the edge of your assumptions, you find out what your product secretly depends on. Those hidden needs are almost always what makes it annoying for everyone else too.",
    },
    {
      type: "figure",
      src: "/assets/journal/curb-cut.jpg",
      alt: "A long gentle pavement ramp leading down to a lowered kerb at a road, with a strip of bumpy tactile paving before the edge.",
      caption:
        "Built for wheelchairs, this ramp gets used every day by anyone with a suitcase, a pram or a delivery trolley. The bumpy strip is a second solve-for-one that helps people find the crossing. The whole article is in one photo.",
      credit: "Ezekielf, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Long_gradual_sidewalk_ramp_to_tactile_paving_and_curb_cut_in_Colchester_VT.jpg",
      licence: "CC0",
      licenceHref: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      width: 1200,
      height: 903,
    },
    {
      type: "p",
      text: "Microsoft's inclusive design work names the trick clearly. Take one ability, look at who gets shut out, and you find three groups: permanent, temporary, and situational. One arm. A broken wrist. A new parent holding a baby. The permanent group is small. The situational group is everybody, sooner or later.",
    },
    {
      type: "quote",
      text: "Designing for inclusion begins with recognizing exclusion.",
      author: "Kat Holmes",
      source: "Mismatch: How Inclusion Shapes Design, MIT Press",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  A["One ability:<br/>see the screen"] --> P["Permanent<br/>blind"]
  A --> T["Temporary<br/>eye surgery, migraine"]
  A --> S["Situational<br/>bright sun, driving, tiny phone"]
  P --> D["Design response:<br/>semantics, contrast, focus order"]
  T --> D
  S --> D
  D --> R["Benefits all three groups<br/>+ everyone under load"]`,
      caption:
        "The persona spectrum. Solving for the permanent case is the only reliable way to solve the situational one. And the situational group is far, far bigger.",
    },
    { type: "h2", text: "The curb cut effect is real and measurable" },
    {
      type: "p",
      text: "Start with the kerb. A dropped kerb, that little ramp cut into the pavement, was fought for by wheelchair users. Look who uses it now. The parent pushing a pram. The traveller dragging a suitcase. The delivery worker with a trolley. The kid on a bike. It was built for one group and it quietly serves everyone. That is the whole idea in one picture.",
    },
    {
      type: "p",
      text: "The other stories are just as real, even though people assume they are made up. Closed captions were required for deaf viewers. Now hearing people use them far more, watching in a noisy bar or a silent office. The typewriter came partly from a machine built so a blind countess could write clearly. OXO Good Grips started because a designer's wife had arthritis, and became a kitchen-tool empire.",
    },
    {
      type: "p",
      text: "The pattern is steady enough to have a name: the curb cut effect. It works for a simple reason. People at the edge cannot paper over a bad design with extra effort. They show you the flaw cleanly. Average users hide it by adapting, then quietly leave.",
    },
    {
      type: "table",
      head: ["Built for one group", "Designed for", "Mainstream benefit"],
      rows: [
        ["Curb cuts", "Wheelchair users", "Prams, trolleys, suitcases, delivery carts"],
        ["Closed captions", "Deaf and hard of hearing", "Anyone in a loud bar or a silent office"],
        ["Voice control", "Limited mobility and dexterity", "Driving, cooking with wet hands, dictation"],
        ["High contrast", "Low vision", "Every screen read in direct sunlight"],
      ],
      caption:
        "Each row started as a narrow fix for one group and became something everyone uses. The third column is where the payoff shows up.",
      emphasiseColumn: 2,
    },
    { type: "h2", text: "Why the effect happens" },
    {
      type: "p",
      text: "The curb cut effect is not luck and it is not generosity. It is a property of how constraints act on a design. When you design for someone with a hard limit, you are forced to strip out ambiguity, and stripped-out ambiguity is exactly what helps everyone else.",
    },
    {
      type: "p",
      text: "The reason sits in how different people meet a vague design. An average user hits an unlabelled icon, a low-contrast label, a button that could mean two things, and quietly copes. They squint, they guess, they hover to check, they shrug and move on. Because they cope, they never complain, so the flaw stays invisible to the team that shipped it. Nobody files a bug for a thing they managed to tolerate.",
    },
    {
      type: "p",
      text: "A person at the edge cannot cope, and that is the whole value of them. A screen reader reaches the unlabelled icon and can only announce button, so the task stops dead. The ambiguity the average user swallowed becomes a wall. The edge user is not a special case you are kindly accommodating. They are an instrument that makes hidden ambiguity loud enough to hear.",
    },
    {
      type: "p",
      text: "Fixing it for them means naming the control, raising the contrast, ordering the focus, saying plainly what a tap will do. Every one of those is just clarity, and clarity is what the coping majority quietly wanted the whole time but never put into words. The dropped kerb removes a decision, step up or not, for the wheelchair user. It removes the very same decision for the traveller with a suitcase, who could have managed the step and is still glad not to have to.",
    },
    {
      type: "table",
      head: ["A vague design detail", "Average user", "User at the edge"],
      rows: [
        ["Icon button with no name", "Guesses from the picture", "Screen reader says only button"],
        ["Grey label at low contrast", "Squints and reads it anyway", "Cannot read it at all"],
        ["Unclear focus order", "Reaches for the mouse", "Gets lost with no way back"],
      ],
      caption:
        "The same flaw, two outcomes. The average user absorbs it silently, so it stays hidden. The edge user hits a wall, so the flaw finally becomes visible and gets fixed for both.",
      emphasiseColumn: 2,
    },
    { type: "h2", text: "Where the actual failures are" },
    {
      type: "p",
      text: "WebAIM has checked the top million home pages every year for years, and the results barely move. Most pages have failures a machine can detect. And the same few problems cause nearly all of them.",
    },
    {
      type: "sourcecard",
      title: "The WebAIM Million",
      publisher: "WebAIM",
      description: "The yearly check of the top million home pages, where the failure numbers below come from.",
      href: "https://webaim.org/projects/million/",
    },
    {
      type: "stats",
      items: [
        { value: "95.9%", label: "of home pages had detectable WCAG failures", source: "WebAIM Million 2026" },
        { value: "56.1", label: "average detectable errors per home page", source: "WebAIM Million 2026" },
        { value: "96%", label: "of all errors fall into just six issue types", source: "WebAIM Million 2026" },
      ],
      caption:
        "Eight years of the same check, and the picture holds. The failures are common, easy to detect, and clustered in a few types.",
    },
    {
      type: "chart",
      unit: "%",
      data: [
        { label: "Low-contrast text", value: 83.9, display: "83.9%", highlight: true },
        { label: "Missing alt text", value: 53.1, display: "53.1%" },
        { label: "Missing form labels", value: 51, display: "51%" },
        { label: "Empty links", value: 46.3, display: "46.3%" },
        { label: "Empty buttons", value: 30.6, display: "30.6%" },
      ],
      caption:
        "Share of home pages with each failure. These are not exotic bugs: they are contrast, labels, and names. Every one is fixable in a design system, once.",
      source: "WebAIM Million 2026, top 1,000,000 home pages",
    },
    {
      type: "p",
      text: "Look at that list again. Not one is a hard engineering problem. They are all choices someone made in a design file: grey text on white because it looked elegant, an icon button with no name because the icon seemed obvious. So the fix belongs at the source, in the building blocks, not in a clean-up sprint later.",
    },
    {
      type: "callout",
      title: "The single biggest win",
      text: "Contrast. It is the most common failure by far. It is easy to check automatically. And it is caused almost entirely by designers reaching for light grey to show hierarchy. Use weight, size, and spacing for hierarchy instead. Save light grey for things that really are secondary. And still clear 4.5:1.",
    },
    { type: "h2", text: "What I build into the system" },
    {
      type: "compare",
      left: {
        title: "Rule-led",
        items: [
          "Starts from a checklist near the ship date",
          "Bolts accessibility tags on at the end",
          "Counts success as an audit score",
          "Treated as a cost to keep small",
          "Fixes rot back after each release",
        ],
      },
      right: {
        title: "Method-led",
        items: [
          "Starts from a person at the edge",
          "Builds names, focus, and contrast into the block",
          "Counts success as friction removed for all",
          "Treated as a research method",
          "Fixes hold, because the whole problem is gone",
        ],
      },
      caption:
        "Same standard, opposite direction. One chases a score at the end. The other removes the failure at the source.",
    },
    {
      type: "ol",
      items: [
        "Contrast checks in the build. Colour pairs are checked automatically against the WCAG 2.2 AA standard. A change that adds a failing combination cannot merge. That kills the whole problem for good, instead of fixing it again and again.",
        "Focus as a designed state. Not the browser default, not removed: a real, designed ring in the system, visible on every clickable thing, tested by tabbing through the page without touching the mouse.",
        "Names before labels. Every clickable element gets a proper name at the component level, so a nameless icon button is impossible to build rather than merely frowned upon.",
        "Reduced-motion versions. Every animated block ships with its calmer version in the same file. If the calmer version is missing, the component is not finished.",
        "Target size. WCAG 2.2 added a 24 by 24 pixel minimum. Bake it into the block's padding so nobody has to remember.",
      ],
    },
    {
      type: "diagram",
      chart: `flowchart LR
  E["Pick one excluded person"] --> W["Find what they cannot do"]
  W --> R["Fix what they depend on"]
  R --> O["Solve for that one case"]
  O --> M["Reaches many"]
  M -.-> B["Everyone under stress wins"]`,
      caption:
        "The method in one line: solve for one, help everyone. The narrow case is your research tool. The broad win comes free.",
    },
    { type: "h2", text: "The case that lands with executives" },
    {
      type: "p",
      text: "Ethics should be enough. Often it is not, so keep the rest of the case ready. Over a billion people worldwide are affected. Legal risk is climbing fast. The European Accessibility Act came into force in June 2025 and covers a wide range of consumer digital products sold in the EU. And accessible markup is the same markup machines read, which matters more than ever, because screen readers and AI agents see your page through the exact same layer.",
    },
    {
      type: "p",
      text: "That last point gets too little attention. An agent using your product for someone relies on accessible names, roles, and states. A product a screen reader cannot read is a product an agent cannot read. Accessibility has quietly become a requirement for working with machines at all.",
    },
    { type: "h2", text: "The business case is real, and it is a trap" },
    {
      type: "p",
      text: "There is an honest problem buried in everything I have said so far. The curb cut effect is the argument people reach for to sell accessibility to a business. Do it because everyone benefits, because it widens your market, because it lifts conversion. All of that is true. It is also fragile, because it quietly accepts a dangerous premise: that accessibility has to pay for itself to be worth doing.",
    },
    {
      type: "p",
      text: "The moment you win the room with a revenue chart, you have agreed to lose it the day the chart points the other way. If some fix helps a group too small to move the numbers, the same logic says skip it, and you have handed over the exact tool needed to justify exclusion. The curb cut effect is a happy fact. It is not a foundation.",
    },
    {
      type: "p",
      text: "The foundation is plainer than a spreadsheet. People have a right to use the things that run their lives: their bank, their government, their doctor, their kids' school. That does not stop being true when the addressable market is small. So I keep the numbers ready for the meeting, and I do not let them become the reason. The business case is a good thing to bring to a room. It is a bad thing to believe.",
    },
    {
      type: "callout",
      title: "How I hold both at once",
      text: "Lead with the right to access, because that is the part that does not move. Keep the market size, the legal risk, and the conversion lift in your back pocket for the people who need them. Just never let the case rest on the money, or you have quietly agreed that the wrong number could end the argument.",
    },
    {
      type: "takeaway",
      text: "Treat exclusion as a research signal, not a box to tick. Fix the five failures that cause nearly everything at the building-block level, check them automatically in the build, and you get a product that works better in sunlight, under stress, with one thumb, and for a machine reading it.",
    },
  ],
  references: [
    {
      label: "The Curb-Cut Effect",
      detail: "Angela Glover Blackwell, Stanford Social Innovation Review, 2017",
      href: "https://ssir.org/articles/entry/the_curb_cut_effect",
    },
    {
      label: "The Business Case for Digital Accessibility",
      detail: "W3C Web Accessibility Initiative",
      href: "https://www.w3.org/WAI/business-case/",
    },
    {
      label: "Mismatch: How Inclusion Shapes Design",
      detail: "Kat Holmes, MIT Press, 2018",
      href: "https://mismatch.design/",
    },
    {
      label: "Inclusive Design Toolkit",
      detail: "Microsoft Design",
      href: "https://inclusive.microsoft.design/",
    },
    {
      label: "The WebAIM Million",
      detail: "WebAIM, 2026 accessibility analysis of the top 1,000,000 home pages",
      href: "https://webaim.org/projects/million/",
    },
    {
      label: "Web Content Accessibility Guidelines (WCAG) 2.2",
      detail: "W3C",
      href: "https://www.w3.org/TR/WCAG22/",
    },
    {
      label: "European Accessibility Act",
      detail: "European Commission",
      href: "https://ec.europa.eu/social/main.jsp?catId=1202",
    },
  ],
}
