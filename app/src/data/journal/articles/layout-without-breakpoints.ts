import type { Article } from "../types"

export const layout: Article = {
  id: "layout-without-breakpoints",
  title: "The End of Breakpoint Driven Layout",
  subtitle: "Container queries, intrinsic sizing, and why the viewport was always the wrong question",
  readTime: "9 min read",
  excerpt:
    "A breakpoint encodes a guess about which devices exist. A container query encodes a fact about how much space a component actually has. Once you can ask the second question, most of your media queries turn out to be answering the wrong one.",
  tags: ["Layout", "CSS", "Responsive"],
  content: [
    {
      type: "lede",
      text: "For fifteen years we built responsive layouts by guessing at screen sizes. A breakpoint at 768 pixels was a bet that tablets live there. Container queries end the guessing. A component can now ask how much room it has been given and lay itself out from the answer, which is the question we always meant to ask.",
    },
    {
      type: "figure",
      src: "/assets/journal/tatami.webp",
      alt: "A traditional Japanese room floored with tatami mats laid edge to edge in a regular grid.",
      caption: "This room is measured in mats, not centimetres, so a space is described as six mats and the module comes first. The content defines the size of the room instead of the room imposing a size on the content. That is intrinsic sizing: let the component state how much room it needs, rather than making it fit whatever width you guessed at.",
      credit: "Asturio Cantabrio, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Miyota_Town_Library_tatami_room_ac.jpg",
      licence: "CC BY-SA 4.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/4.0",
      width: 1200,
      height: 900,
    },
    {
      type: "p",
      text: "I have shipped a lot of media queries I am not proud of. A card that looked right in the main column would break in the sidebar, so I would add a breakpoint, then another for the narrow variant, then a special case for when the same card appeared in a modal. The card had one job: adapt to its space. I was making it adapt to the whole window instead, and the window is almost never the thing that changed.",
    },
    { type: "h2", text: "A breakpoint is a guess, a container query is a fact" },
    {
      type: "p",
      text: "A media query asks about the viewport, the full browser window. That is a strange thing for a component to care about. A product card does not live in the window. It lives in a column, or a grid cell, or a drawer, and what it needs to know is how wide that slot is. A 320 pixel card is cramped whether the window around it is a phone or a wide desktop with three columns. The viewport cannot tell you that. The container can.",
    },
    {
      type: "p",
      text: "Container queries flip the question. You mark an element as a container, then write rules that respond to that container's size with the at container rule. The component stops depending on the device and starts depending on its actual slot. Move it from the main column to a narrow sidebar and it reflows on its own, with no new breakpoint and no knowledge of where it was placed. Ownership moves to where it belongs: the component owns its own layout.",
    },
    {
      type: "p",
      text: "This changes how a team divides work, not just how a stylesheet reads. When layout lived in viewport media queries, someone had to hold the whole page in their head to know how a card would behave in each spot. That knowledge sat in a global stylesheet that every placement depended on, and it broke quietly whenever a component moved. Container queries let a component ship with its own responsive rules attached, so the person building the card owns its behaviour everywhere, and the person assembling the page just hands out space. The boundary between the two jobs finally matches the boundary between the two files.",
    },
    {
      type: "compare",
      left: {
        title: "Media query, viewport driven",
        items: [
          "Component asks about the whole window",
          "Same card needs different rules per placement",
          "Parent has to know where each child sits",
          "A card in a sidebar breaks the desktop layout",
          "Breakpoints multiply as placements multiply",
        ],
      },
      right: {
        title: "Container query, space driven",
        items: [
          "Component asks about its own slot",
          "One set of rules works in any placement",
          "Parent just gives space, child decides",
          "The same card adapts in column, sidebar, modal",
          "Rules stay constant as you reuse the component",
        ],
      },
      caption:
        "The viewport was a proxy for the thing we actually cared about. Container queries let the component read that thing directly.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  P["Parent grid<br/>gives a slot"] --> C["Card is a container"]
  C --> Q{"How wide<br/>is my slot?"}
  Q -->|"under 400px"| N["Stack: image over text"]
  Q -->|"400px and up"| W["Row: image beside text"]
  N --> R["Same component,<br/>no media query"]
  W --> R`,
      caption:
        "The card decides its own layout from the space it is handed. The parent never dictates the internal arrangement, so the card is safe to drop anywhere.",
    },
    {
      type: "code",
      language: "css",
      caption:
        "The card reads its own width, not the window's. Drop this card in a wide column and it goes horizontal; drop it in a narrow rail and it stacks. Nothing outside the card changes.",
      text: `.card-wrap { container-type: inline-size; }

.card { display: grid; gap: 1rem; }

@container (min-width: 400px) {
  .card { grid-template-columns: 8rem 1fr; }
}`,
    },
    { type: "h2", text: "Intrinsic sizing removes whole classes of query" },
    {
      type: "p",
      text: "The other half of the shift is letting the grid do the maths. CSS Grid can build a responsive column layout with no breakpoints at all, using one line. The pattern is repeat with auto-fit and a minmax track. It reads: make as many columns as fit, each at least 280 pixels wide and at most an equal share of the space. On a phone that is one column. On a wide screen it might be four. You never wrote a single media query, and there is no width where it breaks, because it was never tied to a width.",
    },
    {
      type: "code",
      language: "css",
      caption:
        "One declaration that replaces a stack of breakpoints. The grid fits as many 280 pixel columns as it can and shares the leftover space evenly.",
      text: `.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}`,
    },
    {
      type: "p",
      text: "There is a real trap in that line, and it is the choice between auto-fit and auto-fill. They look identical until the row is not full. With auto-fill, the grid keeps the empty column tracks it could not fill, so a single card sits at 280 pixels on the left with blank space beside it. With auto-fit, the empty tracks collapse, so that single card stretches to fill the whole row. Most of the time you want auto-fit, because a lonely narrow card next to a void looks like a bug. Knowing the difference is what separates a layout that feels intentional from one that feels accidental.",
    },
    {
      type: "p",
      text: "The 280 pixel floor in that minmax is doing quiet accessibility work too. Because it is a real minimum, the card never crushes below a width where its text stops being readable, no matter how narrow the screen gets. Compare that to a fixed four column grid, which keeps four columns on a phone and squeezes each card to a sliver. Intrinsic sizing means the layout degrades by dropping columns, not by shrinking content, which is almost always the behaviour a user actually wants. You set the smallest comfortable size once, and the grid respects it forever.",
    },
    {
      type: "table",
      head: ["Behaviour", "auto-fill", "auto-fit"],
      rows: [
        ["Empty tracks when row is not full", "Kept as empty columns", "Collapsed to zero"],
        ["A single item in a wide row", "Stays minimum width, gap beside it", "Stretches to fill the row"],
        ["When to reach for it", "You want a fixed column rhythm", "You want items to fill the space"],
        ["Most common UI choice", "Rare", "Usual default for cards"],
      ],
      caption:
        "Same syntax, one keyword apart, and the layouts diverge only when the row has spare room. auto-fit is the card grid default.",
      emphasiseColumn: 2,
    },
    {
      type: "callout",
      title: "Subgrid fixes the alignment container queries cannot",
      text: "Container queries make a card adapt, but they cannot align things across sibling cards. If each card holds a title, a body, and a footer of different lengths, the footers will not line up, because each card is its own little grid. Subgrid solves exactly this. The card opts into its parent's grid rows, so every title row, body row, and footer row shares one set of tracks and lines up across the whole set. It is the tool for cross card alignment, and nothing else did it cleanly before.",
    },
    { type: "h2", text: "Logical properties are not optional once you ship globally" },
    {
      type: "p",
      text: "Everything above assumes text flows left to right. The moment you ship in Arabic, Hebrew, or any right to left language, hard coded left and right values fight the content. margin-left pins a gap to the physical left even when the language runs the other way. Logical properties fix this by naming directions relative to the text flow instead of the screen. margin-inline-start is the start edge of the line, which is the left in English and the right in Arabic. The browser flips it for you.",
    },
    {
      type: "code",
      language: "css",
      caption:
        "The same rules, written logically. Switch the document to a right to left language and the spacing and alignment flip correctly with no extra CSS.",
      text: `.panel {
  margin-inline-start: 1rem;   /* not margin-left */
  padding-block: 0.75rem;      /* top and bottom */
  border-inline-start: 2px solid;
  text-align: start;           /* not left */
}`,
    },
    {
      type: "p",
      text: "This is the difference between a layout that internationalises with a language switch and one that needs a parallel stylesheet for right to left. Picture a form built with physical left and right values, then opened in Arabic: the labels align to the wrong edge, the icons sit on the wrong side, and the whole thing reads as translated by a machine that never looked at it. Logical properties are a small habit that saves a large rewrite. Start them on day one, because retrofitting them later touches every file.",
    },
    { type: "h2", text: "Layout thrash is the cost nobody budgets for" },
    {
      type: "p",
      text: "The last piece is performance, and it hides in animation. The browser paints in stages: it works out where everything goes, which is layout, then it draws the pixels, then it composites the layers together. Animating a property like width, height, top, or left forces the browser to redo the layout stage on every single frame, for that element and often everything around it. That is layout thrash, and on a busy page it drops frames and makes the whole interface feel cheap.",
    },
    {
      type: "p",
      text: "The fix is to animate only the two properties that skip layout entirely: transform and opacity. Sliding a panel with transform translateX moves it on the compositor without touching layout, so it stays smooth even under load. To move a card from one grid position to another, you do not animate its grid placement. You let it jump in the layout and use a transform to visually slide it from the old spot, a technique the FLIP approach formalised. The rule is short: animate transform and opacity, never width, height, or position.",
    },
    {
      type: "sourcecard",
      title: "Animations and Performance",
      publisher: "web.dev, Google",
      description:
        "Which CSS properties trigger layout, paint, or only compositing, and why animating transform and opacity keeps frames cheap.",
      href: "https://web.dev/articles/animations-guide",
    },
    { type: "h2", text: "Mobile first has outlived its slogan" },
    {
      type: "p",
      text: "Here is my argument against the common view. Mobile first was the right instinct for its decade. When it was coined, teams routinely built a desktop site and crammed it onto phones as an afterthought, and starting from the small screen forced you to prioritise content and performance. That part still holds. But as a layout instruction, min-width queries stacking upward, it assumed the viewport was the axis of adaptation. Container queries break that assumption. A component built to adapt to its slot is neither mobile first nor desktop first. It is space first.",
    },
    {
      type: "p",
      text: "I want to be fair to the counter argument, because it has a real point. Mobile first is still sound as a content and performance discipline. Loading the light, essential version first and enhancing upward is good on any axis, and it protects users on slow networks and weak devices. So I am not throwing the idea away. I am saying the layout half of the slogan has aged out. Keep mobile first for what you send and in what order. Drop it as the reason your columns stack, because the component can now decide that from its own space.",
    },
    {
      type: "p",
      text: "None of this means media queries are gone. They are still the right tool for decisions that genuinely belong to the whole page. A top navigation that becomes a menu button, a two column app shell that folds to one, a print stylesheet: these are page level shifts, and the viewport is the honest thing to ask. The change is one of default. I used to reach for a media query first and a component rule second. Now I reach for the container first and only escalate to the viewport when the decision truly spans the page. Most decisions do not, which is why most of my old breakpoints were noise.",
    },
    {
      type: "callout",
      title: "Prediction: container queries become the default unit of responsive design",
      text: "I could be wrong, but here is what the data points to. Container queries reached stable support across all major browsers in 2023, and the HTTP Archive Web Almanac has tracked their adoption climbing since it began measuring them. I think within a couple of years, new component libraries will default to container queries and treat media queries as the exception, reserved for true page level shifts like navigation. What would prove me wrong: if the Web Almanac shows container query usage stalling while media queries hold their share, it would mean teams found the mental model too fiddly, and the viewport stayed the unit people reason in.",
    },
    {
      type: "takeaway",
      text: "Stop asking the window how big it is. Make components containers that adapt to their own slot, let auto-fit grids replace stacks of breakpoints, write spacing in logical properties from day one, and animate only transform and opacity. Keep mobile first for content and performance. Retire it as a layout rule, because space, not screen size, was always the real question.",
    },
  ],
  references: [
    {
      label: "CSS container queries",
      detail: "MDN guide to container-type and the @container rule",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
    },
    {
      label: "Container queries land in stable browsers",
      detail: "web.dev on cross browser support and how @container works",
      href: "https://web.dev/blog/cq-stable",
    },
    {
      label: "Subgrid",
      detail: "MDN on opting a nested grid into its parent's tracks for cross card alignment",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid",
    },
    {
      label: "CSS logical properties and values",
      detail: "MDN on inline and block directions for right to left support",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values",
    },
    {
      label: "Auto-placement in CSS Grid",
      detail: "MDN on auto-fit versus auto-fill and minmax tracks",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Auto-placement_in_grid_layout",
    },
    {
      label: "Animations and Performance",
      detail: "web.dev on which properties trigger layout and how to avoid thrash",
      href: "https://web.dev/articles/animations-guide",
    },
    {
      label: "Can I use: CSS Container Queries",
      detail: "Live browser support data for container queries",
      href: "https://caniuse.com/css-container-queries",
    },
    {
      label: "Web Almanac: CSS",
      detail: "HTTP Archive data on real world CSS feature usage",
      href: "https://almanac.httparchive.org/en/2022/css",
    },
    {
      label: "CSS Grid Layout Module Level 2",
      detail: "W3C spec covering subgrid and intrinsic track sizing",
      href: "https://www.w3.org/TR/css-grid-2/",
    },
  ],
}
