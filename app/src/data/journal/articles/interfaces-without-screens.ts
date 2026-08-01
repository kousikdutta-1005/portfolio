import type { Article } from "../types"

export const multimodal: Article = {
  id: "interfaces-without-screens",
  title: "Interfaces Without Screens",
  subtitle: "Designing for voice, camera and ambient input, where the screen rules stop applying",
  readTime: "10 min read",
  excerpt:
    "A screen shows you your options. Speech does not. That single difference breaks most of what visual interface design taught us, and it makes discoverability, not layout, the hard problem of screenless design.",
  tags: ["Voice UI", "Multimodal", "Accessibility"],
  content: [
    {
      type: "lede",
      text: "Most of what you know about interface design assumes a screen, and a screen quietly does two jobs at once. It presents your options and it records what you did. Take the screen away and both jobs vanish. Speech shows you nothing, so you have to already know what to say. That is why voice design is not visual design with the pixels removed. It is a different problem that starts from a blank, silent room.",
    },
    {
      type: "figure",
      src: "/assets/journal/switchboard.jpg",
      alt: "Rows of telephone operators seated at a manual switchboard in 1907, connecting calls by hand.",
      caption:
        "For decades, using a telephone meant talking to a person who did the finding for you. There was no menu and nothing to look at, so the whole interface was the conversation and whatever the operator happened to know. Every hard problem in voice design, discoverability most of all, was already sitting here, and we solved it then by putting a human in the middle to do the work.",
      credit: "The Salt Lake Herald, via Wikimedia Commons",
      creditHref: "https://commons.wikimedia.org/wiki/File:Telephone_switchboard_6_Oct_1907_Salt_Lake_City.jpg",
      licence: "Public domain",
      width: 1200,
      height: 935,
    },
    {
      type: "p",
      text: "I want to be honest up front about what shipped. The smart speaker wave promised a natural assistant in every home and delivered a kitchen timer that also plays music. That gap is worth understanding, because the reasons it failed are lessons about modality, not about one company's product. The interesting question is what a screenless interface can and cannot do, and the answers are sharper than the marketing ever was.",
    },
    {
      type: "p",
      text: "The usual explanation is that the technology was not ready, and that is only half true. Recognition worked well enough for millions of daily commands. What did not work was the interaction model. People could not discover what to say, could not tell when the device was listening, could not recover from a mishearing, and got a slow spoken answer when they wanted a quick glance. Those are not accuracy problems. They are design problems, and they are the spine of this article.",
    },
    { type: "h2", text: "A screen shows options, speech does not" },
    {
      type: "p",
      text: "A button is an affordance: its shape tells you it can be pressed. A menu lists what is possible so you never have to remember it. This is recognition over recall, one of the oldest findings in the field, and screens lean on it completely. Speech throws it away. A voice assistant is a doorway with no sign. It can do a thousand things and looks exactly like it can do nothing. Discoverability, not layout, becomes the central problem.",
    },
    {
      type: "compare",
      left: {
        title: "What a screen gives you",
        items: [
          "Options are visible, so you recognise them",
          "State is persistent, you can look back",
          "Errors are visible and usually undoable",
          "Scanning is fast, your eye jumps around",
          "The interface teaches itself by its shape",
        ],
      },
      right: {
        title: "What voice takes away",
        items: [
          "Nothing is shown, so you must recall it",
          "State is gone the moment it is spoken",
          "A misheard word has no visible undo",
          "Output is linear, you wait for every word",
          "You have to be told what it can do",
        ],
      },
      caption:
        "Voice does not remove the chrome and keep the interface. It removes the two things a screen was quietly doing: presenting options and holding state.",
    },
    {
      type: "p",
      text: "This is why good voice design spends so much effort on prompts that hint at what to say next. Google's conversation design guidance is built around the idea that the system must offer a path, because the user has no menu to fall back on. The prompt is the menu now. Write it badly and the user stands in a silent room guessing.",
    },
    {
      type: "sourcecard",
      title: "What is conversation design?",
      publisher: "Google",
      description: "Design guidance built on the fact that a voice user has no visible menu, so the prompt has to carry discoverability.",
      href: "https://developers.google.com/assistant/conversation-design/what-is-conversation-design",
    },
    { type: "h2", text: "The speed asymmetry that decides everything" },
    {
      type: "p",
      text: "There is a physical fact under all of this. People speak much faster than they type, and read much faster than they listen. Speaking is a great way to get an idea into a machine. Listening is a slow, single file way to get an idea back out. So voice is a strong input and a weak output, and it is weakest exactly when the answer is a list.",
    },
    {
      type: "chart",
      unit: "wpm",
      data: [
        { label: "Reading (eye, silent)", value: 250, display: "~250 wpm" },
        { label: "Speaking (voice input)", value: 150, display: "~150 wpm" },
        { label: "Listening (voice output)", value: 150, display: "~150 wpm, but linear" },
        { label: "Typing (keyboard input)", value: 40, display: "~40 wpm", highlight: true },
      ],
      caption:
        "Approximate rates from published typing and reading ranges. Speaking beats typing as input by a wide margin. Listening loses to reading as output, and unlike reading it cannot skim.",
      source: "Kousik Dutta, from published typing and reading rate ranges",
    },
    {
      type: "p",
      text: "Picture asking for the ten nearest restaurants. On a screen your eye takes the list in seconds and jumps to the one you want. By voice the machine has to read all ten, in order, and you have to hold them in your head. By item four you have forgotten item one. The design rule falls straight out of the asymmetry: never make voice read a list the user is meant to choose from. Let them speak the request, then answer with one thing, or hand the list to a screen if one is present.",
    },
    {
      type: "p",
      text: "The same asymmetry explains why voice shines at capture and struggles at browse. Dictating a text, adding an item to a list, setting a reminder, asking a single factual question, these are input heavy and output light, and voice is excellent at them. Comparing options, scanning a feed, editing a document, these are output heavy, and voice is miserable at them. When I sketch a voice feature now, my first question is the ratio: how much does the user have to say versus how much do they have to take in. A high say to hear ratio is where voice wins.",
    },
    { type: "h2", text: "Error recovery with no visible undo" },
    {
      type: "p",
      text: "On a screen a wrong click leaves a mark you can see and reverse. In voice a misrecognition is invisible. The system heard something, acted, and there is no highlighted field to point at and fix. Say Boston and get Austin, and the only repair channel is more talking, which is the same channel that just failed. This is the part of voice that feels most broken in daily use, and it is structural, not a bug.",
    },
    {
      type: "callout",
      title: "Design the misunderstanding, not just the happy path",
      text: "Assume the system will mishear, and design the recovery as a first class flow. Confirm before anything costly or irreversible. Prefer implicit confirmation, repeating back what it understood inside the next reply, over a robotic did you say. Keep a spoken undo, cancel that, always live. The measure of a voice interface is not how it behaves when it hears you. It is how gracefully it fails when it does not.",
    },
    { type: "h2", text: "Multimodal beats any single channel" },
    {
      type: "p",
      text: "The strongest screenless interfaces are rarely voice only. They combine channels, and the combination covers each channel's weakness. The classic demonstration is old. In 1980, Richard Bolt's Put That There at MIT let someone point at a wall sized display and say put that there, using speech for the verb and a gesture for the two nouns. Speech is bad at precise location. A finger is bad at naming an action. Together they are fluent, the way you already talk while pointing across a room.",
    },
    {
      type: "diagram",
      chart: `flowchart LR
  S["Speech: 'put that there'"] --> F["Fusion"]
  P["Point: which object"] --> F
  G["Gaze / camera: where"] --> F
  F --> A["Resolved action:<br/>move object to target"]`,
      caption:
        "Multimodal fusion: speech carries the verb, a point or gaze carries the nouns. Each channel supplies what the other cannot, which is why the pair feels natural.",
    },
    {
      type: "p",
      text: "That demonstration is more than forty years old, which tells you the idea is not new and the shipping products are the laggards. The original paper is still the clearest statement of why two channels beat one.",
    },
    {
      type: "sourcecard",
      title: "Put-That-There (SIGGRAPH 1980)",
      publisher: "MIT / Richard A. Bolt",
      description: "The original paper on combining speech and pointing gesture, still the clearest case for multimodal over any single channel.",
      href: "https://www.media.mit.edu/speech/papers/1980/bolt_SIGGRAPH80_put-that-there.pdf",
    },
    {
      type: "p",
      text: "The lesson for today is to stop asking which modality and start asking which channel for which part. A phone that lets you speak a search while your thumb narrows a filter is multimodal. So is a camera app that recognises a plant and lets you ask a follow up out loud. The channels should divide the labour along their strengths: voice for intent, screen for choosing, camera for what is in front of you.",
    },
    { type: "h2", text: "Latency and privacy are social, not technical" },
    {
      type: "p",
      text: "A spinner on a screen is a neutral please wait. A pause in speech is not neutral. Silence in conversation carries meaning, we read it as thinking, or trouble, or that it did not hear us. So the latency budget for voice is set by social expectation, not by the network. Past roughly a second of silence, people repeat themselves and step on the reply. A voice interface has to fill that gap, with a token acknowledgement, long before a screen would need to.",
    },
    {
      type: "table",
      head: ["Concern", "On a screen", "In voice and ambient"],
      rows: [
        ["Waiting", "A spinner reads as neutral", "Silence reads as ignored or broken"],
        ["Privacy", "A phone is held, personal, private", "A room mic is shared and overheard"],
        ["Errors", "Visible, pointable, undoable", "Invisible, repair only by talking again"],
        ["Output shape", "Lists scanned in seconds", "Lists read one slow item at a time"],
      ],
      emphasiseColumn: 2,
      caption:
        "The same design concerns, reframed for a channel with no screen. Each row is a place where screen intuition quietly leads you wrong.",
    },
    {
      type: "p",
      text: "Privacy shifts too, because the device changes shape. A phone in your pocket is a private object. A microphone in a room is a social one. It hears whoever is present, including people who never chose to use it, and that changes what the interface is allowed to do out loud. Reading a message aloud in a kitchen is not the same act as showing it on a screen only one person is holding. Screenless design has to reason about the room, not just the user.",
    },
    {
      type: "p",
      text: "This is why the light ring on a smart speaker matters more than it looks. With no screen, the only way to answer the most basic question, is it listening right now, is an ambient signal the whole room can read. A phone tells you it is recording by being in your hand and lit up. A speaker on a shelf has to earn that trust with a clear, honest indicator, and any ambiguity there reads as surveillance. In screenless design, feedback about the device's own state stops being a nicety and becomes the core of whether people trust it in their home.",
    },
    { type: "h2", text: "Who voice includes, and who it shuts out" },
    {
      type: "p",
      text: "Voice is transformative for some people and a wall for others, and both are true at once. For a user who cannot use a mouse or a keyboard, speech can be the difference between independence and none. For a user with a speech difference, a stammer, or an accent the system was not trained on, the same interface simply refuses to work. Accessibility here is not one slope. It is a door that is wide for some and shut for others.",
    },
    {
      type: "p",
      text: "This is not a soft claim, it is measured. Koenecke and colleagues tested five commercial speech recognisers from Amazon, Apple, Google, IBM and Microsoft and found a large racial gap in accuracy. The systems misread Black speakers far more often than white speakers saying the same words. When a whole design leans on recognition, an error gap like that is not a rough edge. It decides who the product works for.",
    },
    {
      type: "stats",
      items: [
        {
          value: "0.35",
          label: "Average word error rate for Black speakers, across five commercial ASR systems",
          source: "Koenecke et al., PNAS 2020",
        },
        {
          value: "0.19",
          label: "Average word error rate for white speakers, on the same audited systems",
          source: "Koenecke et al., PNAS 2020",
        },
        {
          value: "5",
          label: "Major systems audited: Amazon, Apple, Google, IBM, Microsoft",
          source: "Koenecke et al., PNAS 2020",
        },
      ],
      caption:
        "A near two to one gap in error rate between demographic groups. If your interface has no fallback for the people it mishears, this number is a design decision you made by omission.",
    },
    {
      type: "p",
      text: "This is peer reviewed work, not a blog claim, and it is worth reading in full before you make voice the only way in to anything.",
    },
    {
      type: "sourcecard",
      title: "Racial disparities in automated speech recognition",
      publisher: "PNAS (Koenecke et al., 2020)",
      description: "The peer reviewed study measuring word error rate gaps across demographic groups in five commercial speech recognition systems.",
      href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7149386/",
    },
    {
      type: "p",
      text: "The practical response is to never make voice the only door. Pair it with a screen or a touch path so a person the recogniser fails can still finish the task. W3C's accessibility guidance makes the same point from the other side: speech input and output help many people, and they must be alternatives, not the sole route. An interface that only listens has decided in advance who it is willing to serve.",
    },
    {
      type: "callout",
      title: "Prediction: grammar is gone, but the asymmetry is not",
      text: "I could be wrong, but here is what the data points to. Large language models removed the rigid command grammar that made old voice assistants brittle, so the input side of voice is about to feel far more natural. The output side will not follow. Listening is still slower than reading, and speech still cannot be skimmed. So I expect voice to win as an input layer, dictate, ask, command, on top of screens that stay the primary output, rather than the screenless assistant finally arriving. The anchor is the speed asymmetry: people read far faster than they can listen, and no model changes that. What would prove me wrong is a mainstream, screen free voice product that people choose for list shaped and comparison tasks, not just timers, reminders and single answers. If that ships and sticks, the asymmetry mattered less than I thought.",
    },
    {
      type: "p",
      text: "So the honest summary of the smart speaker era is not that voice failed. It is that voice was sold as an output medium, reading you lists and paragraphs, when its real strength was always input. The models arriving now fix the part voice was already good at. They do not repeal the physics of listening.",
    },
    {
      type: "takeaway",
      text: "Screenless design is not visual design minus the pixels. Speech shows no options, so discoverability is the hard problem. Speaking beats typing, but listening loses to reading, so use voice for input and a screen for lists. Design the misunderstanding, not just the happy path. Combine channels so each covers the other. And never make voice the only door, because the systems mishear some people far more than others.",
    },
  ],
  references: [
    {
      label: "Racial disparities in automated speech recognition",
      detail: "Koenecke et al., PNAS 2020, measured word error rate gaps across groups",
      href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7149386/",
    },
    {
      label: "Put-That-There (SIGGRAPH 1980)",
      detail: "Richard A. Bolt, MIT, the founding demonstration of multimodal input",
      href: "https://www.media.mit.edu/speech/papers/1980/bolt_SIGGRAPH80_put-that-there.pdf",
    },
    {
      label: "The User Experience of Intelligent Assistants",
      detail: "Nielsen Norman Group, usability research on voice assistants",
      href: "https://www.nngroup.com/articles/intelligent-assistant-usability/",
    },
    {
      label: "What is conversation design?",
      detail: "Google, guidance on carrying discoverability through prompts",
      href: "https://developers.google.com/assistant/conversation-design/what-is-conversation-design",
    },
    {
      label: "Siri: Apple Human Interface Guidelines",
      detail: "Apple, designing voice interactions and confirmation",
      href: "https://developer.apple.com/design/human-interface-guidelines/siri",
    },
    {
      label: "Web Accessibility Perspectives: Voice Recognition",
      detail: "W3C Web Accessibility Initiative, on speech as an alternative route",
      href: "https://www.w3.org/WAI/perspective-videos/voice/",
    },
    {
      label: "Alexa Design Guide: Get Started",
      detail: "Amazon, patterns and constraints for voice interface design",
      href: "https://developer.amazon.com/en-US/docs/alexa/alexa-design/get-started.html",
    },
    {
      label: "Multimodal interaction",
      detail: "Overview of combining speech, gesture and gaze as input channels",
      href: "https://en.wikipedia.org/wiki/Multimodal_interaction",
    },
  ],
}
