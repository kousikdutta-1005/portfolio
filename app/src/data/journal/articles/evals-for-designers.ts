import type { Article } from "../types"

export const evals: Article = {
  id: "evals-for-designers",
  title: "Evals Are the New User Research",
  subtitle: "How to hold AI to a standard when it never repeats itself",
  date: "May 2026",
  readTime: "5 min read",
  excerpt:
    "You cannot test an AI the normal way, because it gives a different answer every time. An eval is a repeatable test built for exactly that problem. Right now engineers write these tests alone. Designers should be in the room.",
  tags: ["Evals", "Quality", "AI"],
  content: [
    {
      type: "lede",
      text: "Every AI team I have worked with hits the same wall around month three. The demo felt like magic. The launch went fine. Then quality starts slipping, and nobody can say how. Someone tweaks a prompt to fix one complaint, and quietly breaks nine other things nobody was watching. That is not the model's fault. The team simply never wrote down what good looks like.",
    },
    {
      type: "figure",
      src: "/assets/journal/checking-machine.jpg",
      alt: "A rebuilt wartime electromechanical machine with a large rotating drum of wired contacts, standing in a hut at Bletchley Park.",
      caption: "The codebreakers built a second machine whose only job was to check the answer the first machine gave. That is an eval. It is not a new idea, it is just new to us.",
      credit: "Michael Garlick, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Bletchley_Park,_Hut_11a,_checking_machine_and_checking_machine_drum_-_geograph.org.uk_-_7896281.jpg",
      licence: "CC BY-SA 2.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/2.0",
      aspect: "3 / 2",
    },
    {
      type: "p",
      text: "Normal software is predictable. Give it the same input, you get the same output. So you test it: given this input, expect this exact answer. AI is different. It can answer the same question two ways, and both can be fine. So you cannot check for one exact answer. You check that the answer has the right qualities. That test is called an eval. Think of it like marking a hundred essays with a checklist, not marking a maths quiz against one answer key. And deciding which qualities count is a design call, not an engineering one.",
    },
    {
      type: "quote",
      text: "Evals are the single most important lever for improving AI products. Teams that invest in them ship faster and with more confidence than teams that rely on vibes.",
      author: "Hamel Husain",
      source: "Your AI Product Needs Evals",
    },
    {
      type: "sourcecard",
      title: "Your AI Product Needs Evals",
      publisher: "Hamel Husain",
      description: "The field guide that turned evals from a research idea into a working practice teams can copy.",
      href: "https://hamel.dev/blog/posts/evals/",
    },
    { type: "h2", text: "What an eval actually is" },
    {
      type: "p",
      text: "You need three things. A set of real inputs. A set of graders that score the answers. And a pass mark you refuse to ship below. That is the whole idea. The skill is picking inputs that look like real use, and writing graders that measure something a user would call quality.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  D[("Eval set<br/>real user inputs")] --> R["Run current build"]
  R --> G1["Fixed checks<br/>format, speed, shape"]
  R --> G2["AI graders<br/>true to source, tone"]
  R --> G3["Human review<br/>a small sample"]
  G1 --> S["Scorecard"]
  G2 --> S
  G3 --> S
  S -->|"below pass mark"| B["Block release"]
  S -->|"above pass mark"| P["Ship"]
  P --> L["Real usage logs"]
  L -.->|"failures become new tests"| D`,
      caption:
        "The loop that matters is the dotted one. If your tests do not grow from real failures, they slowly become for show.",
    },
    { type: "h2", text: "The three kinds of grader, and who owns them" },
    {
      type: "ol",
      items: [
        "Fixed checks. Did it return valid data, stay fast enough, keep under the size limit, avoid banned phrases? Cheap, fast, run on every change. Engineers own these.",
        "AI-graded. Does the answer stick to the source it was given? Does the tone match the product? Did it say no when it should have? Here one AI scores the answer against a rubric. A rubric is just the marking scheme: the list of what earns a high or low score. Design should own the rubric, because the rubric is your product's taste written down.",
        "Human. A small sample checked by someone who knows the subject. Slow, costly, and impossible to replace. This is user research wearing a lab coat.",
      ],
    },
    {
      type: "table",
      head: ["Axis", "Usability test", "Eval"],
      rows: [
        ["Sample size", "5 to 8 participants", "Hundreds to thousands of cases"],
        ["Cadence", "Once a milestone", "Every commit, automatically"],
        ["Who runs it", "A researcher, live", "The build, then a human on the sample"],
        ["What it catches", "Confusion, intent, delight", "Slipping quality, wrong refusals"],
        ["Reusable?", "Notes age quickly", "The test set grows over time"],
      ],
      caption:
        "An eval does not replace usability research. It is the same instinct, running all the time, catching the slow drift a once-a-milestone study would miss.",
      emphasiseColumn: 2,
    },
    {
      type: "callout",
      title: "The rubric is a design document",
      text: "When you write the rubric for an AI grader, you are stating, in words a machine can act on, what your product treats as good. That is the most useful spec a designer can write on an AI product. Almost nobody is writing it.",
    },
    {
      type: "compare",
      left: {
        title: "A rubric that grades nothing",
        items: [
          "The answer should be helpful.",
          "The tone should feel on brand.",
          "Refuse when appropriate.",
          "Avoid making things up where possible.",
        ],
      },
      right: {
        title: "A rubric two reviewers agree on",
        items: [
          "Every fact comes from a source it was given.",
          "Second person, no exclamation marks, no waffle.",
          "Refuse any request for legal or medical advice.",
          "Score 1 if a claim is unbacked and a user could act on it.",
        ],
      },
      caption:
        "The left column feels reasonable and is useless: two people would score it differently. The right column can be scored the same way twice. That is the whole gap between a spec and a wish.",
    },
    { type: "h2", text: "Read your failures, do not chase one score" },
    {
      type: "p",
      text: "The trap with evals is polishing one average until it stops meaning anything. A single score of 0.87 tells you nothing you can act on. What actually moves a product is reading the failures. Take a hundred bad answers. Read every one. Group them by cause. The list of causes is usually shorter than people expect, and usually not what the team guessed.",
    },
    {
      type: "chart",
      unit: "%",
      data: [
        { label: "Search missed the right doc", value: 34, highlight: true },
        { label: "Right doc, wrong part", value: 22 },
        { label: "Said no when it shouldn't", value: 18 },
        { label: "Tone or format drift", value: 14 },
        { label: "Real reasoning error", value: 12 },
      ],
      caption:
        "A typical spread of failures from reading through the bad answers on an internal assistant. Notice the model itself is the smallest slice. Most AI failures are search and interface failures dressed up as model failures.",
      source: "Pattern consistent with published error-analysis writeups; see Husain and Yan",
    },
    {
      type: "p",
      text: "That chart is the most useful thing you can make in AI work, and it is really a research finding. It tells you a fancier model would fix only twelve percent of your problem. Fixing how you fetch and quote sources, and when the AI says no, would fix over half. This is the same prioritising designers have always done with usability findings. Same craft, new ground.",
    },
    { type: "h2", text: "Where designers plug in" },
    {
      type: "ul",
      items: [
        "Curate the eval set. Which inputs stand for real users? The mix of inputs you test is the mix of users you are choosing to serve. That is a strategy call dressed up as a data task.",
        "Write the rubrics. Say what true to source means, what a fair no looks like, and how the product should sound when it is unsure. Make it clear enough that two people score it the same.",
        "Own the list of failure causes. Sit in on the review. Group failures by how much they hurt the user, not by tech cause, and the roadmap writes itself.",
        "Set the pass mark. Deciding which quality bar blocks a release is a call about risk and trust. Do not let it default to whatever number the build happened to hit.",
      ],
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "A rubric is design intent in a form a machine can check on every build.",
      text: `export const faithfulness = {
  name: "faithfulness",
  scale: [1, 5],
  rubric: \`
5 - Every claim comes from the source. Nothing added.
4 - All claims backed; small rewording that changes no meaning.
3 - One unbacked but harmless line (e.g. a linking sentence).
2 - An unbacked claim a user could act on. 
1 - Contradicts the source.
\`,
  blockReleaseBelow: 4.2,
}`,
    },
    { type: "h2", text: "Why this matters for your career" },
    {
      type: "p",
      text: "For twenty years the strongest knock on design was that you could not measure it. Evals hand us the opposite problem. An AI product is measured all the time. If designers are not in the room when those measures are set, the product gets tuned toward whatever engineers found easy to score. Usually that is helpfulness. And helpfulness on its own gives you a yes-man system that agrees with everything and is trusted by no one.",
    },
    {
      type: "takeaway",
      text: "Write the rubric, or inherit someone else's. Evals are where product taste becomes a rule the build can check. A designer who can define quality in a way a grader can score is the most valuable person on an AI team.",
    },
  ],
  references: [
    {
      label: "Your AI Product Needs Evals",
      detail: "Hamel Husain",
      href: "https://hamel.dev/blog/posts/evals/",
    },
    {
      label: "Patterns for Building LLM-based Systems and Products",
      detail: "Eugene Yan",
      href: "https://eugeneyan.com/writing/llm-patterns/",
    },
    {
      label: "AI Engineering",
      detail: "Chip Huyen, O'Reilly 2025 (book repository)",
      href: "https://github.com/chiphuyen/aie-book",
    },
    {
      label: "Measuring the User Experience with the HEART Framework",
      detail: "Rodden, Hutchinson & Fu, Google, CHI 2010",
      href: "https://research.google/pubs/measuring-the-user-experience-on-a-large-scale-user-centered-metrics-for-web-applications/",
    },
    {
      label: "OpenAI Evals",
      detail: "OpenAI, open-source evaluation framework",
      href: "https://github.com/openai/evals",
    },
  ],
}
