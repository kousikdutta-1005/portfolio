import type { Article } from "../types"

export const motion: Article = {
  id: "motion-is-physics",
  title: "Motion Is Not Decoration, It Is Physics",
  subtitle: "Why springs feel real and timed animations feel fake",
  readTime: "5 min read",
  excerpt:
    "A timed animation assumes the world will wait for it. Real things do not have a set time. They have weight and speed. That one difference is what separates interfaces that feel alive from ones that feel fake.",
  tags: ["Motion", "Interaction", "Craft"],
  content: [
    {
      type: "lede",
      text: "Watch someone flick a card off the screen in a good app, then in a bad one. In both, the card leaves. In the good one, it leaves at the speed you threw it. In the bad one, it leaves in exactly 300 milliseconds, because someone typed 300 into a settings file. The interface just told you it was not really watching you.",
    },
    {
      type: "figure",
      src: "/assets/journal/horse-in-motion.jpg",
      alt: "A row of sequential 1878 photographs showing a horse and rider galloping, captured one frame at a time.",
      caption:
        "Muybridge's 1878 frames settled an argument nobody could win by eye: a galloping horse does lift all four hooves at once. Motion stopped being a matter of opinion and became something you could measure. That is the difference between a spring, which follows real physics, and a timed curve, which follows a number someone typed.",
      credit: "Eadweard Muybridge, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:The_Horse_in_Motion_high_res.jpg",
      licence: "Public domain",
      width: 1200,
      height: 740,
    },
    { type: "h2", text: "The problem with fixed time" },
    {
      type: "p",
      text: "A timing curve maps how far along the animation is to how much time has passed. It is a neat idea with one fatal flaw: it has to know up front how long it will take. That is fine for something the app started on its own. It is wrong for anything your finger is touching. Your gesture has a speed, and a fixed-time animation has nowhere to put that speed.",
    },
    {
      type: "p",
      text: "This causes the interruption problem. You drag, you let go, and the animation jumps back to the start and runs a fixed curve. There is a visible jump where the object's speed suddenly changes. Think of a door on a spring versus a door on a timer. Push the spring door and let go, and it keeps going from where your hand left it. The timer door ignores your push and closes on its own schedule. Your eye catches that jump even when your mind does not. It reads as cheap.",
    },
    {
      type: "compare",
      left: {
        title: "Scripted motion: fixed time and easing",
        items: [
          "Knows its length before it starts",
          "Ignores how fast your gesture moved",
          "Jumps back to the start when interrupted",
          "One curve for a toggle and a full screen",
          "Time is a number you typed in",
        ],
      },
      right: {
        title: "Physical motion: a spring",
        items: [
          "Its length just falls out of the maths",
          "Keeps the speed you threw it with",
          "Carries on from wherever it is now",
          "Weight makes heavy things move heavily",
          "Time comes out of stiffness, damping, weight",
        ],
      },
      caption:
        "The two can look the same when still. They split apart the moment you grab one in mid-air.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  G["You let go<br/>speed = 1200 px/s"] --> Q{"Which model?"}
  Q -->|"Fixed time + easing"| D["Back to speed 0<br/>fixed 300 ms<br/>visible jump"]
  Q -->|"Spring"| S["Carries on at 1200<br/>time just happens<br/>smooth"]
  D --> F1["Feels fake"]
  S --> F2["Feels real"]
  X["New touch mid-air"] --> D
  X --> S
  D --> J["Jumps / restarts"]
  S --> C["Bends smoothly"]`,
      caption:
        "The difference is not about looks. A spring takes speed as an input, so you can grab it and change its target without any jump.",
    },
    {
      type: "p",
      text: "A spring does not take a time. It takes stiffness, damping, and weight, plus where the thing is right now and how fast it is moving. The time is a result: whatever comes out of the maths. Think of a drawer sliding shut. It speeds up, then eases into place on its own, and nobody set a timer for it. So you can throw new input at a spring in mid-air and it just changes course, because it was never following a clock.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "The important line is the last one. Handing the gesture's speed to the spring is what makes the move smooth.",
      text: `const settle = {
  type: "spring",
  stiffness: 400,   // how hard it pulls toward the target
  damping: 34,      // how quickly oscillation dies (≈ critical here)
  mass: 1,          // perceived weight
}

onDragEnd={(_, info) => {
  animate(x, targetX, {
    ...settle,
    velocity: info.velocity.x,   // inherit the throw
  })
}}`,
    },
    { type: "h2", text: "Tuning by feel, with a method" },
    {
      type: "table",
      head: ["", "Fixed time + easing", "Spring"],
      rows: [
        ["Can be interrupted", "Jumps back to the start", "Bends from where it is"],
        ["Feel", "Fake, all the same", "Real, has weight"],
        ["What you tune", "A time and a curve", "Stiffness, damping, weight"],
        ["Keeps your speed", "No, it is thrown away", "Yes, as a direct input"],
      ],
      caption:
        "The same four questions, answered by each model. Only one column can take the speed of your gesture.",
      emphasiseColumn: 2,
    },
    {
      type: "ul",
      items: [
        "Stiffness sets urgency. Higher pulls harder toward the target. Below about 150 it feels sleepy. Above about 600 it feels snappy and a bit aggressive.",
        "Damping sets composure. Too low and it wobbles like jelly, which feels like a toy. Damping that arrives fast with no wobble is the right default for anything a professional uses all day.",
        "Weight sets scale. Heavy things should move heavy. Push a full shopping trolley and it rolls slowly; an empty one darts away. A full screen that moves as lightly as a toggle is the surest sign an interface was animated by a settings file, not a person.",
        "A little bounce is a flavour, not a default. A tiny bounce on a confirmation feels nice. The same bounce on a table row feels broken.",
      ],
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "The same settle, written both ways. Emil Kowalski's rule of thumb, ease out and usually under 300 ms, is what the curve below sets. The spring lands in the same place, but only it survives being interrupted.",
      text: `// Physical: no duration, inherits velocity, interruptible
const spring = { type: "spring", stiffness: 400, damping: 34, mass: 1 }

// Scripted: the closest fixed-time approximation
const eased = {
  duration: 0.3,               // 300 ms, decided up front
  ease: [0.16, 1, 0.3, 1],     // ease-out: fast start, soft finish
}`,
    },
    {
      type: "p",
      text: "Emil Kowalski makes the same case from the craft side. Great animations are fast, usually under 300 milliseconds, have a purpose, and above all can be interrupted. A user can reverse or redirect one in mid-air without ever seeing it jump. A timing curve can be made fast and pretty. It cannot be made truly interruptible, because interruption is a speed problem, and a curve has thrown the speed away.",
    },
    {
      type: "sourcecard",
      title: "Great Animations",
      publisher: "Emil Kowalski",
      description: "The case that great motion is fast, purposeful, and above all interruptible, with examples you can feel for yourself.",
      href: "https://emilkowal.ski/ui/great-animations",
    },
    {
      type: "callout",
      title: "The one-object rule",
      text: "If one element turns into another, animate it as a single object moving, not two objects fading into each other. Think of catching a ball: your eyes track one thing the whole way. Shared-element transitions are the single highest-payoff motion trick there is, because they keep the user's thread of attention across a change.",
    },
    { type: "h2", text: "What motion is actually for" },
    {
      type: "p",
      text: "Three jobs, and everything else is noise. It shows where something came from, so a new view feels like a continuation, not a replacement. It confirms your input registered, closing the loop inside the first tenth of a second. And it points your eye at the one thing that changed, which matters a lot in busy screens where a change can slip by.",
    },
    {
      type: "p",
      text: "Anything that does not do one of those three is decoration. And decoration in motion costs more than decoration in colour, because it eats time the user never agreed to spend.",
    },
    {
      type: "chart",
      unit: "ms",
      data: [
        { label: "Micro feedback (press, toggle)", value: 120, display: "100-150 ms", highlight: true },
        { label: "Element transition (card, row)", value: 260, display: "200-300 ms" },
        { label: "View / route change", value: 420, display: "350-500 ms" },
        { label: "Anything over", value: 600, display: "600 ms+ = friction" },
      ],
      caption:
        "The time budgets I work to, by feel. Springs will not hit these exactly. The point is to tune stiffness and damping until the settle lands in the band.",
      source: "Kousik Dutta, working notes",
    },
    { type: "h2", text: "Reduced motion is not an edge case" },
    {
      type: "p",
      text: "Somewhere between a third and a half of adults feel some motion sensitivity. For some people, a big sliding, layered transition is not just annoying. It brings on nausea that lasts hours. The prefers-reduced-motion setting, which lets people ask for less movement, is not a checkbox you add at the end. It is a second version of your motion, designed just as carefully.",
    },
    {
      type: "p",
      text: "Reduced motion does not mean no motion. It means no big movement across the screen, no layered scrolling, no growing from nothing. Fades and colour changes are usually fine and still carry the signal. Stripping out all motion leaves those users with an interface that never confirms anything, which is its own kind of failure.",
    },
    {
      type: "code",
      language: "css",
      text: `@media (prefers-reduced-motion: reduce) {
  /* Keep the signal, remove the travel. */
  * {
    animation-duration: 1ms !important;
    transition-duration: 1ms !important;
  }
  .reveal { opacity: 1; transform: none; }
  .crossfade { transition: opacity 120ms linear !important; }
}`,
    },
    {
      type: "p",
      text: "One more failure ships all the time: reveal-on-scroll animations that hide content behind a class toggle. Transitions do not fire on background tabs or in headless renderers. So the section shows up permanently invisible to a crawler, a screenshot tool, or anyone whose JavaScript failed. Start from a visible state and animate from there. Enhance, never gate.",
    },
    {
      type: "takeaway",
      text: "Give your interface weight. Use springs so gestures carry through. Tie every animation to one of the three jobs: where it came from, confirming input, guiding the eye. And design the reduced-motion version as a real thing, not an absence.",
    },
  ],
  references: [
    {
      label: "Designing Interface Animation",
      detail: "Val Head, Rosenfeld Media, 2016",
      href: "https://valhead.com/",
    },
    {
      label: "prefers-reduced-motion",
      detail: "MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
    },
    {
      label: "Motion: Apple Human Interface Guidelines",
      detail: "Apple",
      href: "https://developer.apple.com/design/human-interface-guidelines/motion",
    },
    {
      label: "Understanding Success Criterion 2.3.3: Animation from Interactions",
      detail: "W3C WCAG 2.2",
      href: "https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html",
    },
    {
      label: "Great Animations",
      detail: "Emil Kowalski, on what makes UI animation feel right",
      href: "https://emilkowal.ski/ui/great-animations",
    },
    {
      label: "Invisible Details of Interaction Design",
      detail: "Rauno Freiberg",
      href: "https://rauno.me/craft/interaction-design",
    },
  ],
}
