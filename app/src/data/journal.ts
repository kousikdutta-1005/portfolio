export type BlockType = 'p' | 'h2' | 'quote' | 'ul';

export interface ArticleBlock {
  type: BlockType;
  text?: string;
  items?: string[];
  author?: string;
  source?: string;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content: ArticleBlock[];
}

export const JOURNAL_ARTICLES: Article[] = [
  {
    id: "architecture-of-uncertainty",
    title: "The Architecture of Uncertainty",
    date: "Aug 2026",
    readTime: "6 min read",
    excerpt: "Software used to be a contract. AI is a conversation. How we must shift from designing deterministic flows to probabilistic spaces.",
    tags: ["Artificial Intelligence", "UX Strategy", "Future"],
    content: [
      { type: 'p', text: 'For fifty years, software has been deterministic. A user presses a button, and the system executes a predefined rule. Today, generative AI shatters that contract. The system now responds with probability, not certainty. For product designers, this represents a foundational shift in how we build trust.' },
      { type: 'quote', text: 'A user interface is well-designed when the program behaves exactly how the user thought it would.', author: 'Joel Spolsky', source: 'Software Engineer & Writer' },
      { type: 'p', text: 'But how do we design for a system that hallucinates? As Jakob Nielsen points out in his recent updates on AI usability, the core heuristics of user control and error recovery have never been more critical. We can no longer rely on rigid step-by-step flows.' },
      { type: 'h2', text: 'Designing for the Ambient' },
      { type: 'p', text: 'Instead of traditional forms, we are moving toward what researcher Linus Lee calls "generative interfaces"—UI that invents itself on the fly. To design for this, we must build spaces that are highly forgiving.' },
      { type: 'ul', items: [
        'Visibility of system confidence: The UI must visually articulate when the AI is certain and when it is guessing.',
        'Steerability: Users must be able to course-correct the model mid-generation.',
        'Graceful degradation: When the output is wrong, the path to a manual override must be frictionless.'
      ]},
      { type: 'p', text: 'The designers who will lead the next decade are those who treat AI not as a feature, but as a fluid material. We must sculpt uncertainty into clarity.' }
    ]
  },
  {
    id: "roi-of-craft",
    title: "The Economics of Polish",
    date: "Jul 2026",
    readTime: "5 min read",
    excerpt: "Beauty is not superficial. It is a heuristic for safety. How aesthetic perfection directly drives enterprise revenue.",
    tags: ["Business", "Craft", "Leadership"],
    content: [
      { type: 'p', text: 'In the boardroom, design is often mistaken for decoration. The assumption is that engineering makes it work, and design makes it pretty. This is a fundamental misunderstanding of human psychology and market economics.' },
      { type: 'quote', text: 'The best design companies increase their revenues and shareholder returns at nearly twice the rate of their industry counterparts.', author: 'McKinsey & Company', source: 'The Business Value of Design' },
      { type: 'p', text: 'Why does a polished interface drive revenue? Because humans use aesthetics as a shortcut for assessing safety. When a button has the perfect weight, when an animation resolves with physics-based precision, the user subconsciously registers: "If they care this much about the micro-interactions, they must care deeply about my data."' },
      { type: 'h2', text: 'The Moat of Trust' },
      { type: 'p', text: 'Trust lowers Customer Acquisition Cost (CAC). Trust increases Lifetime Value (LTV). When we reference the Apple Human Interface Guidelines, we are not just looking at visual rules; we are looking at an economic moat built entirely out of craft.' },
      { type: 'p', text: 'For product managers and executives, the lesson is simple: craft is not a luxury afforded to successful companies. It is the catalyst that makes them successful in the first place.' }
    ]
  },
  {
    id: "death-of-handoff",
    title: "The Death of the Handoff",
    date: "Jun 2026",
    readTime: "7 min read",
    excerpt: "The traditional design-to-engineering transition is broken. When designers write code, we stop translating and start building.",
    tags: ["Design Engineering", "Process", "React"],
    content: [
      { type: 'p', text: 'The artifact of a designer is traditionally a static image. A Figma file is a beautiful promise, but it is a lie. It lacks the constraints of the browser, the variance of real data, and the reality of network latency.' },
      { type: 'quote', text: 'You cannot design a great digital product without understanding the material it is built from.', author: 'Brad Frost', source: 'Creator of Atomic Design' },
      { type: 'p', text: 'This is why the role of the "Design Engineer" is becoming the gold standard in high-performance teams, championed by organizations like Vercel and Linear. By blurring the line between CSS/React and Figma, we eliminate the "handoff."' },
      { type: 'h2', text: 'Code is the Source of Truth' },
      { type: 'p', text: 'When a designer commits to code, the prototype is the product. Animation curves, component states, and responsive breakpoints are solved in the medium where they will live. This doesn\'t mean every designer must be a senior software engineer. It means we must possess a deep empathy for the architecture of the DOM.' },
      { type: 'p', text: 'The teams that ship the fastest, highest-quality products no longer throw designs over a wall. They build in the same room, speaking the same language.' }
    ]
  },
  {
    id: "managing-enterprise-complexity",
    title: "Simplicity at Scale",
    date: "May 2026",
    readTime: "6 min read",
    excerpt: "Complexity cannot be destroyed, only moved. The designer's job is to bear the burden so the user doesn't have to.",
    tags: ["Enterprise", "UX", "Systems"],
    content: [
      { type: 'p', text: 'Consumer apps solve simple problems for millions of people. Enterprise software solves highly specific, complex problems for specialized professionals. The instinct in enterprise design is often to expose all the complexity at once.' },
      { type: 'quote', text: 'Every application has an inherent amount of complexity that cannot be removed or hidden. Instead, it must be dealt with, either in product development or in user interaction.', author: 'Larry Tesler', source: 'Tesler\'s Law of the Conservation of Complexity' },
      { type: 'p', text: 'Tesler’s Law is the guiding principle of B2B software. As a designer, your job is not to pretend the complexity doesn\'t exist. Your job is to absorb it. If a user has to perform a 10-step configuration, can the system infer 7 of those steps?' },
      { type: 'h2', text: 'Progressive Disclosure' },
      { type: 'p', text: 'The most powerful tool in the enterprise designer\'s arsenal is progressive disclosure. We show the user exactly what they need at the moment of decision, and not a pixel more. By establishing intelligent defaults and clear hierarchies, we turn overwhelming dashboards into guided, quiet workflows.' }
    ]
  },
  {
    id: "beyond-component-libraries",
    title: "Beyond Component Libraries",
    date: "Apr 2026",
    readTime: "5 min read",
    excerpt: "A design system is not a sticker sheet. It is a shared vocabulary that scales culture, not just pixels.",
    tags: ["Design Systems", "Architecture", "Scale"],
    content: [
      { type: 'p', text: 'Many organizations believe they have a design system because they have a Figma file full of buttons and inputs. This is a component library. A true design system is an operational framework.' },
      { type: 'quote', text: 'A design system isn’t a project. It’s a product serving products.', author: 'Nathan Curtis', source: 'Design Systems Expert' },
      { type: 'p', text: 'A living system bridges the gap between design tokens and React components. It includes guidelines on motion, accessibility standards, voice and tone, and contribution models. It dictates how a team resolves conflicts and pushes updates.' },
      { type: 'h2', text: 'Scaling Culture' },
      { type: 'p', text: 'When implemented correctly, a design system does not restrict creativity; it liberates it. By automating the mundane decisions (spacing, color contrast, typography scales), it frees the team\'s cognitive load to focus on the actual user experience. It is the infrastructure of rapid innovation.' }
    ]
  },
  {
    id: "physics-of-interaction",
    title: "Motion as Meaning",
    date: "Mar 2026",
    readTime: "4 min read",
    excerpt: "Animation is not decoration. It is spatial context. It tells the user where they are and what is possible.",
    tags: ["Motion", "Interaction", "Craft"],
    content: [
      { type: 'p', text: 'In the physical world, nothing appears instantly. Objects have mass, acceleration, and friction. When digital interfaces ignore these laws of physics, they feel jarring and disjointed.' },
      { type: 'quote', text: 'Good design is unobtrusive. Products fulfilling a purpose are like tools. They are neither decorative objects nor works of art.', author: 'Dieter Rams', source: '10 Principles of Good Design' },
      { type: 'p', text: 'Apple\'s fluid interface principles teach us that motion must be functional before it is delightful. A modal sliding up from the bottom of the screen tells the user intuitively that it can be dismissed by swiping down. The animation provides spatial mapping.' },
      { type: 'h2', text: 'Springs over Easing' },
      { type: 'p', text: 'We are moving away from fixed duration bezier curves and toward spring physics. A spring responds to velocity. If a user flicks a card away rapidly, it should fly off the screen with matching momentum. This continuous, interruptible motion creates an interface that feels like an extension of the user\'s hand.' }
    ]
  },
  {
    id: "measuring-the-invisible",
    title: "Measuring the Invisible",
    date: "Feb 2026",
    readTime: "6 min read",
    excerpt: "Data tells you what is happening; design intuition tells you why. How to measure the unmeasurable.",
    tags: ["Research", "Metrics", "Data"],
    content: [
      { type: 'p', text: 'The tension between qualitative intuition and quantitative metrics is as old as software. Stakeholders want dashboards; designers want empathy. The truth is, world-class products require both.' },
      { type: 'quote', text: 'If you want to understand how a lion hunts, don\'t go to the zoo. Go to the jungle.', author: 'Jim Stengel', source: 'Lean Analytics' },
      { type: 'p', text: 'Frameworks like Google’s HEART (Happiness, Engagement, Adoption, Retention, Task Success) or John Brooke’s System Usability Scale (SUS) give us standardized ways to measure friction. But we must be careful not to optimize solely for engagement.' },
      { type: 'h2', text: 'The Quality Heuristic' },
      { type: 'p', text: 'Sometimes, a faster completion time is a sign of success. Sometimes, it’s a sign of a user rushing through a confusing interface to get to the end. The best designers use quantitative data as a smoke detector, and qualitative user interviews as the fire extinguisher. Measure the clicks, but listen to the sighs.' }
    ]
  },
  {
    id: "accessibility-is-innovation",
    title: "Accessibility is Innovation",
    date: "Jan 2026",
    readTime: "5 min read",
    excerpt: "Solving for the edge cases inevitably improves the core. Why accessible design is simply better design.",
    tags: ["Accessibility", "Inclusive Design", "Ethics"],
    content: [
      { type: 'p', text: 'Accessibility is often treated as a final checklist before launch. A contrast check here, an aria-label there. This is a failure of imagination. Accessibility is the genesis of innovation.' },
      { type: 'quote', text: 'Designing for inclusion begins with recognizing exclusion.', author: 'Kat Holmes', source: 'Mismatch: How Inclusion Shapes Design' },
      { type: 'p', text: 'Consider the typewriter, originally invented for a blind countess. Or the electric toothbrush, designed to be used with one hand. When we design for extreme constraints, we create solutions that benefit everyone. This is the core of Microsoft\'s Inclusive Design methodology: solve for one, extend to many.' },
      { type: 'h2', text: 'The Baseline of Empathy' },
      { type: 'p', text: 'High contrast text is easier for everyone to read in the sun. Closed captions are used by millions watching videos on mute. Building accessible software is not a legal obligation; it is the ultimate expression of user empathy and technical mastery.' }
    ]
  },
  {
    id: "psychology-of-onboarding",
    title: "The Psychology of the First Click",
    date: "Dec 2025",
    readTime: "6 min read",
    excerpt: "Onboarding is a fragile negotiation. How to balance motivation with ability to create habit-forming products.",
    tags: ["Psychology", "Onboarding", "Growth"],
    content: [
      { type: 'p', text: 'The first five minutes a user spends in your product dictate their entire lifetime value. Yet, we often greet them with overwhelming tooltips, forced account creation, and blank empty states.' },
      { type: 'quote', text: 'Behavior occurs when motivation, ability, and a prompt converge at the same moment.', author: 'BJ Fogg', source: 'Fogg Behavior Model' },
      { type: 'p', text: 'When a user first arrives, their motivation is high, but their ability to use the software is low. Our job is to deliver a "magic moment"—the core value of the product—before their motivation runs out.' },
      { type: 'h2', text: 'Reducing Cognitive Friction' },
      { type: 'p', text: 'We must delay sign-ups until value is proven. We must replace static empty states with actionable starter content. We must reduce cognitive load by asking one question per screen. Onboarding is not about teaching the user how the UI works; it is about proving that the UI can solve their problem.' }
    ]
  },
  {
    id: "building-resilient-teams",
    title: "Building Resilient Teams",
    date: "Nov 2025",
    readTime: "5 min read",
    excerpt: "The best products are built by teams with high psychological safety and a relentless focus on the user.",
    tags: ["Leadership", "Culture", "Process"],
    content: [
      { type: 'p', text: 'You cannot ship a cohesive product from a fractured team. The architecture of the organization will inevitably mirror itself in the architecture of the software—a phenomenon known as Conway’s Law.' },
      { type: 'quote', text: 'Design leadership is about creating the conditions where great design can happen.', author: 'Peter Merholz', source: 'Org Design for Design Orgs' },
      { type: 'p', text: 'To build a resilient team, hiring managers and design leaders must prioritize psychological safety above pure technical output. A designer must feel safe presenting bad ideas to arrive at the great ones. Critique must be rigorous but never personal.' },
      { type: 'h2', text: 'Cross-Functional Empathy' },
      { type: 'p', text: 'The most valuable trait in a senior designer is not their Figma speed. It is their ability to sit with an engineer and compromise gracefully. It is their ability to show a product manager how a UX improvement directly impacts their OKRs. Great design culture is inherently collaborative.' }
    ]
  }
];
