import type { Article } from "../types"

export const designSystemAdoption: Article = {
  id: "why-design-systems-die",
  title: "Design Systems Do Not Die of Bad Design",
  subtitle: "They die because nobody adopts them, and adoption is a political problem",
  readTime: "10 min read",
  excerpt:
    "A design system is an internal product whose users can always choose not to use it. That makes it a distribution problem, not a craft problem. The graveyard is full of beautiful systems that nobody imported.",
  tags: ["Design Systems", "Adoption", "Strategy"],
  content: [
    {
      type: "lede",
      text: "I have watched more than one design system die, and not one of them died because the design was bad. They died because nobody used them. A design system is an internal product with users who can always say no, and mostly they do, quietly, by copying a component into their own folder and moving on. The craft is the easy part. The hard part is distribution, politics, and trust, and almost nobody staffs for those.",
    },
    {
      type: "figure",
      src: "/assets/journal/desire-path.webp",
      alt: "A dirt track worn across a grass lawn, cutting past the paved route nearby.",
      caption:
        "Someone designed and paved a path here, and people walked across the grass anyway. That worn line is not vandalism, it is data about where the route actually needed to go. When a team forks your component instead of importing it, the fork is a desire path, and the right response is to study where people are walking rather than fence them in.",
      credit: "Dietmar Rabich, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:D%C3%BClmen,_Trampelpfad_--_2017_--_9412.jpg",
      licence: "CC BY-SA 4.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/4.0",
      width: 1200,
      height: 800,
    },
    {
      type: "p",
      text: "This is the reframe that changed how I work. A design system is not a deliverable you finish. It is a product you ship to a captive but unwilling audience of other engineers and designers, none of whom report to you, all of whom have a deadline, and any of whom can route around you the moment you slow them down. Treat it as a design project and it will be beautiful and ignored. Treat it as a product with a distribution problem and it has a chance.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  B["You build<br/>a component"] --> D["Distribute<br/>docs, release, evangelism"]
  D --> C{"Team's choice"}
  C -->|"adopt"| A["Imported<br/>from the library"]
  C -->|"reject"| F["Forked or<br/>rebuilt locally"]
  F -.->|"drift"| I["Inconsistent<br/>product"]
  A -.->|"trust"| A`,
      caption:
        "The only step most teams invest in is the first one. Everything to the right of it, distribution and the moment of choice, is where adoption is actually won or lost.",
    },
    { type: "h2", text: "An internal product whose users can say no" },
    {
      type: "p",
      text: "Think about a real product with paying customers. If the checkout is confusing, they leave, and you feel it in revenue. An internal design system has the same dynamic with none of the pressure. If your component is awkward, the team does not file a complaint. They just do not import it. You never see the churn, because there is no dashboard for the button someone rebuilt in an afternoon rather than fight your API. The failure is silent, which is exactly why it is so common.",
    },
    {
      type: "p",
      text: "So the job is not to make the system correct. It is to make the system the path of least resistance. Every friction you leave in, a confusing prop, a missing variant, a slow release, a docs page that does not answer the question, is a small tax. And unlike a real customer, an internal engineer can always avoid the tax by doing it themselves. The competitor to your design system is not another design system. It is a copy and paste that ships today.",
    },
    { type: "h2", text: "Measuring adoption honestly" },
    {
      type: "p",
      text: "Most teams measure the wrong thing. They count components in the library, or downloads of the package, or stars on the internal repo. None of that tells you whether the product is actually built from the system. The honest question is narrower and more uncomfortable. Of the buttons rendered in production, what fraction come from the library, and what fraction are local one-offs? Adoption is a ratio, not a headcount, and the denominator is every place a system component could have been used and was not.",
    },
    {
      type: "p",
      text: "You can measure this, and the measurement is not exotic. Static analysis can walk the codebase and count imports from the library against locally defined components with the same job. A linter can flag raw hex colours and spacing values that bypass the tokens. This is the real signal, and it is cheap. If two hundred files import your Button and eighty define their own, you do not have an adoption problem you can argue away. You have a number, and the number is sixty percent.",
    },
    {
      type: "code",
      language: "bash",
      caption:
        "The crudest possible adoption probe, and still more honest than a component count. One-off hex colours that bypass the tokens are a direct measure of where the system is being ignored.",
      text: `# Local Button definitions competing with the library
grep -rEl "function Button|const Button" src \\
  | grep -v "@company/design-system" | wc -l

# Raw hex colours that skipped the tokens entirely
grep -rEo "#[0-9a-fA-F]{3,6}" src \\
  | grep -v "tokens/" | sort -u | wc -l`,
    },
    {
      type: "p",
      text: "Do this once and it stings. Do it every week, put the ratio on a chart, and it becomes the most useful number the team has. It turns adoption from a feeling into a trend you can move. The Sparkbox design systems survey has found for years that a large share of teams do not measure adoption at all, and I believe that is the single most common reason systems quietly stall. You cannot fix a distribution problem you refuse to look at.",
    },
    {
      type: "sourcecard",
      title: "Design Systems Survey",
      publisher: "Sparkbox",
      description: "Multiple years of practitioner responses on how teams build, maintain, measure, and struggle to sustain design systems.",
      href: "https://designsystemssurvey.sparkbox.com/2022/",
    },
    { type: "h2", text: "The contribution model decides your ceiling" },
    {
      type: "p",
      text: "Once people want to use the system, they will want to change it, and how you handle that request decides whether the system scales. There are two pure models and both fail. A fully centralised team owns everything, which means every change queues behind one group, and that group becomes a bottleneck the whole company waits on. A fully federated free-for-all lets anyone change anything, which produces chaos and a system with four kinds of dropdown. Neither survives contact with a growing organisation.",
    },
    {
      type: "table",
      head: ["Model", "How change happens", "Fails when"],
      rows: [
        [
          "Centralised",
          "One core team builds and approves everything",
          "The queue grows and teams route around it to ship",
        ],
        [
          "Federated",
          "Any team changes anything directly",
          "Standards erode and four versions of every part appear",
        ],
        [
          "Hybrid, curated",
          "Teams propose and build; a small core reviews and merges",
          "Only if the core stops reviewing fast enough to matter",
        ],
      ],
      caption:
        "The model that actually works is the hybrid the big public systems use: open contribution with a small curating team that guards consistency. It is more work to run and it is the only one that lasts.",
      emphasiseColumn: 0,
    },
    {
      type: "p",
      text: "The model that works is the hybrid, and it is the one the mature public systems document. GOV.UK runs an open, curated contribution process where teams propose components and a central group tests and accepts them. IBM Carbon and the big commercial systems run variants of the same idea: contribution is welcome, but a small team curates to keep the language coherent. The lesson is that governance is not bureaucracy you add later. It is the product's editorial standard, and without it federation becomes noise.",
    },
    {
      type: "callout",
      title: "Build the on-ramp before you ask for contributions",
      text: "Teams do not withhold contributions because they are selfish. They withhold them because contributing is undocumented, slow, and risky. If you want a federated flow of pull requests, the contribution guide, the review promise, and the local dev setup are the actual product. GOV.UK, Carbon and Storybook all publish theirs in detail for exactly this reason.",
    },
    { type: "h2", text: "The docs site is the product, not a wiki" },
    {
      type: "p",
      text: "Here is a failure I have made myself. You spend a year on the components and a week on the documentation, then wonder why adoption is flat. But the docs site is the only surface most engineers ever touch. They do not read your source. They land on a page, search for the thing they need, copy the example, and leave. If that page is thin, out of date, or missing the state they actually have, they conclude the system does not cover their case and they build their own. The docs are not an afterthought. They are the entire storefront.",
    },
    {
      type: "compare",
      left: {
        title: "Docs as an afterthought",
        items: [
          "A component list with prop tables and nothing else",
          "No guidance on when to use which variant",
          "Examples that do not cover error or empty states",
          "Updated whenever someone remembers",
          "Search returns nothing useful, so people ask in Slack",
        ],
      },
      right: {
        title: "Docs as the product surface",
        items: [
          "Every component paired with when and when not to use it",
          "Copyable examples for the real states, not just the happy one",
          "Accessibility and content guidance in the same place",
          "Versioned and released with the code",
          "Search answers the question in one hit",
        ],
      },
      caption:
        "Polaris, Carbon and Atlassian invest as heavily in guidance as in components. That is not polish. It is the difference between a system people can adopt alone and one that needs a meeting.",
    },
    {
      type: "p",
      text: "This is why tools like Storybook matter more than they first appear. A living catalogue that renders every component in every state, straight from the code, means the documentation cannot drift from reality, because it is generated from reality. The moment your examples are hand maintained screenshots, they start lying, and a docs site that lies is worse than none, because it burns the trust you need for the next release.",
    },
    { type: "h2", text: "The economics, told without the marketing" },
    {
      type: "p",
      text: "At some point you have to justify the system in the language of the people who fund it, and this is where I want to be blunt. Most of the return-on-investment figures you see quoted for design systems are vendor marketing. A tool company has every incentive to publish a large, round number for time saved, and almost none of those figures come with a method you can inspect. I do not repeat them, and I would treat any leader who does with a little suspicion. A number you cannot reproduce is not evidence. It is an advertisement.",
    },
    {
      type: "callout",
      title: "The ROI numbers are mostly ads, so argue a different way",
      text: "Do not walk into a finance conversation with a borrowed statistic about hundreds of hours saved. You cannot defend it and they know it. Instead measure your own duplication: count the number of distinct button implementations, modal implementations, and one-off colours in your codebase today. That is real waste, specific to your company, and every one you delete is a maintenance cost you stop paying. A defensible small number beats an impressive number you cannot source.",
    },
    {
      type: "p",
      text: "The honest case for a design system is not a headline saving. It is consolidation of duplicated effort, plus consistency that lowers the cost of every future change. You can count the duplication directly, as we did with the grep above, and you can point at the accessibility and quality work that gets done once in the system instead of badly in forty places. That argument is smaller than the vendor slide, and it has the advantage of being true, which is what you need when the budget conversation gets hard.",
    },
    { type: "h2", text: "Breaking changes are trust events" },
    {
      type: "p",
      text: "Every version bump is a moment where a team decides whether to keep trusting you. Ship a breaking change with no warning and no migration path, and a team that spends a day fixing red builds will remember. The next time an upgrade lands, they will pin the old version, and a pinned version is the first step toward a permanent fork. Versioning is not a technical detail. It is the mechanism by which you either keep or spend the trust that adoption runs on.",
    },
    {
      type: "p",
      text: "So treat breaking changes the way a real platform does. Deprecate before you remove, keep the old path working for a release, and ship a codemod, a script that rewrites callers automatically, so that upgrading is a command rather than a project. And when a product team legitimately needs to break the system, because their case is real and you have not covered it yet, do not fight them. Give them a sanctioned way out: a documented override, a clearly marked local variant, and a ticket to fold the need back into the system later. A blocked team forks in the dark. A sanctioned one stays in the light where you can learn from them.",
    },
    {
      type: "p",
      text: "The last risk is the one nobody plans for. A system launches with a funded team, a launch, and momentum. Then the launch team is reassigned, the roadmap moves on, and the system enters the maintenance cliff: bugs pile up, the docs go stale, a framework upgrade never happens, and within a year the thing that everyone praised is the thing everyone works around. Systems do not usually die at launch. They die eighteen months later, of neglect, because the organisation funded a project when it needed to fund a product.",
    },
    {
      type: "p",
      text: "The defence against the cliff is boring and it works. Name a permanent owner, not a rotating volunteer, and put the maintenance on a roadmap that survives the reorg. Budget for the unglamorous work up front: the framework upgrade, the accessibility audit, the quarterly docs pass. When I argue for a system now, I argue for the second year harder than the first, because the first year is easy to fund on excitement and the second year is when the system either becomes infrastructure or becomes a cautionary tale. The launch is not the finish line. It is the moment the real product begins.",
    },
    {
      type: "callout",
      title: "Prediction: the systems that survive will be the ones with an adoption metric on a dashboard",
      text: "I could be wrong, but here is what the pattern points to. My anchor is that the Sparkbox survey keeps finding many teams never measure adoption, and those are the systems I see quietly stall. So I expect the systems that outlast their founding team to be the ones that made a single adoption ratio, library components over local forks, a visible, tracked metric that leadership watches like any other product number. What would prove me wrong is a wave of systems thriving for years on craft and evangelism alone, with no adoption measurement at all. If unmeasured systems turn out to persist just as well, this call is wrong.",
    },
    {
      type: "takeaway",
      text: "Stop treating a design system as a design problem. It is an internal product with a distribution problem, and it lives or dies on adoption. Measure that adoption as an honest ratio. Run a hybrid contribution model with a real on-ramp. Treat the docs site as the storefront, argue the economics from your own duplication rather than borrowed statistics, handle every breaking change as a trust event, and fund the years after launch, not just the launch.",
    },
  ],
  references: [
    {
      label: "Design Systems Survey",
      detail: "Sparkbox's multi-year practitioner survey on building, measuring and sustaining systems",
      href: "https://designsystemssurvey.sparkbox.com/2022/",
    },
    {
      label: "Design Systems 101",
      detail: "Nielsen Norman Group on what a design system is and what it takes to sustain one",
      href: "https://www.nngroup.com/articles/design-systems-101/",
    },
    {
      label: "GOV.UK Design System: Community",
      detail: "A public, curated contribution model for a large multi-team design system",
      href: "https://design-system.service.gov.uk/community/",
    },
    {
      label: "IBM Carbon: What is Carbon",
      detail: "A mature open-source system with a documented governance and contribution structure",
      href: "https://carbondesignsystem.com/all-about-carbon/what-is-carbon/",
    },
    {
      label: "Shopify Polaris",
      detail: "Guidance treated as a first-class product surface alongside the components",
      href: "https://polaris.shopify.com/",
    },
    {
      label: "Storybook",
      detail: "A living component catalogue generated from code, so docs cannot drift from reality",
      href: "https://storybook.js.org/docs",
    },
    {
      label: "Design Tokens Community Group",
      detail: "W3C group standardising the token format that underpins cross-platform systems",
      href: "https://www.w3.org/community/design-tokens/",
    },
  ],
}
