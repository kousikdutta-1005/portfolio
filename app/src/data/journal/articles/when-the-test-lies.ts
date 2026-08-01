import type { Article } from "../types"

export const experimentation: Article = {
  id: "when-the-test-lies",
  title: "The A/B Test Is Not the Truth Machine You Think",
  subtitle: "The most trusted tool in product work, and the ways it quietly fools the people who trust it most",
  readTime: "9 min read",
  excerpt:
    "A/B testing is the closest thing product teams have to a truth machine, which is exactly why it is so easy to misuse. This is about what a p value really means, why most tests cannot see the effect they are chasing, and why a statistically significant result can be commercially worthless.",
  tags: ["Experimentation", "Statistics", "Product"],
  content: [
    {
      type: "lede",
      text: "An A/B test feels like proof. You shipped B, the numbers went up, the test said significant, so B is better. That chain has a broken link in almost every step, and the tool is trusted enough that nobody checks. A/B testing is the most rigorous method most product teams own. It is also the one they misread most often, because the maths is counterintuitive and the dashboard hides that from you on purpose.",
    },
    {
      type: "figure",
      src: "/assets/journal/galton-box.webp",
      alt: "A Galton box, where balls dropped through rows of pegs collect in columns below to form a bell-shaped pile.",
      caption:
        "Drop a single ball through the pegs and you cannot say where it will land. Drop enough of them and the pile is a bell curve every time, which is the premise an A/B test quietly rests on. It is also the warning: the shape only appears once enough balls have fallen, so a test stopped early is just noise wearing the costume of a result.",
      credit: "Klaus-Dieter Keller, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Galton_box_2.jpg",
      licence: "Public domain",
      width: 1200,
      height: 899,
    },
    {
      type: "p",
      text: "Start with the number everyone reads wrong. A p value does not tell you the chance that your idea works. It answers a narrower, stranger question. If there were truly no difference between A and B, how often would random noise alone produce a gap at least this big? That is all. A p value of 0.05 means such a gap would show up one time in twenty by pure chance. It is a statement about a world where you are wrong, not a measure of how likely you are to be right.",
    },
    {
      type: "quote",
      text: "P-values do not measure the probability that the studied hypothesis is true, or the probability that the data were produced by random chance alone.",
      author: "American Statistical Association",
      source: "Statement on Statistical Significance and P-Values, 2016",
    },
    {
      type: "p",
      text: "The professional body of statisticians felt the need to put that in writing in 2016, which tells you how common the misreading is. Think of a smoke alarm. It is tuned to go off rarely when there is no fire. Hearing it does not tell you how big the fire is, or even that there is one. It tells you the reading crossed a line you set. A p value is a smoke alarm for noise. It was never a measure of importance, and treating it as one is where most of the trouble begins.",
    },
    { type: "h2", text: "Most tests cannot see what you are hoping for" },
    {
      type: "p",
      text: "Before you run a test, it has a property called power. Power is the chance the test will notice a real effect if one is truly there. A test with 50 percent power is a coin flip. Even when your change genuinely helps, half the time the test shrugs and reports nothing. Underpowered tests are not the exception in product work. They are the norm, and the reason is simple arithmetic that teams skip.",
    },
    {
      type: "p",
      text: "Small effects need enormous samples. Detecting a change from a 5 percent conversion rate to 5.25 percent, a relative lift of 5 percent, takes on the order of a hundred thousand users per variant to see reliably. Most teams do not have that traffic on most surfaces. So they run the test for two weeks, get a few thousand users, and read the flat result as proof the change did nothing. It is not proof. The test was never able to detect an effect that size. Absence of evidence got reported as evidence of absence.",
    },
    {
      type: "callout",
      title: "Run the power calculation first, not last",
      text: "Before a test starts, work out the smallest effect worth caring about and the sample it would take to detect. If you cannot reach that sample in a reasonable time, do not run the test. A test that cannot detect the win you want is not a cautious test. It is a machine for manufacturing false reassurance, and it costs the same as a real one.",
    },
    { type: "h2", text: "Peeking, and why it wrecks the result" },
    {
      type: "p",
      text: "Here is the mistake that undoes more tests than any other. You check the results every morning. The day it crosses significance, you stop and declare victory. It feels responsible. It is statistically ruinous. The p value assumes you fixed the sample size in advance and looked once. Every extra peek is another roll of the dice, another chance for noise to wander across the line, and the reported significance stops meaning what it says.",
    },
    {
      type: "p",
      text: "Evan Miller laid this out with a number that should be printed on every dashboard. Take a test where the truth is that nothing changed. Check after every observation and stop the moment you see 5 percent significance, or give up at 150 observations. You would expect to be fooled about 5 percent of the time. The real rate is 26.1 percent. More than five times what the label promised, purely from looking too often.",
    },
    {
      type: "chart",
      unit: "%",
      data: [
        { label: "False positives you think you are getting", value: 5, display: "5%", highlight: true },
        { label: "False positives you actually get, peeking to 150 obs", value: 26, display: "26.1%" },
      ],
      caption:
        "The same test, the same 5 percent significance setting. The only difference is stopping as soon as it looks significant. Peeking turned a 1 in 20 error rate into roughly 1 in 4.",
      source: "Evan Miller, How Not to Run an A/B Test",
    },
    {
      type: "p",
      text: "There are two honest ways out. The first is the fixed horizon test. Decide the sample size up front, do not look at significance until you reach it, then read it once. Dull, and it works. The second is sequential testing, a family of methods built to let you look continuously while keeping the error rate honest, by raising the bar as you peek. Both are real fixes. What does not work is the default habit of watching a live graph and stopping when it pleases you.",
    },
    {
      type: "table",
      head: ["Approach", "When you may look", "What it controls", "The cost"],
      rows: [
        ["Peek and stop at significance", "Constantly, stop when it crosses", "Nothing, the error rate balloons", "False positives up to 1 in 4 or worse"],
        ["Fixed horizon", "Once, at a pre-set sample size", "Error rate stays at the label", "You must wait and not peek"],
        ["Sequential testing", "Continuously, by design", "Error rate, via a moving threshold", "Needs the right method and tooling"],
      ],
      caption:
        "Three ways to handle looking at a running test. The first is the one almost everyone does by instinct, and it is the only one that does not work.",
      emphasiseColumn: 2,
    },
    {
      type: "p",
      text: "The same trap has a wider mouth. Test twenty variants at once, or slice one result by twenty segments after the fact, and you have run twenty tests. At 5 percent each, the chance that at least one throws a false positive is well over 60 percent. So you find that the button helped left handed users in Belgium on Tuesdays, and you believe it. This is the multiple comparisons problem, and after the fact slicing is its most seductive form, because the story you build around the fluke always sounds plausible.",
    },
    { type: "h2", text: "Significant is not important" },
    {
      type: "p",
      text: "Now the argument worth having. A result can be statistically significant and commercially meaningless, and our whole vocabulary pushes us to confuse the two. Significance is about confidence that an effect is not zero. Importance is about whether the effect is big enough to matter. With enough traffic, a 0.2 percent lift will clear significance easily. It is still 0.2 percent. Teams ship it, put it in the deck, and celebrate, because significant sounds like important. It is not the same word.",
    },
    {
      type: "compare",
      left: {
        title: "A significant result",
        items: [
          "The effect is probably not exactly zero",
          "The p value cleared your threshold",
          "Reachable with a tiny effect and big traffic",
          "Says nothing about the size of the win",
          "Easy to celebrate in a review",
        ],
      },
      right: {
        title: "An important result",
        items: [
          "The effect is big enough to change behaviour",
          "The lift pays back the cost of building it",
          "Judged against a minimum worth shipping",
          "Holds up when you look at the tail, not just the mean",
          "Worth the added complexity it leaves behind",
        ],
      },
      caption:
        "The left column is what the dashboard shows you. The right column is what you actually wanted. A mature team decides the right column before the test, so the left column cannot masquerade as it.",
    },
    {
      type: "p",
      text: "Even the companies that are best at this find that most ideas fail. That is not a knock on them, it is the point. Kohavi and Thomke, who built and ran experimentation at Microsoft, reported the honest numbers in Harvard Business Review. At Google and Bing, only 10 to 20 percent of experiments produce a positive result. Across Microsoft, roughly a third help, a third do nothing, and a third actively hurt. If your win rate looks a lot higher than that, the likeliest explanation is not that your team is brilliant. It is that you are peeking, slicing, or shipping noise.",
    },
    {
      type: "stats",
      items: [
        {
          value: "10-20%",
          label: "of experiments at Google and Bing produce a positive result",
          source: "Kohavi & Thomke, HBR 2017",
        },
        {
          value: "1/3",
          label: "of Microsoft experiments help; a third do nothing; a third do harm",
          source: "Kohavi & Thomke, HBR 2017",
        },
        {
          value: "12%",
          label: "revenue lift from one Bing ad headline change that sat ignored for six months",
          source: "Kohavi & Thomke, HBR 2017",
        },
      ],
      caption:
        "The same paper that celebrates a 12 percent windfall is blunt that most ideas fail. Both facts are the argument for testing, and against trusting any single result too much.",
    },
    { type: "h2", text: "The hill you are standing on" },
    {
      type: "p",
      text: "A/B testing has a shape problem too. It only ever compares nearby options. You test a blue button against a green one, a shorter form against a longer one, and you climb, step by step, toward the top of the hill you happen to be standing on. It will never tell you there is a taller hill across the valley, because getting there means walking downhill first, and every step down looks like a losing test. This is the local maximum, and pure optimisation cannot escape it.",
    },
    {
      type: "p",
      text: "Two effects distort early readings on top of that. Novelty makes a new thing test well simply because it is new, and people click anything different. Primacy runs the other way, where a change tests badly at first because regular users are thrown by it, then recover once they learn it. Both fade. A test that runs a few days can catch the spike or the dip and miss the truth entirely. Longer runs and returning user cohorts are how you tell a real effect from a first impression.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  Q{"Is this an<br/>optimisation question?"} -->|"No"| S["Do not A/B test it"]
  Q -->|"Yes"| P{"Enough traffic<br/>for the effect size?"}
  P -->|"No"| S
  P -->|"Yes"| H["Fix the sample,<br/>then run"]
  S --> B["Strategic bets,<br/>brand, small samples"]
  S --> A["Accessibility:<br/>a right, not a variant"]
  H --> R["Read once, judge<br/>size not just p"]`,
      caption:
        "Most of the skill in experimentation is deciding what not to test. A test answers optimisation questions. It cannot answer questions of strategy, ethics or rights.",
    },
    {
      type: "p",
      text: "So know when not to test. Small samples where you will never reach power. Strategic bets that reshape the product, where the honest tool is judgement, not a two week readout. Brand, which compounds over years and cannot be seen in a conversion window. And accessibility, which is the clearest case of all. Whether a blind user can complete a purchase is not an optimisation question with a winning variant. It is a floor. You do not A/B test whether to have a wheelchair ramp.",
    },
    {
      type: "callout",
      title: "Experimenting on users is experimenting on people",
      text: "An A/B test is a live experiment on humans who did not sign a consent form. Usually the stakes are trivial, a button colour. Sometimes they are not, when you are testing something that affects money, health, mood or access. The lightness of the tooling makes it easy to forget that the subjects are real. Ask whether you would be comfortable telling them what you did. If not, that is your answer.",
    },
    {
      type: "p",
      text: "None of this is a reason to test less. It is a reason to test with your eyes open, and the best account of how to do that comes from the people who ran these systems at scale.",
    },
    {
      type: "sourcecard",
      title: "Trustworthy Online Controlled Experiments",
      publisher: "Kohavi, Tang & Xu",
      description: "The practical field guide from the people who built experimentation at Microsoft, Google, LinkedIn and Airbnb, on running tests that do not fool you.",
      href: "https://experimentguide.com/",
    },
    {
      type: "p",
      text: "On Monday, do four things. Calculate power before you run anything, and refuse tests that cannot reach it. Fix your sample size or adopt a sequential method, and stop peeking at a naive test. Decide the smallest effect worth shipping before you look, so significance cannot pose as importance. And keep a short list of the questions you will not hand to a test at all. The tool is genuinely excellent. It just is not the truth machine the dashboard pretends it is.",
    },
    {
      type: "callout",
      title: "Prediction",
      text: "I could be wrong, but here is what the data points to. Evan Miller's peeking result has been public since 2010, and sequential testing that makes continuous looking safe is now shipping in mainstream experimentation tools. I expect that within a few years, peeking at a naive fixed horizon test and stopping at significance will be treated as a known bug rather than normal practice, the way SQL injection went from common to embarrassing. What would prove me wrong: if popular A/B tools keep showing a live significance readout with a stop button and no sequential correction, and teams keep using it that way without anyone flinching.",
    },
    {
      type: "takeaway",
      text: "A p value measures noise, not importance, and not the chance you are right. Most tests are underpowered and cannot see the effect you want. Peeking turns a 1 in 20 error rate into 1 in 4, so fix the horizon or go sequential. A significant 0.2 percent lift is still 0.2 percent. And the hardest, most valuable skill is knowing which questions deserve a test and which deserve a decision.",
    },
  ],
  references: [
    {
      label: "The Surprising Power of Online Experiments",
      detail: "Kohavi & Thomke, Harvard Business Review 2017, with the honest win rates",
      href: "https://hbr.org/2017/09/the-surprising-power-of-online-experiments",
    },
    {
      label: "Trustworthy Online Controlled Experiments",
      detail: "Kohavi, Tang & Xu, the standard practical book on A/B testing at scale",
      href: "https://experimentguide.com/",
    },
    {
      label: "Controlled experiments on the web: survey and practical guide",
      detail: "Kohavi, Longbotham, Sommerfield & Henne, on power, design and pitfalls",
      href: "https://ai.stanford.edu/~ronnyk/2009controlledExperimentsOnTheWebSurvey.pdf",
    },
    {
      label: "How Not to Run an A/B Test",
      detail: "Evan Miller, the clearest account of the peeking problem, with the 26.1 percent figure",
      href: "https://www.evanmiller.org/how-not-to-run-an-ab-test.html",
    },
    {
      label: "Sequential A/B Testing",
      detail: "Evan Miller, a method that lets you look continuously without inflating error",
      href: "https://www.evanmiller.org/sequential-ab-testing.html",
    },
    {
      label: "ASA Statement on Statistical Significance and P-Values",
      detail: "Wasserstein & Lazar, American Statistical Association, 2016",
      href: "https://www.amstat.org/asa/files/pdfs/P-ValueStatement.pdf",
    },
    {
      label: "Interpreting A/B Test Results: False Positives and Significance",
      detail: "Netflix Technology Blog, on reading significance honestly",
      href: "https://netflixtechblog.com/interpreting-a-b-test-results-false-positives-and-statistical-significance-c1522d0db27a",
    },
    {
      label: "Multiple comparisons problem",
      detail: "Overview of why testing many things at once inflates false positives",
      href: "https://en.wikipedia.org/wiki/Multiple_comparisons_problem",
    },
  ],
}
