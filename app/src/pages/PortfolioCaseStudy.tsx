import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { PageTransition } from "@/components/PageTransition"
import { CaseEvidenceStrip, CaseStory, type CaseEvidenceItem, type CaseStoryItem } from "@/components/CaseStory"
import { CaseStudyNav, type CaseStudyNavSection } from "@/components/CaseStudyNav"
import { Seo } from "@/components/Seo"

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
  { label: "Tools", value: "React, Copilot, motion, CSS" },
  { label: "Timeline", value: "July 2026" },
]

const SUMMARY: CaseStoryItem[] = [
  {
    label: "What was broken",
    text: "The portfolio could show projects, but it did not fully show how I think, make decisions, use AI, and turn judgment into a working interface.",
  },
  {
    label: "What changed",
    text: "I rebuilt the site around a clearer voice, tighter work cards, proof-led case studies, adaptive materials, and reusable interaction rules.",
  },
  {
    label: "Why it works",
    text: "A recruiter can scan the work quickly, understand the design reasoning, and see that the craft is consistent across copy, layout, motion, and code.",
  },
  {
    label: "How it scales",
    text: "The site now has reusable story patterns, route accents, media rules, content navigation, and production checks that make future case studies easier to add.",
  },
]

const OUTCOMES: CaseEvidenceItem[] = [
  { value: "3", label: "Case studies aligned", desc: "Precisely, ThoughtSpot, and Philips now follow one evidence-led story model without feeling templated." },
  { value: "5", label: "Work cards normalized", desc: "Selected-work cards use one size, one rhythm, clearer dates, compact copy, and neutral proof signals." },
  { value: "2", label: "Theme systems", desc: "Every surface was tuned for light and dark mode instead of treating dark mode as an afterthought." },
  { value: "1", label: "Reusable site system", desc: "Navigation, route accents, media, motion, cursor behavior, SEO, and build checks now work as one product." },
]

const PRINCIPLES = [
  { title: "The site is the conversation", desc: "The writing had to feel like I was speaking directly to the person reviewing the work." },
  { title: "Proof before praise", desc: "The case studies show decisions, artifacts, tradeoffs, and outcomes instead of telling the reader to trust me." },
  { title: "One surface, one job", desc: "Glass, cards, labels, motion, and cursor copy only stayed when they improved hierarchy or affordance." },
  { title: "Compact, but breathable", desc: "The layout needed to feel tight and fast without making any section feel cramped." },
  { title: "Accent comes from the work", desc: "Each case-study page inherits its accent from the product UI shown on that page." },
  { title: "AI supports the craft", desc: "Copilot helped me build and iterate faster, but the design judgment stayed in the product decisions." },
]

const SYSTEM_DECISIONS = [
  { title: "Selected work became the decision layer", desc: "Cards were equalized, dates moved into a clear top row, metrics became neutral, and visible View/Open labels were removed." },
  { title: "Case studies got one spine", desc: "Each story answers what was broken, what changed, why it works, and how it scales before going deeper." },
  { title: "Navigation became orientation", desc: "Primary nav, case-study nav, route loading, and scroll reset were tuned so the visitor always knows where they are." },
  { title: "Materials became affordances", desc: "Liquid glass is reserved for controls, cards, media, and contact surfaces where depth helps understanding." },
  { title: "Media became evidence", desc: "Screenshots, demos, native charts, and placeholders are used to explain decisions rather than decorate the page." },
  { title: "Production became part of design", desc: "SEO routes, static output, lazy media, build checks, and lint checks became part of the quality bar." },
]

const BLOCKS = [
  { title: "Clear without sounding boastful", desc: "The copy had to sell the thinking without claiming greatness. The answer was simple, modest, evidence-led language." },
  { title: "Premium without extra layers", desc: "Early surfaces could become too glassy or boxed. I removed layers until each section had one clear job." },
  { title: "Compact without feeling cramped", desc: "Cards and case-study sections needed recruiter-speed scanning while still giving every idea enough personal space." },
  { title: "Product visibility inside small cards", desc: "The Precisely iMac hero needed a custom crop so the product was visible without breaking card consistency." },
  { title: "Reliable media loading", desc: "ThoughtSpot media and Precisely videos needed safer loading behavior so evidence appeared when it mattered." },
  { title: "Route behavior had to feel native", desc: "Case-study pages were opening mid-scroll, so route scroll restoration became part of the interaction system." },
]

const CRAFT = [
  { title: "Writing system", desc: "I wrote in first person where it helped, cut jargon, removed empty claims, and kept every section easy to scan." },
  { title: "Visual system", desc: "I shaped a restrained liquid-glass language with adaptive borders, blur, contrast, shadow, and mode-specific color." },
  { title: "Interaction system", desc: "Hover, focus, press, selected, current, disabled, loading, reduced-motion, and cursor behavior were treated as design details." },
  { title: "Build system", desc: "React routes, reusable components, code splitting, SEO metadata, static route generation, and validation scripts supported the portfolio as a real product." },
]

const TAKEAWAYS = [
  { title: "A portfolio is a product", desc: "It has users, conversion goals, trust gaps, loading states, edge cases, and a voice." },
  { title: "Restraint creates confidence", desc: "Removing decoration made the remaining interactions feel more deliberate." },
  { title: "AI changes speed, not taste", desc: "Copilot made iteration faster, but the quality came from deciding what to keep, cut, and clarify." },
  { title: "Consistency is the proof", desc: "A recruiter should feel the same level of care in a card, a nav state, a caption, and a full case-study page." },
]

const SECTIONS: CaseStudyNavSection[] = [
  { id: "outcomes", num: 1, label: "Outcomes" },
  { id: "context", num: 2, label: "Context" },
  { id: "principles", num: 3, label: "Principles" },
  { id: "system", num: 4, label: "System" },
  { id: "blocks", num: 5, label: "Blocks" },
  { id: "craft", num: 6, label: "Craft" },
  { id: "takeaways", num: 7, label: "Takeaways" },
]

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

function ScreenshotPlaceholder({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.figure
      className="portfolio-placeholder"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div className="portfolio-placeholder-stage" aria-label={title}>
        <span>Screenshot placeholder</span>
        <strong>{title}</strong>
      </div>
      <figcaption>{desc}</figcaption>
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

        <section className="pt-6 pb-8 md:pt-8 md:pb-10">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER }}>
              Portfolio website
            </motion.p>
            <motion.h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.04em] leading-[0.99] max-w-[900px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_ENTER }}>
              Turning my portfolio into a product that shows how I <span className="heading-italic">think</span>.
            </motion.h1>
            <motion.p className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[700px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}>
              I redesigned and built my own site as a hiring experience: clear enough for a quick recruiter scan, deep enough for a design leader, and crafted enough to show that ideas can become working product.
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

        <CaseStory
          title="The shift"
          lead="The work was not just to make the site look better. It was to make the site behave like a calm, high-signal conversation with the person deciding whether to hire me."
          items={SUMMARY}
        />

        <section className="pb-8">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <ScreenshotPlaceholder
              title="Homepage hero and selected-work cards"
              desc="Replace this with a final screenshot showing the homepage, work order, compact cards, and the overall tone."
            />
          </div>
        </section>

        <CaseStudyNav sections={SECTIONS} />

        <section className="py-10 md:py-14" id="outcomes">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The site became clearer, sharper, and easier to <span className="heading-italic">trust</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[680px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              I measured the work through the parts a hiring reviewer actually experiences: scan speed, story clarity, proof quality, interaction polish, and production readiness.
            </motion.p>
            <CaseEvidenceStrip items={OUTCOMES} />
          </div>
        </section>

        <section className="py-10 md:py-14" id="context">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The problem was not a lack of work. It was a lack of <span className="heading-italic">signal</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The portfolio had to explain senior product judgment quickly. It needed to show how I frame ambiguity, write clearly, make systems, use AI tools, and care about the details that make an interface feel finished.
            </motion.p>
            <ScreenshotPlaceholder
              title="Before and after information architecture"
              desc="Use this slot for a comparison of the old structure, the new selected-work order, and the simplified case-study flow."
            />
          </div>
        </section>

        <section className="py-10 md:py-14" id="principles">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The rules that kept the work <span className="heading-italic">honest</span>.
            </motion.h2>
            <OpenGrid items={PRINCIPLES} />
          </div>
        </section>

        <section className="py-10 md:py-14" id="system">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              I treated the portfolio as one connected <span className="heading-italic">system</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Every visible choice had to support orientation, comprehension, trust, or decision-making. If it did not, it was removed.
            </motion.p>
            <OpenGrid items={SYSTEM_DECISIONS} />
            <div className="mt-8">
              <ScreenshotPlaceholder
                title="Interaction states and navigation system"
                desc="Use this slot for hover, focus, sticky nav, route loading, content nav, and cursor affordance screenshots."
              />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="blocks">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The hard parts were mostly <span className="heading-italic">judgment</span> calls.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The blocks were not about adding more polish. They were about knowing when polish was helping and when it was becoming noise.
            </motion.p>
            <OpenGrid items={BLOCKS} />
          </div>
        </section>

        <section className="py-10 md:py-14" id="craft">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The craft lived in the <span className="heading-italic">connections</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[700px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              I used AI-assisted coding to move faster, but the real work was making sure writing, layout, media, motion, accessibility, and production behavior all agreed with each other.
            </motion.p>
            <OpenGrid items={CRAFT} />
            <div className="mt-8">
              <ScreenshotPlaceholder
                title="Light and dark mode comparison"
                desc="Use this slot for paired screenshots showing adaptive surfaces, accent colors, media treatment, and card consistency."
              />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="takeaways">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What I would carry into the next <span className="heading-italic">product</span>.
            </motion.h2>
            <OpenGrid items={TAKEAWAYS} />
            <div className="mt-8">
              <ScreenshotPlaceholder
                title="Final portfolio proof set"
                desc="Use this slot for the final homepage, About page, case-study page, and selected-work card screenshots."
              />
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
