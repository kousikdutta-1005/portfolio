import type { Article } from "../types"

export const consent: Article = {
  id: "consent-is-a-design-problem",
  title: "Consent Is a Design Problem",
  subtitle: "Dark patterns, the taxonomy that named them, and the regulators now issuing fines",
  readTime: "9 min read",
  excerpt:
    "Dark patterns are no longer a matter of taste. There is a formal taxonomy, a body of research, and regulators handing out fines for specific interface choices. This is about where the line sits, and how to argue for the right side of it.",
  tags: ["Ethics", "Consent", "Design Systems"],
  content: [
    {
      type: "lede",
      text: "A dark pattern is an interface built to trick you into doing something you would not choose if you saw it clearly. The important shift is that this is no longer opinion. Since 2010 the field has a name, a taxonomy, a decade of research, and regulators who now fine specific interface choices. Consent stopped being a copywriting afterthought and became a design decision with legal weight.",
    },
    {
      type: "figure",
      src: "/assets/journal/lobster-trap.webp",
      alt: "Stacked lobster traps on a harbour, each with a wide funnel opening leading into a narrow inner chamber.",
      caption:
        "A lobster trap is not cruel, it is just shaped: wide and inviting on the way in, narrow and difficult on the way out. No single part of it is a lie. That gap between how easy it is to enter and how hard it is to leave is exactly the test this article uses for a dark pattern, and it is why the field settled on the name roach motel.",
      credit: "Dirk Ingo Franke, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Portland_harbour_lobster_trap_08.07.2012.jpg",
      licence: "CC BY 3.0",
      licenceHref: "https://creativecommons.org/licenses/by/3.0",
      width: 1200,
      height: 797,
    },
    {
      type: "p",
      text: "Harry Brignull coined the term dark patterns in 2010 and started cataloguing them at what was darkpatterns.org and is now deceptive.design. That catalogue matters because it moved the argument off the ground of I feel manipulated and onto named, documented patterns anyone can point at. When a thing has a name and a definition, a design review can rule on it. That is the whole game.",
    },
    {
      type: "sourcecard",
      title: "Deceptive Design (formerly darkpatterns.org)",
      publisher: "Harry Brignull",
      description: "The original catalogue of dark patterns, with the taxonomy and named examples that turned a gut feeling into a checkable list.",
      href: "https://www.deceptive.design/",
    },
    { type: "h2", text: "The patterns have names, and names are power" },
    {
      type: "p",
      text: "Once you learn the taxonomy you cannot stop seeing it. These are not vague complaints. Each has a mechanism, a shape, and a reason it works on a distracted human. Here are the ones that show up most in the products I review.",
    },
    {
      type: "table",
      head: ["Pattern", "What it does", "Everyday example"],
      rows: [
        ["Confirmshaming", "Guilts you out of the safe choice", "The opt out link reads: No thanks, I hate saving money"],
        ["Roach motel", "Easy to get into, hard to leave", "One click to subscribe, a phone call to cancel"],
        ["Privacy zuckering", "Nudges you to share more than you meant", "Public by default, buried private setting"],
        ["Disguised ads", "Hides an advert as content or a control", "A Download button that is really an ad"],
        ["Sneak into basket", "Adds items you did not choose", "An extra warranty pre added at checkout"],
      ],
      caption:
        "Five named patterns from the taxonomy. The common thread is a gap between what the interface makes easy and what the user would actually choose.",
      source: "Deceptive Design taxonomy (Brignull)",
    },
    {
      type: "p",
      text: "Notice what unites them. In every case the interface makes the choice that benefits the business easy and the choice that benefits the user hard. That gap is the signal. Hold on to it, because it is also the test that separates a real dark pattern from ordinary friction, which I will come back to.",
    },
    {
      type: "p",
      text: "The mechanism is always the same trick played on attention. A distracted person reads the bold button, not the grey link. They accept the default, because changing it takes thought they did not come here to spend. Confirmshaming adds a pinch of guilt so the moment of doubt costs something. Roach motel spends its effort entirely on the exit, because the business already has what it wanted at the entrance. None of this relies on the user being foolish. It relies on the user being busy, which is everyone.",
    },
    { type: "h2", text: "Regulators started naming and fining them" },
    {
      type: "p",
      text: "For years the only cost of a dark pattern was a bad reputation, and reputations recover. That has changed. Specific interface choices are now unlawful in specific places, not merely rude. Europe's GDPR requires that consent be a clear, affirmative act, which makes a pre ticked box legally void. The text is unusually direct about it.",
    },
    {
      type: "quote",
      text: "Silence, pre-ticked boxes or inactivity should not therefore constitute consent.",
      author: "European Union",
      source: "GDPR, Recital 32",
    },
    {
      type: "p",
      text: "That one line outlaws a design pattern by name. It is why the pre checked marketing box quietly disappeared from compliant European signup forms. The Digital Services Act went further and bans deceptive design on large platforms outright. The California privacy law treats consent obtained through dark patterns as no consent at all. And the US Federal Trade Commission has moved from words to money.",
    },
    {
      type: "p",
      text: "Read those together and a pattern appears. Four different bodies, on two continents, independently arrived at the same idea: that the interface is the contract. It is no longer enough for a privacy policy to say the right thing while the buttons do the opposite. The law now looks at the screen the user actually touched, counts the choices it offered, and asks whether a reasonable person was steered. For a designer that is a strange kind of promotion. The pixels you place are now the thing being judged.",
    },
    {
      type: "stats",
      items: [
        {
          value: "$520M",
          label: "FTC settlement with Epic Games, part of it for dark patterns that led users into unwanted charges",
          source: "US FTC, December 2022",
        },
        {
          value: "1,818",
          label: "Dark pattern instances found across 1,254 shopping websites in an automated crawl",
          source: "Mathur et al., Princeton, 2019",
        },
        {
          value: "~11,000",
          label: "Shopping sites the Princeton study crawled to measure how common the patterns are",
          source: "Mathur et al., Princeton, 2019",
        },
      ],
      caption:
        "The turn from opinion to enforcement, and the scale of the problem. Dark patterns are not rare edge cases. At the time of the study they were routine across mainstream retail.",
    },
    {
      type: "p",
      text: "The cookie banner is the clearest live example. European enforcement bodies have repeatedly ruled that if a banner has a one click Accept all but hides Reject behind extra steps, the consent is not freely given and is therefore invalid. The regulator is reading the interface the way a designer would, counting the clicks on each path, and finding the design guilty. That is new, and every product team should feel it.",
    },
    {
      type: "p",
      text: "It is worth being precise about why the banner fails, because the reasoning is a design critique. Consent under GDPR must be freely given, which the regulators read to mean the easy path cannot be rigged toward yes. When accepting is one prominent button and refusing is a trek through a preferences screen with dozens of toggles, the two options are not offered on equal terms, so the yes is not a free choice. The fix is boring and specific: an Accept and a Reject of equal weight, at the same level, one click each. The lawful design and the honest design turn out to be the same design.",
    },
    {
      type: "sourcecard",
      title: "Bringing Dark Patterns to Light",
      publisher: "US Federal Trade Commission",
      description: "The FTC staff report cataloguing deceptive design tactics the agency now treats as actionable, with real cases.",
      href: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
    },
    { type: "h2", text: "The asymmetry test" },
    {
      type: "p",
      text: "You do not need to memorise the whole taxonomy to catch most of this in a design review. You need one heuristic. Compare the two paths. If accepting takes one click and refusing takes four, that asymmetry is the pattern. A fair choice offers both options at roughly equal cost and equal prominence. When the effort is lopsided, the interface has already made the choice for the user and dressed it up as their decision.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  U["User faces a choice"] --> Y["Path to yes / accept"]
  U --> N["Path to no / decline"]
  Y --> C{"Equal cost and prominence?"}
  N --> C
  C -- "yes" --> F["Fair choice"]
  C -- "no, decline is harder" --> D["Dark pattern"]`,
      caption:
        "The asymmetry test as a decision. It does not ask whether there is friction. It asks whether the friction falls equally on both choices.",
    },
    {
      type: "p",
      text: "The test works because it is measurable and hard to argue with. Clicks, taps, prominence and word count are countable. A team can say the accept button is more colourful because it is the primary action, but they cannot easily explain why declining needs a settings page, a second screen, and a scroll. The moment you frame the review as a click count on each path, the conversation stops being about taste.",
    },
    { type: "h2", text: "Not every friction is a dark pattern" },
    {
      type: "p",
      text: "Now the part I want to argue against the crowd on. Calling every bit of friction a dark pattern weakens the term until it means nothing. A confirmation dialog before you delete an account is friction. So is a two step checkout, a password strength requirement, an are you sure on a destructive action. None of those are dark patterns. They are guardrails. If we label them the same as confirmshaming, we lose the word we need for the real thing.",
    },
    {
      type: "p",
      text: "This matters beyond pedantry. When a term covers everything, regulators and teams stop taking it seriously, and the genuinely harmful patterns hide in the noise. A designer who hears that all friction is evil learns to ignore the whole category, including the parts that are actually unlawful. Precision protects the term's force. So I am strict about it: friction is neutral, a tool, and the question is never whether friction exists but which way it points.",
    },
    {
      type: "compare",
      left: {
        title: "Protective friction",
        items: [
          "Slows a step that could harm the user",
          "Serves the user's own stated intent",
          "Falls on the risky choice, not the safe one",
          "You would keep it if the user could see why",
          "Example: confirm before deleting everything",
        ],
      },
      right: {
        title: "Deceptive friction",
        items: [
          "Slows the choice the business dislikes",
          "Serves the business against the user",
          "Falls on the safe or cheaper choice",
          "You would hide it if the user asked why",
          "Example: a maze to cancel a subscription",
        ],
      },
      caption:
        "Same mechanism, opposite intent. Friction is not the villain. Friction aimed at the user's own interest, to benefit the business, is.",
    },
    {
      type: "p",
      text: "So the comparison gives you the intuition, but a review needs a rule you can apply in seconds. Here it is, reduced to two questions you can ask about any screen.",
    },
    {
      type: "callout",
      title: "The test for the difference",
      text: "Ask two questions. Whose interest does this friction serve, the user's or the business's? And would you keep it if the user could see the reason plainly? Friction that protects the user and survives an honest explanation is a guardrail. Friction that fights the user's intent and only works because it is hidden is a dark pattern. Confirming a permanent delete passes. Burying the cancel button fails.",
    },
    { type: "h2", text: "When someone asks you to build one" },
    {
      type: "p",
      text: "Most dark patterns are not shipped by villains. They are shipped by a designer under pressure from a target, who is told to lift opt in rates this quarter. So the useful skill is not moral outrage. It is knowing how to write the counter proposal in the language that pressure understands, which is business terms and risk.",
    },
    {
      type: "p",
      text: "Start with the legal exposure, because it is now concrete. A pre ticked consent box is not a growth tactic, it is void consent under GDPR and a fine waiting to happen. Then make the trust argument in numbers the team already respects. Dark patterns usually win the short A B test and lose the long game, because the metric they lift, an opt in, a signup, an accidental purchase, is measured in days, while the trust they spend is measured in refunds, cancellations, chargebacks and support load that show up later. A short horizon experiment can call a trap a success simply because it stopped counting too early.",
    },
    {
      type: "p",
      text: "That timing gap is the crux, so name it out loud in the room. An experiment that runs for two weeks sees only the upside of a deceptive default, never the downstream cost, because the cancellation and the angry review land in month two. The design that manipulates is optimised for the window the test happens to watch. This is not a deep dive into experiment design, but it is the one place the two subjects touch: a measurement horizon too short to see the harm will reliably reward the harm. If your only evidence is a fortnight of clicks, you have not measured trust at all.",
    },
    {
      type: "callout",
      title: "The counter proposal, in one move",
      text: "Do not just refuse. Offer the honest version and instrument it properly. Propose the fair banner or the clear opt in, and ask to measure it against the deceptive one on a metric that reaches past the click: thirty day retention, refund rate, cancellations, support tickets. Either the honest design holds up, and you have won the argument with data, or it does not, and you have learned something real. Both beat shipping a fine.",
    },
    {
      type: "p",
      text: "Keep a house rule and reuse it every time. Present both choices at equal cost. Never pre tick consent. Make leaving as easy as joining. Say the price and the recurring charge before the card field, not after. None of this is radical. It is just the asymmetry test written down as a standard, so the next designer under pressure has something to point at that is not only their own conscience. Put it in the design system next to the button component, review every consent screen against it, and the fair version becomes the default nobody has to argue for twice.",
    },
    {
      type: "takeaway",
      text: "Dark patterns are a named taxonomy and a legal category now, not a matter of taste. Use the asymmetry test: if accepting is one click and refusing is four, that gap is the pattern. But hold the line the other way too, because not all friction is deceptive, and calling it all dark patterns blunts the term. The real test is whose interest the friction serves, and whether it survives being explained.",
    },
  ],
  references: [
    {
      label: "Deceptive Design (formerly darkpatterns.org)",
      detail: "Harry Brignull, the original catalogue and taxonomy of dark patterns",
      href: "https://www.deceptive.design/",
    },
    {
      label: "Dark Patterns at Scale",
      detail: "Mathur et al., Princeton 2019, an automated study of ~11,000 shopping sites",
      href: "https://arxiv.org/abs/1907.07032",
    },
    {
      label: "GDPR Recital 32: Conditions for consent",
      detail: "European Union, on affirmative consent and void pre-ticked boxes",
      href: "https://gdpr-info.eu/recitals/no-32/",
    },
    {
      label: "Bringing Dark Patterns to Light",
      detail: "US Federal Trade Commission staff report on deceptive design",
      href: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
    },
    {
      label: "FTC and Epic Games settlement",
      detail: "US FTC, 2022, a settlement of more than half a billion dollars",
      href: "https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations",
    },
    {
      label: "Digital Services Act",
      detail: "EU Regulation 2022/2065, which bans deceptive design on large platforms",
      href: "https://eur-lex.europa.eu/eli/reg/2022/2065/oj",
    },
    {
      label: "Deceptive Patterns in UX",
      detail: "Nielsen Norman Group, on recognising and avoiding manipulative design",
      href: "https://www.nngroup.com/articles/deceptive-patterns/",
    },
    {
      label: "Guidance on the use of cookies and similar technologies",
      detail: "UK ICO, on consent standards for cookie banners",
      href: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-cookies-and-similar-technologies/",
    },
  ],
}
