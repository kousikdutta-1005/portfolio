import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { PageTransition } from "@/components/PageTransition"
import { CaseBrief, type CaseBriefItem } from "@/components/CaseBrief"
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

const DEVPORTAL_IMAGES = {
  cover: "/assets/images/precisely-devportal/1.jpg",
  platformShift: "/assets/images/precisely-devportal/2.jpg",
  demoIllusion: "/assets/images/precisely-devportal/3.jpg",
  brokenFlow: "/assets/images/precisely-devportal/4.jpg",
  patternSmell: "/assets/images/precisely-devportal/5.jpg",
  missingCore: "/assets/images/precisely-devportal/6.jpg",
  systemGoal: "/assets/images/precisely-devportal/7.jpg",
  systemRules: "/assets/images/precisely-devportal/8.jpg",
  dataVisibility: "/assets/images/precisely-devportal/9.jpg",
  realTryouts: "/assets/images/precisely-devportal/10.jpg",
  startingSimple: "/assets/images/precisely-devportal/11.jpg",
  simplerMaps: "/assets/images/precisely-devportal/12.jpg",
  geotax: "/assets/images/precisely-devportal/13.jpg",
  controlPower: "/assets/images/precisely-devportal/14.jpg",
  systemScale: "/assets/images/precisely-devportal/15.jpg",
  whatChanged: "/assets/images/precisely-devportal/16.jpg",
}

const META = [
  { label: "Organisation", value: "Precisely" },
  { label: "Designer", value: "Kousik Dutta" },
  { label: "Role", value: "End-to-end design" },
  { label: "Duration", value: "August 2025 to present" },
]

const SUMMARY: CaseBriefItem[] = [
  {
    label: "Problem",
    text: "Developers had to switch between documentation, demos, tryouts, and implementation before they could form a complete mental model.",
  },
  {
    label: "My move",
    text: "I reframed the issue as a system problem, defined repeatable demo rules, and connected inputs, maps, outputs, and documentation.",
  },
  {
    label: "Shipped",
    text: "A scalable demo pattern for completed spatial APIs including Reverse Geocode, Time Zone, Wi-Fi, GeoTAX, and Emergency Info.",
  },
  {
    label: "Proof",
    text: "New APIs now slot into one system instead of restarting the design from scratch for every API.",
  },
]

const OUTCOMES = [
  { metric: "1", label: "Demo system", desc: "A unified model for docs, interaction, inputs, and outputs." },
  { metric: "5", label: "APIs completed", desc: "Reverse Geocode, Time Zone, Wi-Fi, GeoTAX, and Emergency Info." },
  { metric: "3", label: "Planned APIs", desc: "Travel Boundary, Summarize, and Calculate Overlap are ready to slot in." },
  { metric: "Less", label: "Design debt", desc: "New demos inherit reusable rules instead of becoming isolated redesigns." },
]

const PATTERN_SMELLS = [
  { title: "Mocked inputs", desc: "Predefined examples prevented testing real addresses, coordinates, or geometries." },
  { title: "No spatial context", desc: "Spatial APIs returned data without visual context or geographic grounding." },
  { title: "Inconsistent layouts", desc: "Each API demo followed different structures, increasing cognitive load." },
  { title: "Fragmented experience", desc: "Documentation, demos, and tryouts lived in separate disconnected surfaces." },
  { title: "Uninterpretable outputs", desc: "Results lacked structure, comparison, or guidance for interpretation." },
  { title: "Unclear data models", desc: "Valid datasets, tables, and attributes were not discoverable inline." },
]

const SYSTEM_RULES = [
  { title: "Real user inputs", desc: "Let developers test with realistic data instead of fixed examples." },
  { title: "Reusable map components", desc: "Reduce duplication and keep spatial interactions consistent across demos." },
  { title: "Consistent layouts", desc: "Help users transfer knowledge between APIs without relearning the interface." },
  { title: "Progressive disclosure", desc: "Surface complexity gradually while preserving expert control." },
  { title: "Predictable outputs", desc: "Make results easier to scan, compare, and trust." },
  { title: "Cohesiveness", desc: "Make every demo feel connected, intentional, and part of a single system." },
]

const SCALE_ITEMS = [
  { title: "Completed", desc: "Reverse Geocode, Time Zone, Wi-Fi, GeoTAX, and Emergency Info." },
  { title: "In progress", desc: "Search at Location and Search Nearby." },
  { title: "Planned", desc: "Travel Boundary, Summarize, and Calculate Overlap." },
  { title: "Future", desc: "More APIs can adopt the same demo model." },
]

const LEARNINGS = [
  { title: "The demo is the product model", desc: "A good API demo is not a preview. It teaches the developer how the system thinks." },
  { title: "Spatial work needs grounding", desc: "Maps, tables, inputs, and attributes have to explain each other instead of competing for attention." },
  { title: "Systems reduce future design debt", desc: "Once the rules are clear, every new API becomes an extension of the system rather than a redesign." },
]

const SECTIONS: CaseStudyNavSection[] = [
  { id: "outcomes", num: 1, label: "Outcomes" },
  { id: "context", num: 2, label: "Context" },
  { id: "diagnosis", num: 3, label: "Diagnosis" },
  { id: "system", num: 4, label: "System" },
  { id: "design", num: 5, label: "Design" },
  { id: "scale", num: 6, label: "Scale" },
  { id: "learnings", num: 7, label: "Learnings" },
]

function SectionImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const objectPosition = className?.includes("object-top") ? "top" : undefined

  return (
    <motion.div
      className={cn("w-full rounded-2xl media-loading-frame content-loading-frame frost-media", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="media-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE_ENTER }}
          />
        )}
      </AnimatePresence>
      <img
        src={assetPath(src)}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn("block w-full rounded-2xl object-cover", loaded ? "media-loaded" : "media-pending")}
        style={{ objectPosition }}
        loading="lazy"
      />
    </motion.div>
  )
}

function OpenGrid({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item) => (
        <motion.div key={item.title} variants={fadeUp} className="border-t border-border/55 pt-4">
          <h3 className="text-[14px] font-semibold mb-1.5">{item.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function PreciselyDevPortalPage() {
  return (
    <PageTransition>
      <Seo
        title="Precisely Developer Portal Case Study - Kousik Dutta"
        description="A product design case study on turning API demos into a scalable developer portal evaluation system for Precisely."
        path="/case-study/precisely-devportal"
        image="https://kousikdutta.com/assets/images/precisely-devportal/1.jpg"
      />
      <div className="relative" style={{ overflowX: "clip" }}>
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
            <motion.p
              className="text-[13px] font-semibold text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER }}
            >
              Precisely Developer Portal
            </motion.p>
            <motion.h1
              className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.04em] leading-[0.99] max-w-[900px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_ENTER }}
            >
              Making API demos feel like a <span className="heading-italic">system</span>.
            </motion.h1>
            <motion.p
              className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[700px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}
            >
              A scalable evaluation experience for spatial APIs, designed so developers can understand the data, try real inputs, interpret outputs, and move toward implementation without losing context.
            </motion.p>
            <motion.div
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.2 }}
            >
              {META.map((item) => (
                <div key={item.label} className="py-2">
                  <p className="text-[12px] text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-[15px] font-semibold mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <CaseBrief
          title="What matters first"
          insight="This work was about turning demos from isolated marketing-like artifacts into a practical developer evaluation system."
          signal="APIs now slot into a system instead of becoming one-off redesigns"
          items={SUMMARY}
        />

        <section className="pb-8">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <SectionImage src={DEVPORTAL_IMAGES.cover} alt="Making demos systematic overview" />
          </div>
        </section>

        <CaseStudyNav sections={SECTIONS} />

        <section className="py-10 md:py-14" id="outcomes">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Outcomes</motion.p>
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {OUTCOMES.map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="border-t border-border/55 pt-4">
                  <p className="text-[24px] font-bold tracking-tight">{item.metric}</p>
                  <p className="text-[13px] font-semibold mt-1">{item.label}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed mt-2">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
            <SectionImage src={DEVPORTAL_IMAGES.whatChanged} alt="Before every API required redesign, after APIs slot into a system" />
          </div>
        </section>

        <section className="py-10 md:py-14" id="context">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Context</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              A portal shift opened the door for a <span className="heading-italic">system</span> reset
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The work began during a transition from an older open developer portal to a cloud portal, creating an opportunity to rethink how spatial APIs are learned, tried, and evaluated holistically.
            </motion.p>
            <div className="space-y-6">
              <SectionImage src={DEVPORTAL_IMAGES.platformShift} alt="Platform shift from old portal to cloud portal" />
              <SectionImage src={DEVPORTAL_IMAGES.demoIllusion} alt="Demo illusion from predefined examples and disabled fields" />
              <SectionImage src={DEVPORTAL_IMAGES.brokenFlow} alt="Broken flow between documentation, demos, tryout, evaluation, and implementation" />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="diagnosis">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Diagnosis</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The problem was not one bad <span className="heading-italic">demo</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The same usability failures appeared across multiple APIs and portal versions, revealing a systemic design problem rather than isolated interface issues.
            </motion.p>
            <OpenGrid items={PATTERN_SMELLS} />
            <div className="mt-8 space-y-6">
              <SectionImage src={DEVPORTAL_IMAGES.patternSmell} alt="Pattern smell across API demos" />
              <SectionImage src={DEVPORTAL_IMAGES.missingCore} alt="Missing core of real inputs, evaluation, and interpretation" />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="system">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>System</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The demo became a unified page <span className="heading-italic">experience</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The goal shifted from designing individual demo screens to defining a repeatable model where documentation, interaction, inputs, and outputs worked together.
            </motion.p>
            <OpenGrid items={SYSTEM_RULES} />
            <div className="mt-8 space-y-6">
              <SectionImage src={DEVPORTAL_IMAGES.systemGoal} alt="System goal for a unified page experience" />
              <SectionImage src={DEVPORTAL_IMAGES.systemRules} alt="System rules for reusable API demos" />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="design">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Design</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Stress-testing the system across API <span className="heading-italic">complexity</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The pattern was shaped through data visibility, real tryouts, simple APIs, constrained maps, complex configuration, and progressive control.
            </motion.p>
            <div className="space-y-8">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Data visibility</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5 max-w-[680px]">
                  Developers needed to understand datasets, fields, and attributes before sending requests or interpreting map results.
                </p>
                <SectionImage src={DEVPORTAL_IMAGES.dataVisibility} alt="Data visibility in API documentation" />
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Real tryouts</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5 max-w-[680px]">
                  Tryout pages surfaced valid data products, table names, parameters, and attribute hints so requests could be constructed confidently.
                </p>
                <SectionImage src={DEVPORTAL_IMAGES.realTryouts} alt="Real API tryout experience" />
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp}>
                  <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Starting simple</h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    Reverse geocode helped validate input handling, map behavior, and output patterns before scaling to harder APIs.
                  </p>
                  <SectionImage src={DEVPORTAL_IMAGES.startingSimple} alt="Reverse geocode demo as a simple starting point" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Simpler maps</h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    Time Zone and Wi-Fi APIs needed geographic context without overstating spatial precision.
                  </p>
                  <SectionImage src={DEVPORTAL_IMAGES.simplerMaps} alt="Simplified maps for time zone and Wi-Fi APIs" />
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp}>
                  <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">GeoTAX</h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    GeoTAX stress-tested whether dense configuration and high-friction decisions could still feel manageable.
                  </p>
                  <SectionImage src={DEVPORTAL_IMAGES.geotax} alt="GeoTAX API demo with configuration and map output" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Control power</h3>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    Emergency Info staged advanced preferences progressively, exposing control only when needed.
                  </p>
                  <SectionImage src={DEVPORTAL_IMAGES.controlPower} alt="Emergency Info API demo with progressive controls" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="scale">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Scale</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Designed to absorb the next <span className="heading-italic">API</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The demo system supports completed, in-progress, and upcoming APIs without changing its core structure.
            </motion.p>
            <OpenGrid items={SCALE_ITEMS} />
            <div className="mt-8 space-y-6">
              <SectionImage src={DEVPORTAL_IMAGES.systemScale} alt="System scale across completed, in-progress, planned, and future APIs" />
              <SectionImage src={DEVPORTAL_IMAGES.whatChanged} alt="APIs slot into a system instead of requiring redesign" />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="learnings">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Learnings</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What I took <span className="heading-italic">forward</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The work reinforced that developer experience becomes clearer when the system teaches users how to reason about the product.
            </motion.p>
            <OpenGrid items={LEARNINGS} />
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
