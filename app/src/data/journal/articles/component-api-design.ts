import type { Article } from "../types"

export const componentApi: Article = {
  id: "component-api-design",
  title: "A Component's Props Are a User Interface",
  subtitle: "And the person using that interface is an engineer",
  readTime: "9 min read",
  excerpt:
    "Every prop you add is a decision you push onto every future caller. The best component APIs say no on purpose. Maximum flexibility is not a virtue; it is a component that teaches nothing and guarantees an inconsistent product.",
  tags: ["Components", "Design Systems", "API Design"],
  content: [
    {
      type: "lede",
      text: "A component is a promise made in public. Its props are the words of that promise, and the people reading them are engineers who will call your component a thousand times without ever reading its source. So a prop is not a convenience you offer. It is a decision you push onto every future caller, forever. The hard part of building a component library is not the CSS. It is deciding what the component will refuse to do.",
    },
    {
      type: "figure",
      src: "/assets/journal/thread-gauge.webp",
      alt: "A thread pitch gauge fanned open, its leaves cut to check Whitworth and metric screw threads.",
      caption:
        "In 1841 Joseph Whitworth proposed a standard screw thread because until then every workshop cut its own, and a bolt from one shop would not fit a nut from another. A gauge like this exists to check a part against the agreed interface. A component's props are that interface: get them right and anything fits, get them wrong and every team ends up cutting its own thread.",
      credit: "Cccefalon, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Thread_pitch_gauge_Whitworth_and_metric.jpg",
      licence: "CC BY-SA 3.0",
      licenceHref: "https://creativecommons.org/licenses/by-sa/3.0",
      width: 1200,
      height: 413,
    },
    {
      type: "p",
      text: "I have shipped components I was proud of that turned out to be quietly terrible, because they were too helpful. They accepted anything. They had a prop for every request that ever landed in the queue. And the product built from them looked like six different teams had never met, because that is exactly what happened. Every prop I added was permission to be inconsistent, and people took the permission.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  A["You add one prop"] --> B["Every caller<br/>must now choose"]
  B --> C["More combinations<br/>to test"]
  B --> D["More ways<br/>to look wrong"]
  C --> E["Slower change<br/>later"]
  D --> E`,
      caption:
        "A prop is not free. It is a cost paid by everyone who calls the component, and by everyone who has to change it next year. Think about who pays before you add one.",
    },
    { type: "h2", text: "The boolean trap" },
    {
      type: "p",
      text: "Here is the most common way a component API rots. You start with a button. Someone needs a prominent one, so you add isPrimary. Then a big one, so you add isLarge. Then a destructive one, so you add isDanger. Each looks reasonable on its own. Together they are a trap. Three booleans give you eight combinations, and most of them are nonsense. What is a large primary danger button that is also disabled and loading? Nobody decided. The type system happily allows it, so someone will ship it.",
    },
    {
      type: "compare",
      left: {
        title: "Booleans that fight each other",
        items: [
          "isPrimary, isSecondary, isDanger as separate flags",
          "Eight states from three booleans, most invalid",
          "isPrimary and isDanger both true: undefined",
          "Every caller can invent a new look",
          "The valid set lives only in your head",
        ],
      },
      right: {
        title: "One union that names the choices",
        items: [
          "variant: primary, secondary, danger",
          "Three states, all of them real",
          "Contradictions cannot be typed at all",
          "Callers pick from a menu you wrote",
          "The valid set is the type itself",
        ],
      },
      caption:
        "The fix is not more validation. It is a shape where the wrong thing cannot be expressed. A union is a closed menu; booleans are an open bar.",
    },
    {
      type: "p",
      text: "This is the boolean trap, and the cure is a union. Replace the pile of flags with a single variant prop whose type lists the only looks you support. Now a contradiction is not a bug you catch at review. It is a state that cannot be written down. The compiler refuses it before the code runs. That shift, from checking for bad states to making them unrepresentable, is the single highest-leverage move in component API design.",
    },
    {
      type: "code",
      language: "typescript",
      caption:
        "The union on the right is doing real work. It is not shorter for its own sake. It deletes a whole class of invalid buttons that the boolean version quietly allowed.",
      text: `// The trap: three booleans, eight combinations, most invalid
type ButtonProps = {
  isPrimary?: boolean
  isSecondary?: boolean
  isDanger?: boolean
  isLarge?: boolean
}

// The fix: closed sets. Contradictions cannot be typed.
type ButtonProps2 = {
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
}`,
    },
    {
      type: "p",
      text: "Real design systems make this exact choice. Shopify Polaris gives its button a tone and a variant, not a drawer of booleans. Atlassian does the same with an appearance prop. The reason is not taste. It is that a named set of variants is the contract. It tells the caller what the system supports, and just as loudly, what it does not. A boolean tells the caller nothing except that you ran out of names.",
    },
    { type: "h2", text: "When one prop cannot hold the behaviour" },
    {
      type: "p",
      text: "Some components are simple enough that props are the whole story. A button is close. But watch what happens to a Select. It starts innocent: an options array, a value, an onChange. Then the requests arrive. Some options need icons. Some need to be grouped under headings. Some are disabled. One team wants a divider. Another wants a custom row with a description under the label. Your options prop grows a type so baroque that nobody can read it, and every new request means editing the component itself.",
    },
    {
      type: "p",
      text: "This is the signal to stop passing data and start passing structure. Instead of describing every option as an object in an array, you let the caller compose the pieces. Select becomes a small family: Select, Select.Trigger, Select.Option, Select.Group. The behaviour, which key opens the list, how focus moves, how typeahead works, lives in the parent and is shared through context. The appearance of a single row lives where the caller writes it. This is the compound component pattern, and Radix, React Aria and Headless UI all ship their menus and selects this way.",
    },
    {
      type: "code",
      language: "tsx",
      caption:
        "The options array cannot express an icon, a description and a divider without growing a config language. Composition just lets the caller write markup. The behaviour is still owned by the parent.",
      text: `// Config prop: every new need edits the component
<Select options={[
  { label: "Draft", value: "draft" },
  { label: "Published", value: "pub", icon: "check" },
]} />

// Compound: the caller composes, the parent owns behaviour
<Select value={status} onValueChange={setStatus}>
  <Select.Trigger />
  <Select.Group label="States">
    <Select.Option value="draft">Draft</Select.Option>
    <Select.Option value="pub">
      <Check /> Published <Hint>visible to all</Hint>
    </Select.Option>
  </Select.Group>
</Select>`,
    },
    {
      type: "p",
      text: "The trade is real, so name it. Compound components are more to learn than one array prop. The caller has to know the pieces fit together, and a bad composition can be assembled that a single prop would have prevented. The gain is that the component stops being a bottleneck. New requests become new arrangements of existing parts, not new props on a struct that only you can safely change. The rule I use: reach for compound components the moment the behaviour outgrows the data, not before.",
    },
    { type: "h2", text: "Headless, and what you give up for it" },
    {
      type: "p",
      text: "There is a pattern one level further out. Ship the behaviour and the accessibility with no appearance at all. This is the headless component: a hook or an unstyled primitive that manages state, keyboard interaction, focus and ARIA, and hands you the wiring to attach your own markup. React Aria from Adobe, Radix Primitives and Headless UI are the well known examples. You get a combobox that follows the WAI-ARIA authoring practices out of the box, and you paint it however your brand demands.",
    },
    {
      type: "p",
      text: "I reach for headless when two things are true at once: the behaviour is genuinely hard to get right, and the appearance genuinely varies. An accessible combobox, a modal that traps focus correctly, a date picker that handles time zones and locales. Getting the accessibility right is months of work and a specialist's knowledge. Getting the look right is a Tuesday. Headless splits the two so you buy the hard part and keep control of the easy part.",
    },
    {
      type: "table",
      head: ["Approach", "You control", "You inherit", "Real cost"],
      rows: [
        [
          "Styled library component",
          "Almost nothing visual",
          "Look and behaviour",
          "Fights your brand; overrides pile up",
        ],
        [
          "Headless primitive",
          "All of the appearance",
          "Behaviour and accessibility",
          "You must build and maintain the styling layer",
        ],
        [
          "Fully hand rolled",
          "Everything",
          "Nothing",
          "You will get the accessibility wrong",
        ],
      ],
      caption:
        "Headless is not free flexibility. You are taking on the entire styling layer as code you now own. That is a fair trade for a hard widget, and a waste for a button.",
      emphasiseColumn: 2,
    },
    {
      type: "p",
      text: "What you give up is worth saying plainly. A headless primitive hands you responsibility for every visual state, and there are more of them than you think: hover, focus visible, disabled, invalid, loading, selected, the reduced-motion version. A styled library gave you those for free. So headless is not the sophisticated default. It is the right call for a small number of hard components and the wrong call for the fifty simple ones, where a styled, opinionated component is what keeps the product consistent.",
    },
    { type: "h2", text: "Controlled, uncontrolled, and the className fight" },
    {
      type: "p",
      text: "Two smaller decisions carry more weight than they look. The first is controlled versus uncontrolled. A controlled input takes its value as a prop and reports every change to the parent. An uncontrolled one keeps its own value inside and only tells you when you ask. Callers want both. They want to drop in a search box with zero wiring, and they want to fully drive a form field from outside. Supporting both in one component is harder than it looks, because you have to detect which mode you are in and never mix them.",
    },
    {
      type: "table",
      head: ["", "Uncontrolled", "Controlled"],
      rows: [
        ["Who owns the value", "The component, internally", "The parent, via a prop"],
        ["Setup cost for the caller", "Almost none", "Wire value and onChange"],
        ["Good for", "Simple forms, quick drop-in", "Validation, linked fields, undo"],
        ["The trap", "Parent cannot read or reset it", "Forget onChange and it looks frozen"],
      ],
      caption:
        "React's own guidance is to pick one mode per instance and stick to it. A field that silently switches modes mid-life is the source of the most confusing bugs I have debugged.",
      emphasiseColumn: 2,
    },
    {
      type: "p",
      text: "The second small decision starts fights: should your component forward className and style to its root node? Blocking it feels principled. You are protecting the design system from arbitrary overrides. But watch what teams actually do when you block it. They do not accept your constraint. They copy your component into their own folder, tweak the one thing they needed, and now you have a fork you do not control and cannot update. The escape hatch you refused to build got built anyway, worse, and out of your sight.",
    },
    {
      type: "callout",
      title: "An escape hatch prevents a fork",
      text: "The teams that block className to enforce purity end up with the least consistent codebases, because the pressure does not disappear. It routes around you. A narrow, honest escape hatch, a className passthrough, a small set of style slots, a children slot, keeps that pressure inside the system where you can see it, measure it, and later fold the common overrides back into real props.",
    },
    {
      type: "p",
      text: "So I lean toward passing className through and offering children as an escape hatch, then watching what people reach for. An override that shows up in twenty places is not a violation. It is a feature request the system has not answered yet. The passthrough is how you find out. The alternative, a locked component, does not stop the override. It just hides it in a fork where you will never learn from it.",
    },
    { type: "h2", text: "Against maximum flexibility" },
    {
      type: "p",
      text: "The common instinct is that a good component is a flexible one. Add the prop. Support the case. Say yes. I used to believe this, and it produced the worst systems I have worked in. A component that can do anything teaches nothing. Faced with forty props, two engineers will make two different buttons, both technically valid, and the product will show it. Flexibility does not create consistency. It defers every decision to the least informed moment, which is a caller under deadline who just wants the thing to render.",
    },
    {
      type: "quote",
      text: "Simple things should be simple, complex things should be possible.",
      author: "Alan Kay",
      source: "on system design",
    },
    {
      type: "p",
      text: "Kay's line is the whole target. The default path should be short and hard to get wrong, and the hard cases should be reachable through a clearly marked door, not through forty knobs on the front. A component with forty props has failed at both. The simple thing is not simple, because you must first understand forty options to know which four you need. And the complex thing is not really possible either, because prop number forty-one is always missing. When I see a component with forty props, I no longer read it as powerful. I read it as two components that were never separated, an honest split waiting to happen.",
    },
    {
      type: "p",
      text: "The split is usually obvious once you look. A Table with forty props is a simple Table plus a DataGrid, and pretending they are one component makes both worse. The simple case pays for the complex one on every line of every caller. Cutting them apart lets the Table stay a five-prop component that a newcomer understands in a minute, while the DataGrid carries the weight for the teams that truly need it. Two clear components beat one that does everything, every single time.",
    },
    {
      type: "p",
      text: "None of this is static. Props accumulate, needs change, and a component you got right in year one is wrong by year three. So the last piece of API design is how you change it without breaking every caller. Treat a public component like a public API, because that is what it is. Deprecate a prop before you delete it, keep the old behaviour working for a release, and ship a codemod, a small script that rewrites callers automatically, so upgrading is a command and not a migration project. A breaking change without a codemod is a tax you levy on every team downstream.",
    },
    {
      type: "callout",
      title: "Prediction: the prop count on good components will fall, not rise",
      text: "I could be wrong, but here is what the trend points to. As code-writing models generate more component calls, the components that stay usable will be the ones with small, closed, well named APIs, because a tight variant union is a far better prompt than forty loosely typed booleans. My anchor is the direction Radix, React Aria and Polaris already moved: toward unions, composition and headless behaviour, and away from flag soup. What would prove me wrong is the next generation of widely adopted libraries shipping ever wider prop lists and winning adoption anyway. If broad flag-heavy APIs become the ones engineers reach for, this call is wrong.",
    },
    {
      type: "takeaway",
      text: "Design a component's props the way you would design any interface for a demanding user, because that user is an engineer under deadline. Prefer a closed union to a pile of booleans. Reach for composition when behaviour outgrows data, and headless only when the behaviour is hard and the look must vary. Offer an escape hatch so nobody has to fork you. And when a component reaches forty props, do not add the forty first. Split it in two.",
    },
  ],
  references: [
    {
      label: "Radix Primitives: Introduction",
      detail: "Unstyled, accessible components built around composition and compound parts",
      href: "https://www.radix-ui.com/primitives/docs/overview/introduction",
    },
    {
      label: "Radix Primitives: Select",
      detail: "A real compound component API, Select with Trigger, Group and Item parts",
      href: "https://www.radix-ui.com/primitives/docs/components/select",
    },
    {
      label: "React Aria",
      detail: "Adobe's headless hooks that supply behaviour and accessibility with no styling",
      href: "https://react-aria.adobe.com/",
    },
    {
      label: "Passing Props to a Component",
      detail: "React docs on composition and using children as an escape hatch",
      href: "https://react.dev/learn/passing-props-to-a-component",
    },
    {
      label: "input: controlling an input with a state variable",
      detail: "React docs on controlled versus uncontrolled inputs",
      href: "https://react.dev/reference/react-dom/components/input",
    },
    {
      label: "Headless UI",
      detail: "Unstyled, accessible primitives from the Tailwind team",
      href: "https://headlessui.com/",
    },
    {
      label: "Polaris: Button",
      detail: "Shopify's system uses variant and tone, not a drawer of booleans",
      href: "https://polaris.shopify.com/components",
    },
    {
      label: "Atlassian Design System",
      detail: "Component API guidance using appearance props over flags",
      href: "https://atlassian.design/",
    },
  ],
}
