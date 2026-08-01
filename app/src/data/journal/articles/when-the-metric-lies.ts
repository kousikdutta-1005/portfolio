import type { Article } from "../types"

export const metrics: Article = {
  id: "when-the-metric-lies",
  title: "When the Metric Becomes the Target",
  subtitle: "What happens to a design team the moment a number turns into a goal",
  readTime: "9 min read",
  excerpt:
    "The moment you pay people to move a number, the number stops telling you the truth. This is about why that happens, why averages hide the users you are failing, and how to tell measurement apart from a story told to justify a decision already made.",
  tags: ["Metrics", "Product", "Research"],
  content: [
    {
      type: "lede",
      text: "Give a team a number to hit and they will hit it. That is the good news and the whole problem. A metric is a shadow of something you care about, cast at a useful angle. Turn the shadow into the target and people learn to move the shadow without moving the thing. I have watched a design team raise engagement by 30 percent and make the product worse, and every dashboard said we were winning.",
    },
    {
      type: "figure",
      src: "/assets/journal/spring-scale.webp",
      alt: "A spring scale hanging from its hook, weighing a load by how far an internal spring stretches.",
      caption:
        "A spring scale does not measure weight at all. It measures how far a spring stretched, and we agree to read that as weight. It works right up until someone leans on the pan, and that gap between the signal and the thing you actually care about is exactly where Goodhart's law lives.",
      credit: "Bestalex, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Spring_scale._Made_in_USSR.jpg",
      licence: "CC0",
      licenceHref: "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      width: 861,
      height: 1200,
    },
    {
      type: "p",
      text: "Picture a hospital that gets judged on how long people wait in Accident and Emergency. A four hour limit sounds humane. So the ambulances start queuing outside the doors, patients held in the bay, because the clock only starts once you are through them. The wait did not shrink. It moved to a place the metric could not see. The number improved. The care did not. That is the pattern, and it does not care whether you run a hospital or a checkout flow.",
    },
    { type: "h2", text: "Goodhart's law, and who actually said the famous line" },
    {
      type: "p",
      text: "Charles Goodhart was a monetary economist. In 1975 he made a dry observation about central banks. Any measure the bank tried to control, he noticed, would stop behaving the moment it became the thing under control. His own words were careful and a little clumsy: any observed statistical regularity tends to collapse once pressure is placed upon it for control purposes. That is the original. It is worth reading twice, because almost nobody quotes it.",
    },
    {
      type: "p",
      text: "The line everyone quotes came later, from an anthropologist. In a 1997 paper about how British universities were being audited, Marilyn Strathern compressed Goodhart into one sentence. People credit it to him. She wrote it. Getting this right matters, because the crisp version is the one that travels, and the person who made it travel was studying exactly our problem: what happens to human beings when their work is turned into a score.",
    },
    {
      type: "quote",
      text: "When a measure becomes a target, it ceases to be a good measure.",
      author: "Marilyn Strathern",
      source: "Improving ratings: audit in the British University system, 1997",
    },
    {
      type: "p",
      text: "Read it as a warning about incentives, not about maths. The measure does not rot on its own. It rots because you started rewarding it. The instant a person's raise, or a squad's roadmap, depends on a number, that number stops measuring the world and starts measuring the person's effort to move the number. Those are different things. They agree right up until the day someone finds the cheaper path.",
    },
    { type: "h2", text: "A signal is not a target" },
    {
      type: "p",
      text: "The fix starts with a distinction most teams never draw. A signal is a reading you watch to understand what is happening. A target is a number you have promised to move. The same metric can be either. Time on page is a fine signal. As a target it is poison, because you can raise it two ways: make the content compelling, or make the interface so confusing that people cannot find the exit. Both push the graph up. Only one is worth having.",
    },
    {
      type: "compare",
      left: {
        title: "A metric used as a signal",
        items: [
          "You watch it to learn what changed",
          "It sits next to three others that would catch a lie",
          "A rise triggers a question, not a celebration",
          "Nobody's bonus depends on it",
          "You are allowed to conclude it went up for a bad reason",
        ],
      },
      right: {
        title: "The same metric used as a target",
        items: [
          "You have promised leadership it will go up",
          "It is reported alone, stripped of context",
          "A rise ends the conversation",
          "A team is compensated on it",
          "Explaining a rise away is treated as making excuses",
        ],
      },
      caption:
        "Nothing about the metric changes between these columns. What changes is what you are allowed to conclude, and that is the whole difference between learning and theatre.",
    },
    {
      type: "p",
      text: "This is why engagement is the most dangerous number in product design. It is the one most likely to rise for the wrong reason. A user who is delighted and a user who is lost both generate sessions, scrolls and clicks. The dashboard cannot tell them apart. Optimise engagement hard enough and you will build a product that is sticky the way a swamp is sticky. People are in it a long time and none of them are happy.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  A["Pick a metric<br/>e.g. time on page"] --> B["Attach it to<br/>a team's goals"]
  B --> C["People optimise<br/>the metric directly"]
  C --> D{"Easiest way<br/>to move it?"}
  D -->|"Improve the product"| E["Metric and reality<br/>rise together"]
  D -->|"Exploit the metric"| F["Metric rises,<br/>reality falls"]
  F --> G["Dashboard says<br/>you are winning"]
  G --> H["Nobody looks<br/>closer"]`,
      caption:
        "The failure is not the metric. It is the arrow from the metric to a team's incentives, which quietly rewards whichever path up is cheapest.",
    },
    {
      type: "p",
      text: "Google's research team built a way out of this that I lean on constantly. It is called HEART, and its real contribution is not the five categories. It is the discipline of going from goal to signal to metric, in that order, and never skipping to the metric. You state the goal in plain words. You decide what observable behaviour would signal progress. Only then do you pick a number. Do it backwards, starting from whatever is easy to count, and you get a target with no goal behind it.",
    },
    {
      type: "table",
      head: ["Category", "The goal, in words", "A signal you might watch", "A metric"],
      rows: [
        ["Happiness", "People feel the tool respects them", "Survey sentiment after a task", "CSAT on task completion"],
        ["Engagement", "People use the depth, not just the door", "Actions per active session", "Median features touched per week"],
        ["Adoption", "New people reach first value fast", "Reached the core action once", "Percent activated in seven days"],
        ["Retention", "People come back because it helped", "Returns in a later week", "Week four retention rate"],
        ["Task success", "People finish what they came to do", "Completed the flow unaided", "Completion rate and time on task"],
      ],
      caption:
        "The HEART framework from Rodden, Hutchinson and Fu at Google. The columns read left to right for a reason. Start at the metric and you have skipped the only two steps that make it mean anything.",
      source: "Google Research, CHI 2010",
      emphasiseColumn: 1,
    },
    { type: "h2", text: "The average is a liar you trust" },
    {
      type: "p",
      text: "Here is the mistake I made for years. I reported means. Mean task time, mean latency, mean satisfaction. A mean is a single number pretending to speak for everyone, and it speaks loudest for the people in the middle, who were never your problem. The people you are failing live in the tail, and the tail is exactly what an average erases.",
    },
    {
      type: "p",
      text: "Think of a bus that is on time on average. Half the days it is five minutes early, half the days it is thirty five minutes late. The average is respectable. The experience is misery, because nobody rides the average bus. They ride the late one and miss the meeting. A mean task time of nine seconds can hide a group for whom the task takes two minutes and often fails. That group churns, quietly, and your headline number never flinches.",
    },
    {
      type: "chart",
      unit: "s",
      data: [
        { label: "Median (p50) task time", value: 9, display: "9 s", highlight: true },
        { label: "75th percentile (p75)", value: 14, display: "14 s" },
        { label: "95th percentile (p95)", value: 41, display: "41 s" },
        { label: "99th percentile (p99)", value: 88, display: "88 s" },
      ],
      caption:
        "A worked example of one flow. The mean here lands near 13 seconds and looks healthy. The story is at p95 and p99, where a real slice of users is stuck for over half a minute. Percentiles are the honest view.",
      source: "Worked example, Kousik Dutta",
    },
    {
      type: "p",
      text: "This is why Google's own site reliability practice reports percentiles, not averages, and why Core Web Vitals judge a site at the 75th percentile of its real users, not the mean. The rule I now follow: an average is a starting question, never an answer. If someone shows me a mean without a p95 next to it, I assume the p95 is bad and they have not looked. Usually I am right.",
    },
    { type: "h2", text: "The users you never measured" },
    {
      type: "p",
      text: "There is a subtler lie underneath the average. Your analytics only contain the people who stayed long enough to be counted. The ones who bounced in the first five seconds, hit a wall, and left are barely in your data at all. So you tune the product for the survivors and call it listening to users. It is survivorship bias, and product analytics is riddled with it.",
    },
    {
      type: "p",
      text: "The classic version comes from the second world war. Analysts looked at bombers that came back full of holes and wanted to armour the parts with the most holes. The statistician Abraham Wald pointed out the obvious thing everyone had missed. The planes in front of them were the ones that survived. The holes they were not seeing, in the engines, were the holes that brought planes down. Armour where the data is empty. Your churn is the plane that did not come back, and it leaves no holes to count.",
    },
    {
      type: "stats",
      items: [
        {
          value: "~85%",
          label: "of usability problems surfaced by testing with just five users, in the classic finding",
          source: "Nielsen Norman Group",
        },
        {
          value: "75th",
          label: "percentile is where Core Web Vitals grades a real site, precisely to stop the average hiding a bad tail",
          source: "web.dev",
        },
      ],
      caption:
        "Five people watched closely will show you what a million anonymous events cannot: the reason someone gave up.",
    },
    {
      type: "p",
      text: "This is the qualitative counterweight, and it is not soft. Five usability sessions catch the wall that made someone quit, because you watch them hit it. A million events will never tell you why, only that a line went down. Jakob Nielsen has since been clear that the five user figure is a guide for a single round of testing, not a magic constant, and that you test again after each fix. The point stands. The number tells you that something is wrong. A person tells you what.",
    },
    {
      type: "sourcecard",
      title: "Quantitative vs. Qualitative Usability Testing",
      publisher: "Nielsen Norman Group",
      description: "Why numbers tell you what and how much, while watching real people tells you why, and why a serious team needs both rather than picking a side.",
      href: "https://www.nngroup.com/articles/quant-vs-qual/",
    },
    { type: "h2", text: "Data driven, or data justified" },
    {
      type: "p",
      text: "Now the argument I will pick with the industry. Most of what gets called data driven design is data justified design. The two look identical in a deck and are opposites in practice. Data driven means the number could have changed your mind, and sometimes did. Data justified means the decision was made, and the number was chosen afterwards to defend it. One is science. The other is a lawyer building a case.",
    },
    {
      type: "p",
      text: "There is a clean test to tell them apart. Before you look at the result, write down what would make you kill the idea. Name the number and the threshold. If you cannot, you are not measuring, you are searching for a quote that agrees with you. A decision metric is one that could talk you out of shipping. A vanity metric is one that only ever goes up and only ever confirms you. Total registered users is vanity. It cannot fall and it cannot change a plan. Week four retention is a decision metric. It can ruin your afternoon, which is exactly why it is worth watching.",
    },
    {
      type: "p",
      text: "You can hear the difference in a review. Data justified design sounds like this: we knew the redesign was right, and look, sign ups went up two points. Nobody asks what else changed that month, or whether a holiday sale did the work. Data driven design sounds duller and more honest: we said we would only ship if activation held above 40 percent, it came in at 43, so we shipped. The first is a story with a number stapled on. The second names the threshold before the result, which is the only order that keeps you honest.",
    },
    {
      type: "callout",
      title: "Prediction",
      text: "I could be wrong, but here is what the data points to. Google's HEART work has been public since 2010, and the honest reporting of percentiles is now standard in reliability engineering yet still rare in product design. I expect that within a few years, defining a single guardrail metric that can veto a launch will be a normal part of a senior design brief, not an engineering afterthought. What would prove me wrong: if design job specs and portfolio reviews keep asking only for uplift stories, with no team routinely publishing a metric that stopped one of their own launches.",
    },
    {
      type: "p",
      text: "So what do you do on Monday. Pick your one or two real goals and write them as sentences a user would recognise. For each, choose a signal, then a metric, in that order. Report every headline number with a percentile beside it. Keep at least one guardrail that is allowed to say no. And before any test, write the result that would change your mind, and keep the note. If you never write that note, you already know the answer you are going to find.",
    },
    {
      type: "takeaway",
      text: "A metric is a signal until you pay someone to move it, and then it is a target that will lie to you. Go goal, then signal, then metric, never backwards. Trust percentiles over averages. Remember the users who left and never showed up in your data. And keep one number that is allowed to change your mind, because a metric that cannot is not evidence, it is decoration.",
    },
  ],
  references: [
    {
      label: "Goodhart's law",
      detail: "Origin of the idea and Goodhart's original 1975 formulation, with sources",
      href: "https://en.wikipedia.org/wiki/Goodhart%27s_law",
    },
    {
      label: "Improving ratings: audit in the British University system",
      detail: "Marilyn Strathern, European Review, 1997, where the famous one line version was written",
      href: "https://www.cambridge.org/core/journals/european-review/article/abs/improving-ratings-audit-in-the-british-university-system/FC2EE640C0C44E3DB87C29FB666E9AAB",
    },
    {
      label: "Measuring the User Experience with the HEART Framework",
      detail: "Rodden, Hutchinson & Fu, Google, CHI 2010: goals, then signals, then metrics",
      href: "https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/",
    },
    {
      label: "Service Level Objectives",
      detail: "Google SRE Book, on why percentiles beat averages for user experience",
      href: "https://sre.google/sre-book/service-level-objectives/",
    },
    {
      label: "Defining the Core Web Vitals metrics thresholds",
      detail: "web.dev, on judging a site at the 75th percentile of real users",
      href: "https://web.dev/articles/defining-core-web-vitals-thresholds",
    },
    {
      label: "Why You Only Need to Test with 5 Users",
      detail: "Jakob Nielsen, Nielsen Norman Group, the original claim and its logic",
      href: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
    },
    {
      label: "How Many Test Users in a Usability Study?",
      detail: "Nielsen Norman Group, the later clarification of when five is and is not enough",
      href: "https://www.nngroup.com/articles/how-many-test-users/",
    },
    {
      label: "Quantitative vs. Qualitative Usability Testing",
      detail: "Nielsen Norman Group, on what each method can and cannot tell you",
      href: "https://www.nngroup.com/articles/quant-vs-qual/",
    },
  ],
}
