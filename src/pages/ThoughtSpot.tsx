import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { useState } from "react"
import { PageTransition } from "@/components/PageTransition"
import { CaseBrief, type CaseBriefItem } from "@/components/CaseBrief"
import { CaseStudyNav, type CaseStudyNavSection } from "@/components/CaseStudyNav"
import { Seo } from "@/components/Seo"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const
const STAGGER = 0.08

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
}

const META = [
  { label: "Organisation", value: "ThoughtSpot" },
  { label: "Designer", value: "Kousik Dutta" },
  { label: "Design Lead", value: "Tarun Bhandari" },
  { label: "Duration", value: "4 months, January to April 2025" },
]

const SUMMARY: CaseBriefItem[] = [
  {
    label: "Problem",
    text: "Mobile analytics had the data, but not enough momentum. Users needed quick confidence away from desktop.",
  },
  {
    label: "My move",
    text: "I partnered with product and engineering to shape native flows, AI voice states, motion behavior, and handoff details.",
  },
  {
    label: "Shipped",
    text: "Watchlists, natural-language input states, native headers, filters, alerts, sharing, and a cleaner launch path.",
  },
  {
    label: "Proof",
    text: "Growth, ratings, award recognition, and stronger adoption showed the redesign made the app feel useful and reliable.",
  },
]

const OUTCOMES = [
  { metric: "3x", label: "MAU growth", desc: "3x MAU growth post redesign, driven by clearer flows and faster feedback." },
  { metric: "4.9★", label: "App rating", desc: "Play Store rose to 4.8 stars and App Store rose from 2.9 to 4.9 stars." },
  { metric: "Award", label: "Cloud recognition", desc: "Won 2023–2024 Cloud Awards: Best in Mobile Cloud Solution." },
  { metric: "+9.7k", label: "downloads", desc: "9.7k recent installs, signaling increased demand and better store conversion." },
]

const TENETS = [
  { title: "Clear", desc: "Make hierarchy obvious and reduce interpretation." },
  { title: "Responsive", desc: "Provide instant, meaningful feedback to every action." },
  { title: "Metaphor", desc: "Use familiar data and audio cues to convey state." },
  { title: "Fluid motion", desc: "Stitch transitions to preserve spatial context and focus." },
  { title: "Multi‑sensory", desc: "Pair visuals with subtle, optional haptics and audio." },
  { title: "Multi‑layered", desc: "Use gentle looping states to signal ongoing activity." },
]

const LEARNINGS = [
  { title: "Iteration discipline", desc: "Built 30–40 iterations per feature to refine clarity and outcomes", image: "/assets/images/uMp2AXVNrFmJN8ZwWLTd5j9p9A.png" },
  { title: "Conceptual modeling", desc: "Chose patterns through conceptual and organizational models before UI design.", image: "/assets/images/ZPT5OKjtkv10BDGkfgZFwVielA.png" },
  { title: "Systems handoff", desc: "Used specs, tokens, and state matrices for smoother developer handoffs.", image: "/assets/images/XLRGR5JwEYOrajQIvZXjDHDupU.png" },
  { title: "Edge readiness", desc: "Documented edge cases early to cut rework during implementation.", image: "/assets/images/Z4QVhleSAUrUTJKhQDKwgSHrJM.png" },
  { title: "Async updates", desc: "Shared one-minute Loom updates that improved clarity and alignment.", image: "/assets/images/aNVv6LANXfb4E8jMjXuqrxfa48.png" },
  { title: "Taste and craft", desc: "Sharpened visual taste through critique cycles and purposeful iteration.", image: "/assets/images/cKidWTTfgxLZMZ9hnwbnWQoTlM.png" },
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

function SectionVideo({ src, className }: { src: string; className?: string }) {
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
      <video
        src={assetPath(src)}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setLoaded(true)}
        className={cn("block w-full rounded-2xl object-cover", loaded ? "media-loaded" : "media-pending")}
        style={{ objectPosition }}
      />
    </motion.div>
  )
}

function FeatureDetail({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4">
      {items.map((item) => (
        <div key={item.label} className="border-t border-border/55 pt-4">
          <p className="text-[13px] text-muted-foreground font-semibold mb-1">{item.label}</p>
          <p className="text-[13px] text-foreground/80 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

const SECTIONS: CaseStudyNavSection[] = [
  { id: "outcomes", num: 1, label: "Outcomes" },
  { id: "context", num: 2, label: "Context" },
  { id: "process", num: 3, label: "Process" },
  { id: "tenets", num: 4, label: "Tenets" },
  { id: "design", num: 5, label: "Design" },
  { id: "learnings", num: 6, label: "Learnings" },
]

export default function ThoughtSpotPage() {
  return (
    <PageTransition>
    <Seo
      title="ThoughtSpot Mobile Case Study - Kousik Dutta"
      description="A product design case study on mobile analytics, AI input states, KPI watchlists, and decision-making workflows that helped ThoughtSpot mobile grow."
      path="/case-study/thoughtspot"
      image="https://kousikdutta.com/assets/images/1GW8AENYNU5gayo8utt1YsKnfY.jpg"
    />
    <div className="relative" style={{ overflowX: "clip" }}>
      {/* Back */}
      <section className="pt-20 md:pt-24">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <Link to="/" className="back-link" data-cursor="none">
            Back to work
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER }}>
            ThoughtSpot Mobile
          </motion.p>
          <motion.h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.04em] leading-[0.99] max-w-[860px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_ENTER }}>
            Analytics that move at the <span className="heading-italic">speed</span> of work.
          </motion.h1>
          <motion.p className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[680px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}>
            An AI-powered analytics companion for real-time insights, natural-language answers, drilldowns, and KPI watchlists. Designed so decisions can happen securely, wherever work happens.
          </motion.p>
          <motion.div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {META.map((m) => (
              <div key={m.label}>
                <p className="text-[12px] text-muted-foreground font-medium">{m.label}</p>
                <p className="text-[15px] font-semibold mt-1">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <CaseBrief
        title="What matters first"
        insight="This project was about turning mobile analytics from a passive viewer into a trusted decision loop, fast enough for moments between meetings."
        signal="3x MAU growth, 4.9★ rating, Cloud Award recognition"
        items={SUMMARY}
      />

      {/* Hero image */}
      <section className="pb-8">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <SectionImage src="/assets/images/1GW8AENYNU5gayo8utt1YsKnfY.jpg" alt="ThoughtSpot Mobile overview" />
        </div>
      </section>

      {/* Sticky Section Nav */}
      <CaseStudyNav sections={SECTIONS} />

      {/* Outcomes */}
      <section className="py-10 md:py-14" id="outcomes">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Outcomes</motion.p>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {OUTCOMES.map((o) => (
              <motion.div key={o.label} variants={fadeUp} className="border-t border-border/55 pt-4">
                <p className="text-[24px] font-bold tracking-tight">{o.metric}</p>
                <p className="text-[13px] font-semibold mt-1">{o.label}</p>
                <p className="text-[12px] text-muted-foreground mt-1.5 leading-relaxed">{o.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <SectionImage src="/assets/images/uGueO4PFCfSuGeGcj4lbKrjB4Mg.png" alt="Outcomes navigation" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionImage src="/assets/images/jLhitZnlkZ9Y0R6MFifDKQr8NY.png" alt="Outcomes detail" />
            <SectionImage src="/assets/images/3Df7nprnGZRaZrJyjcOxU2YVZY.png" alt="Outcomes metrics" />
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-10 md:py-14" id="context">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Context</motion.p>
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Analytics, <span className="heading-italic">wherever</span> work happens
          </motion.h2>
          <motion.p className="text-[15px] text-muted-foreground mb-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Liveboards, natural-language answers, and KPI monitoring came together in a mobile experience built for quick, confident decisions.
          </motion.p>
          <SectionImage src="/assets/images/b9abnddOjscCPgIGp9S4ltGVYt0.png" alt="Context overview" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SectionImage src="/assets/images/Qtiy69qOTZTOI1o5KVMD9jpo1r0.png" alt="Context before" />
            <SectionImage src="/assets/images/DkWSGCTDdRuWrzPZeMKKEBLg0ew.png" alt="Context after" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4">
            {[
              { q: "What was happening before?", a: "The app worked as a view-only companion, but it did not yet feel fast or polished enough for short mobile sessions." },
              { q: "Why did it need to change?", a: "Users needed quick, editable charts in Natural Language, fewer steps, and robust native patterns across iOS‑heavy usage while maintaining SSO and enterprise readiness." },
              { q: "What principles guided decisions?", a: "Clear, Responsive, Metaphor, Fluid motion, Multi‑sensory, and Multi‑layered informed hierarchy, feedback pacing, and stitched transitions across flows." },
              { q: "What outcomes were targeted?", a: "Reduce steps and errors, accelerate speed‑to‑insight, standardize system tokens and type scale, and improve accessibility and performance across devices." },
            ].map((item) => (
              <div key={item.q} className="border-t border-border/55 pt-4">
                <h3 className="text-[14px] font-semibold mb-1.5">{item.q}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-8">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="border-y border-border/60 py-5 md:py-6">
            <p className="text-[13px] text-muted-foreground font-semibold mb-3">Problem statement</p>
            <p className="text-[17px] md:text-[19px] font-medium leading-[1.6] tracking-tight">
              How might we deliver instant, trustworthy analytics on mobile by unifying Liveboards, natural‑language answers, and KPI monitoring with a consistent system, purposeful motion, and platform‑native behaviors so stakeholders can act confidently between meetings?
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-14" id="process">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Process</motion.p>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            A crisp six‑stage path from audit to handoff ensured high craft, repeatability, and measurable impact.
          </motion.p>
          <SectionImage src="/assets/images/cgpyV6m3F7GbfMwo85VgSfLFrqs.png" alt="Six-stage design process" />
        </div>
      </section>

      {/* Design Tenets */}
      <section className="py-10 md:py-14" id="tenets">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Design tenets</motion.p>
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Coherent, fast, and legible <span className="heading-italic">everywhere</span>
          </motion.h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {TENETS.map((t) => (
              <motion.div key={t.title} variants={fadeUp} className="border-t border-border/55 pt-4">
                <h3 className="text-[14px] font-semibold mb-1">{t.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Splash Screen */}
      <section className="py-10 md:py-14" id="design">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Splash screen</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            A faster, clearer launch moment used brand motion to communicate progress without adding noise.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SectionImage src="/assets/images/bqWNGldH6ksYT40vmjCt1jEazOo.png" alt="Splash screen design" />
            <SectionImage src="/assets/images/DvLNSxogWdLeZZfn35uY9Qow.png" alt="Splash iterations" />
          </div>
          <SectionVideo src="/assets/videos/9bxlnoBWJxlLHAX8yU4BZd6QdHk.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Problem", text: "No launch screen meant a lost brand moment and unclear app start feedback." },
            { label: "Objective", text: "Communicate system vitality immediately without adding wait time or visual noise." },
            { label: "Solution", text: "Animate logo lines as bar charts to imply data loading with brand‑aligned motion." },
            { label: "Metric", text: "Tracked time to first interaction and launch drop‑off with sub 3s perceived target." },
          ]} />
        </div>
      </section>

      {/* Watchlist KPIs */}
      <section className="py-10 md:py-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Watchlist KPIs</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            KPI management became fast enough for short mobile sessions, with add, edit, and delete built in.
          </motion.p>
          <SectionVideo src="/assets/videos/tYvfu1glQQm57bgeQGXBusZ1xw.mp4" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SectionImage src="/assets/images/b7742pYl5LTqMshkmzd3upHOtw.png" alt="Watchlist explorations" />
            <SectionImage src="/assets/images/CeluGI9etrRb63ETxUc1Q8OSo.png" alt="Watchlist final" />
          </div>
          <FeatureDetail items={[
            { label: "Problem", text: "A view‑only watchlist limited actionability and forced desktop dependency." },
            { label: "Objective", text: "Enable quick KPI updates during short mobile sessions with minimal steps." },
            { label: "Solution", text: "Unified add, edit, and delete flow designed for reachability, clarity, and recovery." },
            { label: "Metric", text: "Higher task success, faster completion times, and increased feature adoption." },
          ]} />
        </div>
      </section>

      {/* AI Audio Input */}
      <section className="py-10 md:py-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>AI Audio Input</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Voice input made natural-language analysis faster when typing slowed the moment down.
          </motion.p>
          <SectionVideo src="/assets/videos/FWVbGPRDWHA9zeBpF4CbGsj1LA.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Problem", text: "Text‑only input slowed exploratory queries for users preferring fast voice search." },
            { label: "Objective", text: "Add microphone entry and state clarity to accelerate question‑to‑answer cycles." },
            { label: "Solution", text: "More than 30 iterations refined mic states for idle, listening, thinking, success, and error." },
            { label: "Metric", text: "Increased voice queries and faster voice-to-chart completion times." },
          ]} />
        </div>
      </section>

      {/* Header Updates */}
      <section className="py-10 md:py-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Header Updates</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Native-feeling headers with glass, solid, and tinted options, plus a smoother large-title collapse.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SectionVideo src="/assets/videos/meAd4eG57hLR5iUliXjlrYLA4.mp4" />
            <SectionVideo src="/assets/videos/o1llNRgoYtD1RuQfGThazOmjqwk.mp4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <SectionVideo src="/assets/videos/53f0oRdm7PSpwazaMabUA5kHKdo.mp4" />
            <SectionVideo src="/assets/videos/Z6eNdY6SKvk2QNdTo5vAcvnWSg.mp4" />
          </div>
          <SectionVideo src="/assets/videos/nML0LfQ6mRfdRJaBSSzIsarsN8.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Problem", text: "The basic header lacked smooth collapse and legibility for an iOS‑heavy audience." },
            { label: "Objective", text: "Improve title readability while scrolling and reduce navigation errors." },
            { label: "Solution", text: "Prototyped 6-7 flows for glass, solid, and tinted headers with large-title collapse." },
            { label: "Metric", text: "Higher title legibility, fewer navigation errors, and faster content reach on long lists." },
          ]} />
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-10 md:py-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Advanced Filters</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Mobile‑first, web‑parity filtering designed for clarity, speed, and context preservation.
          </motion.p>
          <SectionVideo src="/assets/videos/PweIRReRx2pW53VpnfzIDuKOzY.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Problem", text: "Mobile filters were basic; web offered richer multi‑facet control and workflows." },
            { label: "Objective", text: "Deliver advanced, trusted filtering on mobile without sacrificing speed or context." },
            { label: "Solution", text: "Explored page, modal, and hybrid models, refined through extensive iterations." },
            { label: "Metric", text: "Higher task success, faster multi‑facet edits, fewer steps, and better performance." },
          ]} />
        </div>
      </section>

      {/* Learnings */}
      <section className="py-10 md:py-14" id="learnings">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Learnings</motion.p>
          <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Six learnings from an iteration-heavy process, tight handoffs, and async feedback loops.
          </motion.p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {LEARNINGS.map((l) => (
              <motion.div key={l.title} variants={fadeUp} className="rounded-2xl overflow-hidden border border-border/50">
                {l.image && <img src={assetPath(l.image)} alt={l.title} className="w-full aspect-[4/3] object-cover frost-media" />}
                <div className="p-4">
                  <h3 className="text-[14px] font-semibold mb-1">{l.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{l.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
    </PageTransition>
  )
}
