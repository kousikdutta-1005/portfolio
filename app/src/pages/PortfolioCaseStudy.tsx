import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/PageTransition"
import { CaseEvidenceStrip, CaseStory, type CaseEvidenceItem, type CaseStoryItem } from "@/components/CaseStory"
import { CaseStudyNav, type CaseStudyNavSection } from "@/components/CaseStudyNav"
import { Seo } from "@/components/Seo"
import { MiniSwarm } from "@/components/MiniSwarm"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const
const STAGGER = 0.08

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
}

const META = [
  { label: "Client", value: "Personal portfolio" },
  { label: "Role", value: "Product designer and builder" },
  { label: "Tools", value: "React, TypeScript, Copilot, Claude" },
  { label: "Timeline", value: "July 2026" },
]

const SUMMARY: CaseStoryItem[] = [
  {
    label: "What was broken",
    text: "The portfolio had good work, but it still felt like evidence scattered across pages. It needed to reveal my judgment, not just display screens.",
  },
  {
    label: "What changed",
    text: "I rebuilt it as a guided hiring experience: sharper cards, quieter proof, clearer case studies, and a reusable system behind the interface.",
  },
  {
    label: "Why it works",
    text: "A reviewer can move from first impression to detailed proof without losing context. The same care shows up in copy, layout, motion, and code.",
  },
  {
    label: "How it scales",
    text: "Future stories can inherit the same route structure, accents, media rules, navigation, SEO, and production checks without becoming generic.",
  },
]

const OUTCOMES: CaseEvidenceItem[] = [
  { value: "3", label: "Case studies with a spine", desc: "Precisely, ThoughtSpot, and Philips now share the same story logic while keeping their own product rhythm." },
  { value: "5", label: "Work cards tuned", desc: "The selected-work set now has one height, clearer dates, tighter copy, stronger media treatment, and calmer proof." },
  { value: "2", label: "Theme worlds", desc: "Light and dark mode were shaped as two complete moods, not one theme with colors inverted." },
  { value: "1", label: "Product system", desc: "Navigation, route accents, media, motion, cursor behavior, SEO, and build checks now move together." },
]

const CONTEXT = [
  { title: "People do not read portfolios like books", desc: "Recruiters scan for fit first. Design leaders slow down only when the first few seconds feel worth it." },
  { title: "The next click had to be earned", desc: "Every card, caption, metric, and transition needed to create enough trust for someone to keep going." },
  { title: "Taste had to be visible, not loud", desc: "The site needed a quiet signature through rhythm, type, interaction, and restraint rather than decorative flourishes." },
  { title: "The build had to be part of the proof", desc: "If I was calling myself AI-first, the site needed to show that I can move from intent to shipped UI." },
]

const PRINCIPLES = [
  { title: "Write like I am in the room", desc: "The copy had to feel direct, calm, and human, like I was walking someone through the work myself." },
  { title: "Let evidence do the selling", desc: "The case studies show decisions, artifacts, tradeoffs, and outcomes instead of asking the reader to trust a claim." },
  { title: "Give every surface one job", desc: "Glass, cards, labels, motion, and cursor copy only stayed when they improved hierarchy, orientation, or affordance." },
  { title: "Keep it fast, but give it air", desc: "The layout needed recruiter-speed scanning without making the work feel squeezed or rushed." },
  { title: "Let the product set the accent", desc: "Each case study inherits color from the product UI shown on that page, so emphasis feels earned." },
  { title: "Treat AI as a multiplier", desc: "Copilot and Claude helped me move faster. The important work was deciding what to keep, cut, and refine." },
]

const SYSTEM_DECISIONS = [
  { title: "Cards became the first edit", desc: "I made the selected-work cards equal, compact, date-aware, and easier to compare without turning them into identical tiles." },
  { title: "Case studies got a question sequence", desc: "Each story now answers what was broken, what changed, why it works, and how it scales before going deeper." },
  { title: "Navigation became wayfinding", desc: "Primary nav, case-study nav, route loading, and scroll reset were tuned so the visitor always feels placed." },
  { title: "Glass had to earn its blur", desc: "Liquid glass is reserved for controls, cards, media, and contact surfaces where depth improves understanding." },
  { title: "Media had to argue", desc: "Screenshots, demos, native charts, and placeholders are used to explain decisions rather than decorate the page." },
  { title: "Production became craft", desc: "SEO routes, static output, lazy media, build checks, and lint checks became part of the design quality bar." },
]

const BUILD_DECISIONS = [
  { title: "Routes became chapters", desc: "React Router gives every case study its own URL, metadata, accent, scroll behavior, and content navigation." },
  { title: "Components became the editorial kit", desc: "Story summaries, evidence strips, page transitions, media wrappers, SEO, and nav patterns keep the site coherent." },
  { title: "Tokens held the mood", desc: "Light, dark, accent, glass, border, blur, and shadow values live as system rules instead of scattered styling." },
  { title: "Motion carried orientation", desc: "Framer Motion handles arrival and reveal. Lenis makes desktop scrolling feel calmer without taking over touch devices." },
  { title: "Media loading protected the pace", desc: "Images use loading states and cache guards. Large videos lazy-load near the viewport and expose controls." },
  { title: "Static output made it shippable", desc: "The build generates route HTML, SEO metadata, sitemap entries, robots, and a 404 for clean GitHub Pages delivery." },
]

const BUILD_FLOW = [
  { title: "1. Started with the rules", desc: "I wrote the voice, spacing, motion, glass, copy, and case-study principles before polishing any individual screen." },
  { title: "2. Built the shell", desc: "I created the route structure, layout, nav, footer, theme provider, scroll behavior, SEO helper, and transition system." },
  { title: "3. Reworked the stories", desc: "I rewrote Precisely, ThoughtSpot, and Philips around the same questions while keeping each project specific." },
  { title: "4. Tightened the cards", desc: "I tuned size, image treatment, proof points, date placement, hover behavior, and dark-mode readability." },
  { title: "5. Fixed the invisible details", desc: "I handled route scroll, media loading, content-nav overflow, accents, SEO output, and production checks." },
  { title: "6. Shipped it as a branch", desc: "The work was committed and pushed to a reviewable feature branch before it moves to the live site." },
]

const BLOCKS = [
  { title: "Selling without saying hire me", desc: "The copy had to show taste and judgment without turning into a pitch. Simple, specific language did most of the work." },
  { title: "Premium without becoming precious", desc: "Some early surfaces were too boxed or too glassy. I kept removing layers until each section had one clear job." },
  { title: "Fast without feeling thin", desc: "The site needed recruiter-speed scanning, but the stronger ideas still needed enough space to land." },
  { title: "Product proof inside small cards", desc: "The Precisely iMac hero needed a custom crop so the product stayed visible without breaking the card system." },
  { title: "Media that shows up on time", desc: "ThoughtSpot media and Precisely videos needed safer loading behavior so the proof appeared when the story needed it." },
  { title: "A page that opens where it should", desc: "Case studies were opening mid-scroll, so route scroll restoration became part of the interaction system." },
]

const CRAFT = [
  { title: "Voice", desc: "I wrote in first person where it helped, cut generic claims, and kept every section clear enough to scan under pressure." },
  { title: "Visual language", desc: "I shaped a restrained liquid-glass system with adaptive borders, blur, contrast, shadow, and mode-specific color." },
  { title: "Interaction behavior", desc: "Hover, focus, press, selected, current, disabled, loading, reduced-motion, and cursor states were treated as part of the design." },
  { title: "Build quality", desc: "Routes, reusable components, code splitting, SEO metadata, static generation, and validation scripts made the portfolio feel like a product." },
]

const ENGINE_DECISIONS = [
  { title: "Not just a background", desc: "A static backdrop felt lifeless. I built a WebGL particle engine that acts as a living creature, guiding the eye and reacting to the user's journey through the site." },
  { title: "Fibrous material", desc: "Instead of standard solid geometry, I used intersecting, cross-hatched line segments that mimic woven threads, letting the swarm blend seamlessly with the content." },
  { title: "Detail vs Performance", desc: "Pushing 35,000 points crushed the CPU. I dropped it to 14,000 but reserved 35% of those points strictly for the sharp corners and internal geometry. The engine also uses Path Batching (combining thousands of stroke commands into just 3 depth tiers) for a buttery 60fps." },
  { title: "Scroll-driven morphing", desc: "The swarm begins as a Fibonacci sphere and organically morphs through precise CAD models (MacBook, iPhone, PS5 Controller, Chart, Vision Pro, Apple Watch) tied purely to scroll progress." },
  { title: "Z-Axis depth & inertia", desc: "Invisible DOM waypoints feed X, Y, and Z coordinates into the engine. Spring-based physics handle the momentum, pushing the swarm deep into the background so the UI floats on top." },
]

const QUALITY = [
  { title: "Language pass", desc: "I checked grammar, sentence clarity, visible dates, and the no-em-dash rule so the writing stayed clean." },
  { title: "Interaction pass", desc: "I reviewed hover, focus, press, selected, sticky, loading, and reduced-motion states across the main surfaces." },
  { title: "Responsive pass", desc: "Cards, nav, case-study sections, placeholders, and media frames were shaped to stay readable across breakpoints." },
  { title: "Performance pass", desc: "Routes are code-split, offscreen media is safer, and static pages are generated for direct URLs." },
  { title: "Production pass", desc: "The project runs TypeScript build, Vite build, postbuild route generation, glass checks, and oxlint." },
  { title: "Deployment pass", desc: "The branch carries production-ready assets, SEO files, and a clean GitHub Pages path." },
]

const TAKEAWAYS = [
  { title: "A portfolio has an impatient user", desc: "It has goals, trust gaps, loading states, edge cases, and one job: help the right person understand the work." },
  { title: "Restraint makes craft easier to see", desc: "Removing decoration made the remaining interactions feel more deliberate and more confident." },
  { title: "AI changes speed, not taste", desc: "Copilot and Claude made iteration faster, but the quality came from deciding what to keep, cut, and clarify." },
  { title: "Consistency is proof", desc: "A reviewer should feel the same level of care in a card, a nav state, a caption, and a full case-study page." },
]

const REVIEWER_FLOW = [
  { title: "First scan", desc: "The hero sets the role, tone, and level of taste without asking for too much time." },
  { title: "Shortlist", desc: "Selected-work cards help the reviewer compare projects quickly and choose the strongest next click." },
  { title: "Story spine", desc: "Each case study answers the same core questions before moving into detail." },
  { title: "Proof", desc: "Screenshots, metrics, diagrams, and decisions show why the work matters." },
  { title: "Contact", desc: "The conversation feels earned because the site has already done the explaining." },
]

const IA_COLUMNS = [
  {
    title: "Old structure",
    desc: "The work was present, but the reviewer had to assemble the story alone.",
    items: ["Intro first", "Project cards as a gallery", "Different case-study rhythms", "Proof buried in media", "Contact at the end"],
  },
  {
    title: "New structure",
    desc: "The IA now moves like a guided hiring path with proof at every step.",
    items: ["Positioning first", "Cards as decision points", "Shared case-study spine", "Evidence beside decisions", "Contact after trust is built"],
  },
]

const BUILD_ARCHITECTURE = [
  { title: "Experience layer", desc: "The pages a reviewer moves through.", items: ["Home", "About", "Case-study routes", "Contact"] },
  { title: "Story layer", desc: "Reusable patterns that keep the case studies consistent.", items: ["CaseStory", "EvidenceStrip", "CaseStudyNav", "Media figures"] },
  { title: "System layer", desc: "Rules that make the site feel like one product.", items: ["Theme tokens", "Route accents", "Motion rules", "Media loading"] },
  { title: "Shipping layer", desc: "Production pieces that make the portfolio reliable.", items: ["Vite build", "Static routes", "SEO files", "GitHub Pages"] },
]

const SECTIONS: CaseStudyNavSection[] = [
  { id: "outcomes", num: 1, label: "Outcomes" },
  { id: "context", num: 2, label: "Context" },
  { id: "principles", num: 3, label: "Principles" },
  { id: "system", num: 4, label: "System" },
  { id: "build", num: 5, label: "Build" },
  { id: "blocks", num: 6, label: "Blocks" },
  { id: "craft", num: 7, label: "Craft" },
  { id: "engine", num: 8, label: "The Engine" },
  { id: "takeaways", num: 9, label: "Takeaways" },
]

function ModelShowcase() {
  const models = [
    { label: "MacBook", modelName: "macbook_pro_m3_16_inch_2024" },
    { label: "iPhone", modelName: "iphone_17_pro" },
    { label: "PS5", modelName: "ps5_controller" },
    { label: "Vision Pro", modelName: "apple_vision_pro" },
    { label: "Watch", modelName: "apple_watch_ultra_2" },
  ]
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3">
      {models.map((m, i) => (
        <motion.div
          key={m.label}
          variants={fadeUp}
          custom={i}
          className="flex flex-col items-center justify-center p-4 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm shadow-sm"
        >
          <div className="mb-2 h-[80px] w-[80px] flex items-center justify-center">
            <MiniSwarm modelName={m.modelName} />
          </div>
          <span className="text-[12px] font-medium text-muted-foreground">{m.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function OpenGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <motion.div
      className="precisely-open-grid"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={fadeUp}>
          <h3 className="text-[14px] font-semibold mb-1.5">{item.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

 

function PortfolioImageFigure({
  src,
  darkSrc,
  title,
  desc,
  alt,
  loading = "lazy",
}: {
  src: string
  darkSrc?: string
  title: string
  desc: string
  alt: string
  loading?: "lazy" | "eager"
}) {
  return (
    <motion.figure
      className="portfolio-image-figure"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="portfolio-image-frame">
        <img className={darkSrc ? "portfolio-theme-image-light" : undefined} src={src} alt={alt} loading={loading} decoding="async" />
        {darkSrc && (
          <img className="portfolio-theme-image-dark" src={darkSrc} alt={alt} loading={loading} decoding="async" />
        )}
      </div>
      <figcaption>
        <strong>{title}</strong>
        <span>{desc}</span>
      </figcaption>
    </motion.figure>
  )
}

function ReviewerFlowDiagram() {
  return (
    <motion.figure
      className="portfolio-diagram portfolio-flow-diagram relative"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="waypoint-3d" data-model="iphone_17_pro" data-x-desktop="0.8" data-y-desktop="0.6" data-x-mobile="0.5" data-y-mobile="0.6" data-z-depth="-100" />
      <figcaption className="portfolio-diagram-header">
        <strong>Reviewer flow</strong>
        <span>The IA was shaped around the way someone actually evaluates a portfolio: quick scan first, deeper proof only after trust starts forming.</span>
      </figcaption>
      <ol className="portfolio-flow-track">
        {REVIEWER_FLOW.map((step) => (
          <li key={step.title} className="portfolio-flow-step">
            <span>{step.title}</span>
            <p>{step.desc}</p>
          </li>
        ))}
      </ol>
    </motion.figure>
  )
}

function InformationArchitectureDiagram() {
  return (
    <motion.figure
      className="portfolio-diagram portfolio-ia-diagram relative"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="waypoint-3d" data-model="pulldown_graph_chart_3d" data-x-desktop="0.25" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="150" />
      <figcaption className="portfolio-diagram-header">
        <strong>Information architecture shift</strong>
        <span>The old site behaved more like a set of pages. The new one behaves like a clear path from attention to evidence.</span>
      </figcaption>
      <div className="portfolio-ia-grid">
        {IA_COLUMNS.map((column) => (
          <section key={column.title} className="portfolio-ia-column" aria-label={column.title}>
            <div>
              <h3>{column.title}</h3>
              <p>{column.desc}</p>
            </div>
            <ol>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </motion.figure>
  )
}

function BuildArchitectureDiagram() {
  return (
    <motion.figure
      className="portfolio-diagram portfolio-architecture-diagram relative"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="waypoint-3d" data-model="apple_watch_ultra_2" data-x-desktop="0.8" data-y-desktop="0.7" data-x-mobile="0.5" data-y-mobile="0.7" data-z-depth="-250" />
      <figcaption className="portfolio-diagram-header">
        <strong>Build architecture</strong>
        <span>The site is structured as layers: the public experience, the reusable story kit, the visual system, and the production path.</span>
      </figcaption>
      <div className="portfolio-architecture-grid">
        {BUILD_ARCHITECTURE.map((layer) => (
          <section key={layer.title} className="portfolio-architecture-layer" aria-label={layer.title}>
            <h3>{layer.title}</h3>
            <p>{layer.desc}</p>
            <ul>
              {layer.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </motion.figure>
  )
}

export default function PortfolioCaseStudyPage() {
  return (
    <PageTransition>
      <Seo
        title="Portfolio Website Case Study - Kousik Dutta"
        description="A product design case study on designing and building Kousik Dutta's portfolio as a clear, evidence-led, AI-assisted product experience."
        path="/case-study/portfolio"
      />
      <div className="portfolio-case-study relative" style={{ overflowX: "clip" }}>
        <section className="pt-20 md:pt-24">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Link to="/" className="back-link" data-cursor="none">
                Back to work
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="pt-6 pb-8 md:pt-8 md:pb-10 relative">
          <div className="waypoint-3d" data-model="macbook_pro_m3_16_inch_2024" data-x-desktop="0.8" data-y-desktop="0.4" data-x-mobile="0.5" data-y-mobile="0.2" data-z-depth="-150" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER }}>
              Portfolio website
            </motion.p>
            <motion.h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.04em] leading-[0.99] max-w-[900px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_ENTER }}>
              Turning my portfolio from a gallery into a product that shows how I <span className="heading-italic">think</span>.
            </motion.h1>
            <motion.p className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[700px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}>
              I redesigned and built my own site as a hiring experience: fast for recruiters, deep enough for design leaders, and polished enough to show that taste can become shipped UI.
            </motion.p>
            <motion.div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.2 }}>
              {META.map((item) => (
                <div key={item.label} className="py-2">
                  <p className="text-[12px] text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-[15px] font-semibold mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="relative">
          <div className="waypoint-3d" data-model="apple_vision_pro" data-x-desktop="0.2" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.3" data-z-depth="200" />
          <CaseStory
            title="The shift"
            lead="This was less about making a nicer website and more about removing friction between my work and the person trying to understand it."
            items={SUMMARY}
          />
        </div>

        <section className="pb-8">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <PortfolioImageFigure
              src="/assets/images/portfolio-case-study/hero-visual.png"
              darkSrc="/assets/images/portfolio-case-study/hero-visual-dark.png"
              title="The homepage as a hiring surface"
              desc="The first screen sets the tone, then moves quickly into selected work so the portfolio starts proving the thinking instead of introducing it for too long."
              alt="Portfolio homepage shown inside an iMac frame with the headline Thinking becomes product."
              loading="eager"
            />
          </div>
        </section>

        <CaseStudyNav sections={SECTIONS} />

        <section className="py-10 md:py-14" id="outcomes">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The site started doing more of the <span className="heading-italic">explaining</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[680px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              I judged the work through the moments a hiring reviewer actually feels: the first scan, the first click, the first proof point, and the confidence to keep going.
            </motion.p>
            <CaseEvidenceStrip items={OUTCOMES} />
            <div className="mt-8">
              <ReviewerFlowDiagram />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="context">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The old version had the work. It needed clearer <span className="heading-italic">proof</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The portfolio had to explain senior product judgment quickly. It needed to show how I frame ambiguity, write clearly, make systems, use AI tools, and finish the details people notice before they can name.
            </motion.p>
            <OpenGrid items={CONTEXT} />
            <div className="mt-8">
              <InformationArchitectureDiagram />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="principles">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              I wrote the rules before touching the <span className="heading-italic">polish</span>.
            </motion.h2>
            <OpenGrid items={PRINCIPLES} />
          </div>
        </section>

        <section className="py-10 md:py-14" id="system">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              I made the portfolio behave like one connected <span className="heading-italic">system</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Every visible choice had to support orientation, comprehension, trust, or decision-making. If it did not help the reader, it did not stay.
            </motion.p>
            <OpenGrid items={SYSTEM_DECISIONS} />
            <div className="mt-8">
              <PortfolioImageFigure
                src="/assets/images/portfolio-case-study/selected-work-light.png"
                title="The card system in light mode"
                desc="The same selected-work grid holds its hierarchy in a brighter theme: product evidence first, context second, and proof kept quiet."
                alt="Light mode selected work grid with portfolio project cards arranged in two columns."
              />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="build">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Then I built the system for <span className="heading-italic">real</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The site runs on React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lenis, and GitHub Pages. Copilot and Claude helped me move faster, but nothing stayed just because it worked. It had to support the story.
            </motion.p>
            <OpenGrid items={BUILD_DECISIONS} />
            <div className="mt-8">
              <BuildArchitectureDiagram />
            </div>
            <motion.h3 className="mt-10 text-[22px] font-bold tracking-tight mb-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The build rhythm
            </motion.h3>
            <OpenGrid items={BUILD_FLOW} />
          </div>
        </section>

        <section className="py-10 md:py-14" id="blocks">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The hard part was knowing what not to <span className="heading-italic">add</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Most of the work was not adding more. It was learning which detail made the page clearer, and which detail only made the page busier.
            </motion.p>
            <OpenGrid items={BLOCKS} />
          </div>
        </section>

        <section className="py-10 md:py-14" id="craft">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The craft was in the <span className="heading-italic">connections</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              AI helped me move through the build quickly. The craft was making sure writing, layout, media, motion, accessibility, and production behavior all pointed in the same direction.
            </motion.p>
            <OpenGrid items={CRAFT} />
            <motion.h3 className="mt-10 text-[22px] font-bold tracking-tight mb-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              How I checked the work
            </motion.h3>
            <OpenGrid items={QUALITY} />
            <div className="mt-8">
              <PortfolioImageFigure
                src="/assets/images/portfolio-case-study/selected-work-dark.png"
                title="The same system in dark mode"
                desc="Dark mode uses stronger edge definition, quieter glow, and calmer surfaces so the cards still feel premium without becoming heavy."
                alt="Dark mode selected work grid with product cards, glass surfaces, and compact proof text."
              />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="engine">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              A living, breathing <span className="heading-italic">3D system</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              To ensure the portfolio felt dynamic without distracting from the work, I built a custom 3D particle engine that shape-shifts and travels through depth as you scroll.
            </motion.p>
            <OpenGrid items={ENGINE_DECISIONS} />
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ModelShowcase />
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="takeaways">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What this taught me about designing for <span className="heading-italic">attention</span>.
            </motion.h2>
            <OpenGrid items={TAKEAWAYS} />
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
