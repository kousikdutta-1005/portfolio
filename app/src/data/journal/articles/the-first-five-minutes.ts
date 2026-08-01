import type { Article } from "../types"

export const onboarding: Article = {
  id: "the-first-five-minutes",
  title: "The First Five Minutes",
  subtitle: "Onboarding is the shortest path to the moment your product is obviously worth it",
  readTime: "10 min read",
  excerpt:
    "Onboarding is not a product tour. It is the shortest honest route to the moment a new user feels the product was worth signing up for. Everything else is decoration on top of that one job.",
  tags: ["Onboarding", "Activation", "Product"],
  content: [
    {
      type: "lede",
      text: "Onboarding has one job: get a new person to the moment the product is obviously worth it, as fast as honestly possible. That moment is not the signup form, the welcome modal, or the fifth slide of a tour. It is the first time the thing does something for them that they could not do a minute ago. Measure the time to that moment. Then spend all your effort making it shorter.",
    },
    {
      type: "figure",
      src: "/assets/journal/training-wheels.jpg",
      alt: "A helmeted boy riding a bicycle fitted with a pair of training wheels.",
      caption:
        "Training wheels do not teach balance, they postpone it. They get a child moving on day one, and they have to come off before the real skill can arrive. Good onboarding works the same way: it knows it is temporary and plans its own removal, where a product tour that never ends is training wheels bolted on for good.",
      credit: "Dawn Endico, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Helmeted_boy_on_training_wheels.jpg",
      licence: "CC BY-SA 2.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/2.0",
      width: 1200,
      height: 1200,
    },
    {
      type: "p",
      text: "I have shipped onboarding for AI tools, analytics products and medical software. The pattern holds across all of them. Teams pour weeks into a guided tour with coach marks, those little pulsing dots that point at buttons, and almost none into the one screen a new user actually stares at first. That screen is usually empty, and usually an afterthought. It should be the opposite.",
    },
    { type: "h2", text: "Time to first value is the only number that matters" },
    {
      type: "p",
      text: "Every product has a moment where the effort a user has spent finally pays off. In a note app it is the first note you find again later. In an analytics tool it is the first chart that tells you something you did not know. Reforge and Amplitude both call the metric that tracks this activation, and they are right to put it near the centre of the funnel. The clock starts at signup and stops at that first real payoff. I call the gap time to first value.",
    },
    {
      type: "scale",
      min: 5,
      max: 604800,
      unit: "s",
      points: [
        { at: 5, label: "5 seconds", note: "A search box returns a useful result", tone: "good" },
        { at: 60, label: "1 minute", note: "A template becomes your first real document", tone: "good" },
        { at: 300, label: "5 minutes", note: "Connect a data source, see the first chart", tone: "warn" },
        { at: 3600, label: "1 hour", note: "Credentials, permissions, a real dataset", tone: "warn" },
        { at: 604800, label: "1 week", note: "Value needs a team or a migration", tone: "bad" },
      ],
      caption:
        "Time to first value spans orders of magnitude by product type. The job of onboarding is to drag your product one rung to the left, not to add a tour on the right.",
      source: "Kousik Dutta, working notes",
    },
    {
      type: "p",
      text: "The scale matters because the fix changes with the rung. If your first value is five seconds away, do not put a modal in front of it. If it is an hour away because a data connection has to happen first, no amount of cheerful copy will help. You have to redesign the path, not narrate it.",
    },
    {
      type: "p",
      text: "The famous examples of this thinking are all about finding the one action that predicts a keeper. Teams have long looked for the single early behaviour that separates users who stay from users who leave, then reorganised the whole first session around reaching it sooner. The number itself is less important than the discipline: pick one measurable moment, prove it correlates with retention, and treat everything before it as overhead to be cut. That is a very different brief from make the tour nicer.",
    },
    { type: "h2", text: "A tour is an apology for the interface" },
    {
      type: "p",
      text: "Here is the argument I will defend. A coach mark tour is usually an admission that the interface failed to explain itself. If a button needs a pulsing dot and a caption to be understood, the button is the problem. The tour is theatre that hides it. Most tours are skipped in the first two seconds, and the ones that are not are forgotten by the time the user needs the information, because it arrived before the task that would have made it stick.",
    },
    {
      type: "p",
      text: "The evidence for tours is thin. Nielsen Norman Group's own review of instructional onboarding overlays is blunt: users routinely dismiss them, ignore them, or cannot recall them, and tutorials that block the interface tend to teach very little. The honest read is that a tour mostly makes the team feel like they addressed onboarding, while the user learns by doing anyway.",
    },
    {
      type: "p",
      text: "There is a memory reason underneath the data. A tour front loads information at the exact moment the user has no hook to hang it on. They have not tried the task yet, so the tip has no context, and context is what makes a fact stick. By the time they hit the situation the tip described, minutes later, it is gone. Contextual help works because it arrives inside the task: a hint next to the field you are filling, a tip that appears the first time you reach a feature. Same information, delivered when the brain is ready to file it.",
    },
    {
      type: "sourcecard",
      title: "Application Onboarding: Design to Onboard Users Effectively",
      publisher: "Nielsen Norman Group",
      description: "Field research on why instructional overlays and tours underperform, and when contextual, in-task guidance does better.",
      href: "https://www.nngroup.com/articles/onboarding-tutorials/",
    },
    {
      type: "p",
      text: "So if not a tour, then what? The answer is to design the interface so it explains itself in the doing, and to reveal capability only as the user earns the context to want it. That is the difference the next comparison draws out.",
    },
    {
      type: "compare",
      left: {
        title: "Coach mark tour",
        items: [
          "Fires before the user has any context",
          "Blocks the interface it is describing",
          "Front loads everything, teaches nothing",
          "Skipped, then the burden returns later",
          "Success measured by tour completion",
        ],
      },
      right: {
        title: "Earned disclosure",
        items: [
          "Reveals a capability when it becomes useful",
          "Points at the task, not at the chrome",
          "Teaches one thing at the moment it is needed",
          "Nothing to skip, because nothing blocks",
          "Success measured by the user acting",
        ],
      },
      caption:
        "Progressive disclosure done right is not a tour hidden behind a skip button. It is capability that appears as the user earns the context to use it.",
    },
    {
      type: "p",
      text: "Progressive disclosure means showing the few things a person needs now and holding back the rest until they ask for it. NN/g has argued for it since the desktop era, and it still holds. The trap is doing it as a staged tour. Real progressive disclosure has no narrator. The advanced panel simply is not there until you have done the basic thing that makes it make sense.",
    },
    {
      type: "callout",
      title: "The narrow case where a tour earns its place",
      text: "Be fair to the other side. A short, in-context tour can work when an interface deliberately breaks convention, a spreadsheet grid used as a database, a canvas that is also a terminal. There the surprise is the point, and one pointer at the one surprising affordance saves real confusion. The test is strict: one step, tied to a genuinely novel interaction, shown the first time the user reaches it. Not seven slides on load.",
    },
    { type: "h2", text: "The empty state is your best teacher" },
    {
      type: "p",
      text: "The most under designed screen in most products is the empty state: the inbox with no mail, the dashboard with no data, the project with no tasks. It is treated as a blank to fill, so it ships as a grey box that says No items. Yet it is the first thing a new user sees, before any content exists. That makes it the highest leverage teaching surface you have.",
    },
    {
      type: "p",
      text: "A good empty state does three jobs at once. It says what goes here, it shows one obvious action to create the first thing, and it hints at what the screen will feel like once it is full. Think of a kitchen on move in day. Empty counters are not a failure, they are an invitation, and a good one tells you where the knives go. NN/g calls empty states a teaching moment for exactly this reason.",
    },
    {
      type: "code",
      language: "tsx",
      caption:
        "An empty state is a component with a job, not a fallback. It names the thing, offers one primary action, and previews the filled shape.",
      text: `function EmptyBoard({ onCreate }: { onCreate: () => void }) {
  return (
    <section aria-label="No projects yet">
      <h2>Your projects live here</h2>
      <p>Start one and it turns into a board you can share.</p>
      <button onClick={onCreate}>Create your first project</button>
      <PreviewSkeleton />  {/* a ghost of the filled state */}
    </section>
  )
}`,
    },
    {
      type: "p",
      text: "Notice there is no tour in that component and no modal. The screen teaches by being what it is. Nielsen Norman Group makes the same case at length, that a well written empty state does more onboarding work than an overlay ever could.",
    },
    {
      type: "sourcecard",
      title: "Better Empty States: Turning a Blank Slate Into an Opportunity",
      publisher: "Nielsen Norman Group",
      description: "Why empty states are a teaching surface, and the pattern of naming, prompting an action, and previewing the filled view.",
      href: "https://www.nngroup.com/articles/empty-state-interface-design/",
    },
    {
      type: "p",
      text: "Seeded and sample data is the same idea taken one step further. Instead of a blank board, drop in one example project the user can poke, rename, or delete. It removes the fear of the blank page and doubles as a live tutorial, because the sample shows the shape of a real one. The rule is that seeded data must be obviously fake and trivially removable, or it becomes clutter the user resents.",
    },
    {
      type: "p",
      text: "There is a craft to it. The sample should be close enough to real work that the user can imagine their own version, but clearly not theirs, so deleting it feels safe rather than destructive. Label it as a sample, give it one Delete sample control, and make sure the empty state returns cleanly once it is gone. Done well, a new user learns the core loop by editing something that already works, which is far gentler than being handed a blank canvas and a paragraph of instructions.",
    },
    { type: "h2", text: "Activation is not signup, and chasing signups can hurt you" },
    {
      type: "p",
      text: "Signup conversion and activation are different metrics, and optimising the first alone can actively damage the business. Lower the signup bar with a slick form and a free trial and you will admit more people. If more of them never reach first value, you have simply bought a larger crowd of users who churn, plus the support and infrastructure cost of serving them. The dashboard looks healthier while the business gets sicker.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  V["Visitor"] --> S["Signup"]
  S --> A{"Reached first value?"}
  A -- "yes" --> R["Activated, likely to retain"]
  A -- "no" --> C["Dormant, will churn"]
  C -. "vanity win" .-> S
  R --> H["Habit, expansion"]`,
      caption:
        "Optimising the signup step alone widens the top of the funnel and the dormant branch with it. Activation is the gate that predicts retention, so that is the step to move.",
    },
    {
      type: "p",
      text: "The same idea reads even more plainly as a table. Three metrics, each one honest about what the last one hid.",
    },
    {
      type: "table",
      head: ["Metric", "What it counts", "Failure it hides"],
      rows: [
        ["Signup conversion", "Accounts created", "Users who never activate"],
        ["Activation rate", "Users who reached first value", "Whether value repeats"],
        ["Retention", "Users who came back", "Nothing, this is the truth"],
      ],
      emphasiseColumn: 2,
      caption:
        "Three metrics, read left to right as a chain. Each hides the failure that the next one exposes. Optimise the wrong one and you win the number while losing the user.",
    },
    {
      type: "p",
      text: "This is why I treat a personalisation questionnaire at signup with suspicion. Every question you ask before first value is a tax on reaching it. A questionnaire earns its cost only when the answer changes the very next screen in a way the user can feel, picking a starting template, seeding the right sample data, skipping a step that does not apply. If the answers just feed a marketing segment, cut the questions and let people in.",
    },
    { type: "h2", text: "The developer tool problem" },
    {
      type: "p",
      text: "My actual working context is the hard case. In enterprise and developer tools the first five minutes often involve credentials, permissions and a data connection before any value is even possible. You cannot show a chart before the database is connected. You cannot connect the database before the API key exists. You cannot mint the key before the account has the right role. The path to value runs through a maze of prerequisites, and each one is a place to lose the user.",
    },
    {
      type: "p",
      text: "The best developer onboarding treats that maze as the design problem, not a preamble to it. Stripe lets you make a real call against test mode with a pre filled key, so you feel the product work before you have wired up anything of your own. Vercel deploys a template to a live URL in one flow, so first value is a working site, not a settings page. The move is the same in both: manufacture a safe, real success before asking for the real setup.",
    },
    {
      type: "p",
      text: "The trick that unlocks this is separating a demonstration of value from a commitment of data. A user should be able to feel the product work against fake or borrowed data in minute one, and only wire up their own credentials once they already believe it is worth the effort. Reverse that order, front load the permissions and the data connection before any payoff, and you lose people in the exact stretch where they have spent effort and received nothing back. Every prerequisite you can defer past the first value is a prerequisite that stops being a place to churn.",
    },
    {
      type: "sourcecard",
      title: "Test mode and test API keys",
      publisher: "Stripe",
      description: "A concrete example of removing the credential barrier: a working call against test mode before any real key or data exists.",
      href: "https://docs.stripe.com/testing",
    },
    {
      type: "p",
      text: "Public services carry more of this complexity than almost any product, and one design principle from that world sums up the whole enterprise onboarding brief.",
    },
    {
      type: "quote",
      text: "Making something look simple is easy. Making something simple to use is much harder, especially when the underlying systems are complex, but that is what we should be doing.",
      author: "GOV.UK",
      source: "Government Design Principles, principle 4",
    },
    {
      type: "p",
      text: "The GOV.UK service manual is the discipline this needs. It is written for services where the underlying system is genuinely complex, a tax return, a licence, a benefit claim, and it still insists on doing the hard work to make the first steps simple. That is exactly the enterprise onboarding brief. The complexity is real, so hide none of it from yourself and all of it from the user until they have to meet it.",
    },
    { type: "h2", text: "What to do on Monday" },
    {
      type: "p",
      text: "Start by writing down your product's first value in one sentence, then time how long it takes a brand new account to reach it. Watch three real people do it without help. The number and the winces will tell you more than any tour analytics. Then attack the longest step, the empty state and the setup maze first, because that is where the time is hiding.",
    },
    {
      type: "p",
      text: "Then do the unglamorous audit. List every screen a new account meets before first value and, next to each, write what it costs the user and what it gives back. Delete any step that costs without giving, defer any prerequisite that can wait until after the payoff, and rewrite every empty state as a teaching surface with one clear action. Kill the tour unless it passes the strict one step test. None of this needs new features. It is mostly removal, and removal is the cheapest onboarding work you will ever ship.",
    },
    {
      type: "takeaway",
      text: "Onboarding is not a tour, it is the shortest honest path to first value. Measure the time to that moment. Design the empty state as your primary teaching surface. Seed real, removable sample data. Optimise activation, not signups. And in developer tools, manufacture a safe real success before you ask for credentials.",
    },
  ],
  references: [
    {
      label: "Application Onboarding: Design to Onboard Users Effectively",
      detail: "Nielsen Norman Group, on why instructional overlays underperform",
      href: "https://www.nngroup.com/articles/onboarding-tutorials/",
    },
    {
      label: "Progressive Disclosure",
      detail: "Nielsen Norman Group, showing capability only as it becomes needed",
      href: "https://www.nngroup.com/articles/progressive-disclosure/",
    },
    {
      label: "Better Empty States",
      detail: "Nielsen Norman Group, empty states as a teaching surface",
      href: "https://www.nngroup.com/articles/empty-state-interface-design/",
    },
    {
      label: "User Activation",
      detail: "Amplitude, defining activation and the first-value moment",
      href: "https://amplitude.com/blog/activation-metrics",
    },
    {
      label: "Activation",
      detail: "Reforge, on activation as the metric that predicts retention",
      href: "https://www.reforge.com/blog/activation",
    },
    {
      label: "Test mode and test API keys",
      detail: "Stripe, removing the credential barrier in developer onboarding",
      href: "https://docs.stripe.com/testing",
    },
    {
      label: "Government Design Principles",
      detail: "GOV.UK, doing the hard work to make complex services simple",
      href: "https://www.gov.uk/guidance/government-design-principles",
    },
    {
      label: "Growth.Design case studies",
      detail: "First-run flows from real products pulled apart screen by screen",
      href: "https://growth.design/case-studies",
    },
  ],
}
