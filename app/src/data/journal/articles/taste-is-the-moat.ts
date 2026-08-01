import type { Article } from "../types"

export const tasteAsMoat: Article = {
  id: "taste-is-the-moat",
  title: "When Everyone Can Generate, Taste Is the Moat",
  subtitle: "Good judgement is the last rare thing",
  date: "Feb 2026",
  readTime: "5 min read",
  excerpt:
    "Making a decent interface is now almost free. That does not make design worth less. It moves all the worth into the one thing that stayed hard: knowing which of a thousand decent options is the right one.",
  tags: ["Craft", "Strategy", "Career"],
  content: [
    {
      type: "lede",
      text: "Cheap production has happened before. Photography did it to painted portraits. Desktop publishing did it to typesetters. Each time, the same thing happened. People who sold their skill at making things lost ground. People who sold their judgement got a big payoff. We are living through a much faster version of that now.",
    },
    {
      type: "figure",
      src: "/assets/journal/contact-sheet.jpg",
      alt: "A photographer's contact sheet, a grid of dozens of small nearly identical black and white frames from one shoot.",
      caption: "The photographer shot forty frames and every one is fine. The work was never taking the picture. It was circling the one worth printing. When making options is free, that circle is the whole job.",
      credit: "White House Photographic Office (WHPO) - Schumacher, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Ford_A1427_NLGRF_photo_contact_sheet_(1974-10-15)(Gerald_Ford_Library).jpg",
      licence: "Public domain",
      aspect: "3 / 2",
    },
    {
      type: "p",
      text: "First, what does moat mean? It is the thing that stops someone copying you. Here is the kitchen version. Anyone can buy the same ingredients, so the cook is the difference. A camera in every phone did not make everyone a photographer. A model can now build a decent landing page in twenty seconds. The contrast is readable, the spacing is sensible, the type looks fine. What it cannot do is know that this product should feel plain, not friendly. The buyer is a compliance officer. Their whole job is risk. To them, warmth reads like a sales pitch.",
    },
    {
      type: "quote",
      text: "Design is not just what it looks like and feels like. Design is how it works.",
      author: "Steve Jobs",
      source: "The New York Times, 2003",
    },
    { type: "h2", text: "What taste actually is" },
    {
      type: "p",
      text: "Taste sounds like a fancy word for personal preference. It is not. Taste is packed-down experience. You have seen a huge number of outcomes, and they collapse into a fast call you can no longer fully explain. Kahneman would call it fast thinking trained by slow thinking. It feels like a gut feeling. It behaves like a mind that has seen a lot of examples.",
    },
    {
      type: "p",
      text: "That is also why taste fades in the exact world AI creates. If you make a hundred options and never live with the one you ship, you never feel the result. And the result is what trains the judgement. Volume with no consequence is not experience. It is just scrolling.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  G[Make: near free] --> Sel{Choose}
  Sel -->|human judgement| Jus[Defend the cut]
  Sel -->|no view| Avg[Ship the average]
  Jus --> Ship[Ship one choice]
  Ship --> Con[Result in the market]
  Con -.->|trains judgement| Sel
  Avg -.->|no signal| Avg`,
      caption:
        "Make, choose, defend. Judgement shows up when you choose and defend. Only the path that ships feels a result and gets sharper. The other path is a treadmill.",
    },
    {
      type: "table",
      head: ["The work", "What got cheap", "What stayed hard"],
      rows: [
        [
          "Making a layout",
          "Twenty decent versions a minute",
          "Knowing which one fits this buyer",
        ],
        [
          "Writing the words",
          "A smooth first draft, instantly",
          "Deciding what must not be said",
        ],
        [
          "Visual polish",
          "Readable contrast, spacing, type",
          "A point of view the polish serves",
        ],
        [
          "Iterating",
          "Endless options on demand",
          "Knowing when to stop",
        ],
      ],
      caption:
        "Making things dropped to almost free, the left column. The right column did not move, so that is where the value went.",
      emphasiseColumn: 2,
    },
    { type: "h2", text: "Why pretty things feel easier to use" },
    {
      type: "p",
      text: "In 1995, Masaaki Kurosu and Kaori Kashimura tested twenty six ATM layouts with 252 people. They found something that still annoys engineers thirty years later. How pretty people found a layout predicted how easy they thought it was. And it predicted that far better than how easy it actually was. People forgive a beautiful thing its faults.",
    },
    {
      type: "sourcecard",
      title: "Aesthetic-Usability Effect",
      publisher: "Laws of UX",
      description: "The short write-up of the Kurosu and Kashimura ATM study, where good looks beat real ease of use.",
      href: "https://lawsofux.com/aesthetic-usability-effect/",
    },
    {
      type: "p",
      text: "The lesson is not just make things pretty. It is that a good-looking choice is a trust signal, and trust drives every decision a user makes. When every rival can make a decent interface, decent stops setting you apart. What is left is the pile of small, careful choices a machine will not make for you.",
    },
    {
      type: "chart",
      unit: "",
      data: [
        { label: "Cost to produce an interface", value: 8, display: "collapsing" },
        { label: "Cost to distribute", value: 12, display: "near zero" },
        { label: "Cost to acquire attention", value: 78, display: "rising", highlight: true },
        { label: "Cost to earn trust", value: 92, display: "rising", highlight: true },
      ],
      caption:
        "The money flipped. What used to cost a lot is now free. What we took for granted is now the rare part.",
      source: "Kousik Dutta",
    },
    {
      type: "compare",
      left: {
        title: "Reviewing options",
        items: [
          "Waits for the tool to suggest, then picks the least bad",
          "Judges each option alone, against nothing",
          "Aims for safe, not right",
          "Lands on the average of the training data",
        ],
      },
      right: {
        title: "Having a position",
        items: [
          "Decides the intent before the first draft",
          "Judges every option against a written promise",
          "Can defend a cut, not just an addition",
          "Reaches something a model would never suggest",
        ],
      },
      caption:
        "The difference is not effort or speed. It is whether you brought a point of view to the options, or let the options stand in for one.",
    },
    { type: "h2", text: "How I try to keep judgement sharp" },
    {
      type: "ol",
      items: [
        "Commit before you generate. I write down how the thing should feel, three adjectives and one sentence about the person on the other side, before I open any tool. Then I use the tool to explore inside that promise, not to find it.",
        "Learn from outside software. Most of what I know about hierarchy came from magazine layout. Restraint came from product design. Pacing came from film editing. The design books everyone reads are shallow and shared. That is exactly why they cannot set you apart.",
        "Ship, then stay. The feedback that trains taste shows up months later, in support tickets and retention curves. Leave before it lands and you learn nothing. Then you repeat the same mistakes, confidently, for ten years.",
        "Defend one thing per project. Not everything can be special. Pick the one moment that carries the product's argument and make it undeniable. Let the rest be quietly correct.",
      ],
    },
    {
      type: "chart",
      unit: "",
      data: [
        { label: "Generating and producing", value: 15, display: "15%" },
        { label: "Selecting and editing options", value: 30, display: "30%", highlight: true },
        { label: "Framing the problem and intent", value: 25, display: "25%", highlight: true },
        { label: "Living with what shipped", value: 20, display: "20%" },
        { label: "Everything else", value: 10, display: "10%" },
      ],
      caption:
        "Rough numbers from my own project logs, not a study. Making pixels is the smallest slice now. Choosing and framing is most of the work.",
      source: "Kousik Dutta, project logs",
    },
    {
      type: "callout",
      title: "The interview question I would ask",
      text: "Show me something you removed. Anyone can defend what they added. That is easy. Defending a cut needs a clear idea of what matters, and it is the best proof of taste I know.",
    },
    { type: "h2", text: "The honest risk" },
    {
      type: "p",
      text: "There is a real danger here. Taste can turn into a shield. Some experienced designers use it to claim they are simply better, and to avoid tools that are making everyone faster. I have struck that pose myself, and it ages badly. The cure is rigour. If you cannot say why a choice is right for the user, the context, and the result, you do not have taste. You have a preference and an ego.",
    },
    {
      type: "p",
      text: "Dieter Rams said good design is as little design as possible. Back to purity. Back to simplicity. That is a call about what to leave out, made by someone who had shipped enough to know. No machine has ever done it, and I do not think that changes soon.",
    },
    {
      type: "takeaway",
      text: "Making things is free now, so stop competing there. The rare thing is a point of view you can defend about what should exist. You build it by shipping real work and living with the results long enough to learn.",
    },
  ],
  references: [
    {
      label: "Aesthetic-Usability Effect",
      detail: "Kurosu & Kashimura, ACM CHI 1995",
      href: "https://lawsofux.com/aesthetic-usability-effect/",
    },
    {
      label: "AI: First New UI Paradigm in 60 Years",
      detail: "Jakob Nielsen, Nielsen Norman Group, 2023",
      href: "https://www.nngroup.com/articles/ai-paradigm/",
    },
    {
      label: "Ten Principles for Good Design",
      detail: "Dieter Rams, Vitsœ",
      href: "https://www.vitsoe.com/us/about/good-design",
    },
    {
      label: "Thinking, Fast and Slow",
      detail: "Daniel Kahneman, 2011",
      href: "https://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow",
    },
    {
      label: "The Design of Everyday Things",
      detail: "Don Norman, Basic Books",
      href: "https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/",
    },
    {
      label: "Language Model Sketchbook",
      detail: "Maggie Appleton, on the limits of generation and chat UI",
      href: "https://maggieappleton.com/lm-sketchbook",
    },
  ],
}
