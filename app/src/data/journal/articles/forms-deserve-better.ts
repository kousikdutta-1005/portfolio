import type { Article } from "../types"

export const forms: Article = {
  id: "forms-deserve-better",
  title: "Forms Deserve Better",
  subtitle: "The surface where products make or lose money, and the least designed one",
  readTime: "10 min read",
  excerpt:
    "Every extra field costs completion, and you can measure it instead of arguing about it. Forms are where money changes hands, yet they get less design attention than a logo.",
  tags: ["Forms", "Conversion", "Accessibility"],
  content: [
    {
      type: "lede",
      text: "Forms are where a product actually makes or loses money. The checkout, the signup, the booking: that is the moment of truth, and it is the least designed surface in most software. We polish landing pages nobody converts on and ship a checkout held together with default browser styling. Every field you add costs you completions, and the good news is you can measure that cost instead of arguing about it.",
    },
    {
      type: "figure",
      src: "/assets/journal/keypunch.jpg",
      alt: "Two women in the 1950s working at keypunch machines, turning paper forms into punched cards one field at a time.",
      caption:
        "Before screens, filling in a form meant a person sitting at a machine and punching each field into a card, one at a time. Moving that work on-screen did not remove the labour, it only hid it and handed the bill to the customer. Every field you add is still someone's time, and now it is theirs.",
      credit: "Cushing Memorial Library and Archives, Texas A&M, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Keypunching_at_Texas_A%26M.jpg",
      licence: "CC BY 2.0",
      licenceHref: "https://creativecommons.org/licenses/by/2.0",
      width: 1200,
      height: 982,
    },
    { type: "h2", text: "The cost of a field is a real number" },
    {
      type: "p",
      text: "Start with the evidence, because forms are one of the few design problems with solid public data. Baymard Institute, which has run checkout usability studies for over a decade, finds the average online checkout asks for 11.3 form fields, and that most could be cut to around 8 without losing anything the business needs. Meanwhile the average documented cart abandonment rate sits above 70 percent. A share of that is people who were only browsing. A large share is friction, and a form is friction you built on purpose.",
    },
    {
      type: "stats",
      items: [
        {
          value: "11.3",
          label: "form fields in the average checkout, when about 8 would do",
          source: "Baymard Institute",
        },
        {
          value: "70.22%",
          label: "average documented online cart abandonment rate",
          source: "Baymard Institute",
        },
        {
          value: "18%",
          label: "of abandoners leave because the site forced them to create an account",
          source: "Baymard Institute",
        },
      ],
      caption:
        "Forms are not a matter of taste. These are measured losses, and each one traces back to a specific design decision.",
    },
    {
      type: "p",
      text: "That last number deserves its own sentence. Nearly one in five people who abandon do it because you demanded an account before they could pay. A guest checkout is not a nice-to-have. It is the removal of a wall you put between a paying customer and their own money. If you take one thing from this piece, let it be that a required account before a first purchase is the most expensive field on the form, and it is not even a field.",
    },
    {
      type: "p",
      text: "You do not have to take these averages on faith, because your own form is measurable. Instrument each field and watch where people stall, retype, or leave. A field with a high correction rate is confusing. A field where drop-off spikes is the one to question first. This turns form design from an argument about taste into a funnel you can read. The most expensive field is rarely the one people complain about. It is the one they silently abandon, and analytics is how you find it before it costs another quarter of revenue.",
    },
    { type: "h2", text: "The mechanics almost everyone skips" },
    {
      type: "p",
      text: "Most form pain is not strategy, it is plumbing that never got connected. The browser already knows the user's name, address, and card, and it will fill them in for free, but only if you label your fields in the language the browser speaks. That language is the autocomplete attribute, defined in the HTML standard, with specific tokens like given-name, family-name, email, and street-address. Get the token right and a ten-field form fills in one tap. Leave it off and you have asked a person to type their own address from memory on a phone.",
    },
    {
      type: "p",
      text: "The second piece of plumbing is inputmode, which tells a phone which keyboard to show. A field for a card number or a one-time code should bring up digits, not the full QWERTY keyboard, because hunting for numbers behind a letters layout is a small tax you charge on every entry. And associate every label with its input properly, so tapping the label focuses the field and a screen reader announces it. These are not enhancements. They are the difference between a form that respects the person and one that fights them.",
    },
    {
      type: "p",
      text: "Two more small things pay off far beyond their effort. Use the right input type, so type=email gives you validation and the correct keyboard, and type=tel does the same for phone numbers. And do not fight password managers: give fields stable names, let people paste, and never block paste in a password box, a habit that helps nobody and pushes people toward weaker passwords they can retype. The browser and its extensions are trying to fill your form correctly. Most form bugs are a site getting in their way.",
    },
    {
      type: "code",
      language: "html",
      caption:
        "The markup that unlocks browser autofill and the right mobile keyboard. The autocomplete tokens are the vocabulary the browser already understands.",
      text: `<label for="name">Full name</label>
<input id="name" name="name"
       autocomplete="name" />

<label for="email">Email</label>
<input id="email" name="email" type="email"
       autocomplete="email" inputmode="email" />

<label for="card">Card number</label>
<input id="card" name="card"
       autocomplete="cc-number" inputmode="numeric" />

<label for="otp">One-time code</label>
<input id="otp" name="otp"
       autocomplete="one-time-code" inputmode="numeric" />`,
    },
    {
      type: "p",
      text: "Then there is the placeholder used as a label, a pattern that looks clean and quietly fails everyone. The grey hint text vanishes the moment someone starts typing, so they lose the label exactly when they need it to check their work. It usually fails colour contrast, screen readers treat it inconsistently, and an empty field with only a placeholder gives assistive tech nothing to announce. A placeholder is a hint, at most. It is not a label, and using it as one is an accessibility failure, not a style choice.",
    },
    {
      type: "compare",
      left: {
        title: "The clean-looking form that hurts",
        items: [
          "Placeholder text stands in for the label",
          "No autocomplete tokens, no autofill",
          "Default keyboard for every field",
          "Errors turn the box red with no words",
          "Account required before you can pay",
        ],
      },
      right: {
        title: "The plain form that converts",
        items: [
          "A visible label above every field",
          "Correct autocomplete, fills in one tap",
          "inputmode picks the right keyboard",
          "Errors say what to do next, in text",
          "Guest checkout, account offered after",
        ],
      },
      caption:
        "The form on the right looks less minimal and works far better. Minimal and usable are not the same goal.",
    },
    { type: "h2", text: "Validate at the right moment, not on every keystroke" },
    {
      type: "p",
      text: "Inline validation, checking a field before the whole form is submitted, is good when it is timed well and maddening when it is not. Validate on every keystroke and you scream INVALID EMAIL at someone who has typed the letter a and is not finished. Wait until submit and you make them fix five things at once, after the fact. The timing that research supports is to validate a field when the person leaves it, on blur, once they have had their say. Then, if it becomes valid while they fix it, confirm that in real time.",
    },
    {
      type: "diagram",
      chart: `flowchart TB
  A["User types in a field"] --> B{"Still focused?"}
  B -->|"yes"| C["Stay quiet.<br/>No error mid-thought"]
  B -->|"left the field"| D{"Valid?"}
  D -->|"yes"| E["Quiet tick, move on"]
  D -->|"no"| F["Clear message:<br/>what to do next"]
  F --> G["Now reward fixes<br/>in real time"]`,
      caption:
        "Reward early, punish late. Errors appear when a person finishes a field, not while they are still mid-thought.",
    },
    {
      type: "p",
      text: "The words in the error matter as much as the timing. Invalid input tells the user they failed and leaves them stuck. Enter your date of birth as DD MM YYYY tells them exactly what to do next. An error message has one job: get the person unstuck in the smallest number of words. Put it next to the field, not in a summary at the top they have to scroll back to find, and never rely on colour alone, because red means nothing to someone who cannot see it or read it as red.",
    },
    {
      type: "p",
      text: "Two guardrails sit around all of this. First, client-side validation is a courtesy, never a security boundary, so validate again on the server, because anything the browser checks can be bypassed. Second, confirm success as clearly as you flag failure. A field that quietly goes valid, with a small tick or a colour that also carries a shape, tells the person they can move on and stops them second-guessing a box they already fixed. Silence after a correction reads as another error waiting to happen.",
    },
    { type: "h2", text: "Your form has assumptions, and they are wrong for most of the planet" },
    {
      type: "p",
      text: "Forms are full of quiet assumptions about names, addresses, and phone numbers, and almost all of them break outside a narrow slice of the world. Two boxes marked First name and Last name assume everyone has exactly two names in that order. Many people have one name, or three, or a family name written first. A required postcode assumes every country has one in your format. Phone fields that reject a plus sign or a leading zero assume everyone dials the way you do. These are not rare edge cases. They are the default state of a global user base.",
    },
    {
      type: "quote",
      text: "Anything someone tells you is their name is, by definition, an appropriate identifier for them.",
      author: "Patrick McKenzie",
      source: "Falsehoods Programmers Believe About Names, 2010",
    },
    {
      type: "p",
      text: "The safe defaults are humbler than the ones we usually ship. Prefer a single full name field over split first and last, unless you have a real downstream reason to separate them. Let names hold spaces, apostrophes, hyphens, and non-Latin characters, because O'Brien and a name in Tamil are both valid and both common. Make the parts of an address that vary by country actually vary. The GOV.UK Design System publishes patterns for names and addresses backed by real research, and they consistently land on asking for less and assuming less.",
    },
    {
      type: "p",
      text: "Email and phone hide the same trap. Treat email as case-insensitive and trim stray spaces, because Name@example.com and name@example.com reach the same inbox, and a person pasting from an address book should not be punished for a capital letter. Do not reject an address because your regular expression dislikes a plus sign or a newer domain ending, both of which are perfectly valid. If you genuinely need to know an address works, send a message to it. A rule that guesses at correctness rejects real customers while waving through typos that happen to match the pattern.",
    },
    {
      type: "table",
      head: ["Assumption in the code", "Who it breaks for", "Safer default"],
      rows: [
        ["First name and last name, two boxes", "Mononyms, three-part names, family-name-first cultures", "One full name field"],
        ["Postcode required, five digits", "Countries with other formats or none", "Optional, format by country"],
        ["Letters only in the name field", "O'Brien, non-Latin scripts, hyphenated names", "Allow full Unicode and punctuation"],
        ["Phone must be local format", "International customers, plus prefixes", "Accept and normalise on the server"],
      ],
      caption:
        "Each row is a decision that felt reasonable to a developer in one country and locks out real customers everywhere else.",
      emphasiseColumn: 2,
    },
    { type: "h2", text: "Fewer fields, or less effort?" },
    {
      type: "p",
      text: "Here is where I push back on the advice you have heard a hundred times. Reduce the number of fields is repeated as gospel, and it is not quite right. The honest version is reduce the perceived effort, which is related but not the same. A form can have fewer fields and still feel worse, if those fields are ambiguous, badly grouped, or ask for something people have to go and look up. Sometimes more fields, split into clear and obvious chunks, converts better than a short form that makes people stop and think.",
    },
    {
      type: "callout",
      title: "Reduce perceived effort, not just field count",
      text: "Splitting one confusing field into two obvious ones adds a field and removes friction. Cramming two questions into one box to hit a lower count adds friction and hides a field. Count is a proxy. Perceived effort is the thing. Optimise the thing, and use the count only as a rough check.",
    },
    {
      type: "p",
      text: "A one-column layout is the reliable default here. Multiple columns invite the eye to skip a field, and they read ambiguously: is the box on the right the next step, or a separate question? A single column gives one clear path from top to submit, which is also the order a keyboard and a screen reader will move through. Test the whole thing by tab key alone, no mouse, and again with a screen reader. If you cannot complete your own checkout that way, neither can a chunk of your customers, and they will not email to tell you why they left.",
    },
    {
      type: "p",
      text: "Splitting a long form across steps can lower perceived effort even when the field count is identical, because a short page feels finishable and a wall of inputs feels like a chore. The catch is that each step is another page to load and another chance to lose someone, so steps earn their place only when they group the work in a way that makes sense: address here, payment there. A progress indicator helps, but only if it is honest about how many steps remain. The goal is never fewer screens or fewer fields as a rule. It is the shortest felt distance from start to done.",
    },
    {
      type: "sourcecard",
      title: "The Current State of Checkout UX",
      publisher: "Baymard Institute",
      description:
        "The large-scale checkout usability research behind the field-count and abandonment figures in this piece, with tested recommendations.",
      href: "https://baymard.com/blog/current-state-of-checkout-ux",
    },
    {
      type: "p",
      text: "Read that research and a pattern jumps out. The teams that win at checkout are not the ones with the prettiest forms. They are the ones that removed a step, connected autofill, and stopped asking for things they did not need. None of that photographs well in a portfolio, which is part of why it stays undervalued while the logo gets another round of polish.",
    },
    {
      type: "callout",
      title: "Prediction",
      text: "I could be wrong, but here is what the data points to. Autofill already works when the autocomplete tokens are correct, and browsers keep getting better at reading forms. So I expect the next few years to reward forms that speak the browser's vocabulary and punish the ones that fight it, as more purchases happen on phones where typing is the whole cost. What would prove me wrong: conversion staying flat between forms with correct autocomplete tokens and forms without them. If autofill stops mattering to completion, I have overweighted the plumbing. I doubt it, because the typing tax is real and it is paid on mobile.",
    },
    {
      type: "takeaway",
      text: "Treat the form as the product, because at the moment of payment it is. Cut fields you cannot justify, and offer guest checkout before any account. Wire up autocomplete and inputmode so the browser does the typing. Validate on blur with messages that say what to do next. Drop the assumptions about names and addresses that break for most of the world. Then run the whole thing with a keyboard and a screen reader, because a form only counts if everyone can finish it.",
    },
  ],
  references: [
    {
      label: "Checkout Flows Average 11.3 Form Fields",
      detail: "Baymard Institute's finding that most checkouts ask for far more than they need.",
      href: "https://baymard.com/blog/checkout-flow-average-form-fields",
    },
    {
      label: "Cart Abandonment Rate Statistics",
      detail: "Baymard's aggregate abandonment rate and the reasons people leave, including forced account creation.",
      href: "https://baymard.com/lists/cart-abandonment-rate",
    },
    {
      label: "HTML Standard: Autofill",
      detail: "The WHATWG spec defining the autocomplete tokens browsers use to fill forms.",
      href: "https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill",
    },
    {
      label: "The autocomplete attribute",
      detail: "MDN's reference for the specific autocomplete values you put on each field.",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete",
    },
    {
      label: "The inputmode attribute",
      detail: "MDN on choosing the on-screen keyboard for a field on mobile.",
      href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode",
    },
    {
      label: "Creating Accessible Forms",
      detail: "WebAIM on label association, and why placeholders are not labels.",
      href: "https://webaim.org/techniques/forms/",
    },
    {
      label: "Error-Message Guidelines",
      detail: "Nielsen Norman Group on writing errors that tell people what to do next.",
      href: "https://www.nngroup.com/articles/errors-forms-design-guidelines/",
    },
    {
      label: "Inline Validation in Forms",
      detail: "Smashing Magazine on validating at the right moment, reward early and punish late.",
      href: "https://www.smashingmagazine.com/2022/09/inline-validation-web-forms-ux/",
    },
    {
      label: "GOV.UK Design System: Names",
      detail: "Research-backed guidance on asking for names without breaking for real people.",
      href: "https://design-system.service.gov.uk/patterns/names/",
    },
    {
      label: "Falsehoods Programmers Believe About Names",
      detail: "Patrick McKenzie's catalogue of the wrong assumptions baked into name fields.",
      href: "https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/",
    },
  ],
}
