import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { PageTransition } from "@/components/PageTransition"

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
  { label: "Duration", value: "January – April 2025" },
]

const OUTCOMES = [
  { metric: "3X", label: "MAU Growth", desc: "3× MAU growth post redesign, driven by clearer flows and faster feedback." },
  { metric: "4.9★", label: "App Ratings", desc: "Play Store rose to 4.8 stars and App Store rose from 2.9 to 4.9 stars." },
  { metric: "🏆", label: "Cloud Award", desc: "Won 2023–2024 Cloud Awards: Best in Mobile Cloud Solution." },
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
  { title: "Conceptual modeling", desc: "Chose patterns via conceptual & organisational models before UI design.", image: "/assets/images/ZPT5OKjtkv10BDGkfgZFwVielA.png" },
  { title: "Systems handoff", desc: "Used specs, tokens, and state matrices for smoother developer handoffs.", image: "/assets/images/XLRGR5JwEYOrajQIvZXjDHDupU.png" },
  { title: "Edge readiness", desc: "Documented edge cases early to cut rework during implementation.", image: "/assets/images/Z4QVhleSAUrUTJKhQDKwgSHrJM.png" },
  { title: "Async updates", desc: "Shared one‑minute Loom updates, improved presentation clarity & alignment.", image: "/assets/images/aNVv6LANXfb4E8jMjXuqrxfa48.png" },
  { title: "Taste and craft", desc: "Sharpened visual taste through critique cycles and purposeful iteration.", image: "/assets/images/cKidWTTfgxLZMZ9hnwbnWQoTlM.png" },
]

function SectionImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <motion.img
      src={assetPath(src)}
      alt={alt}
      className={cn("w-full rounded-2xl object-cover frost-media", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    />
  )
}

function SectionVideo({ src, className }: { src: string; className?: string }) {
  return (
    <motion.video
      src={assetPath(src)}
      autoPlay
      loop
      muted
      playsInline
      className={cn("w-full rounded-2xl object-cover frost-media", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    />
  )
}

function FeatureDetail({ items }: { items: { label: string; text: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.label} className="p-5 rounded-xl border border-border/50">
          <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">{item.label}</p>
          <p className="text-[13px] text-foreground/80 leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  )
}

const SECTIONS = [
  { id: "outcomes", num: 1, label: "Outcomes" },
  { id: "context", num: 2, label: "Context" },
  { id: "process", num: 3, label: "Process" },
  { id: "tenets", num: 4, label: "Tenets" },
  { id: "design", num: 5, label: "Design" },
  { id: "learnings", num: 6, label: "Learnings" },
]

function StickyNav() {
  const [activeId, setActiveId] = useState<string>("")
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Observe section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Observe sentinel for sticky state
    const stickyObserver = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )
    if (sentinelRef.current) stickyObserver.observe(sentinelRef.current)

    return () => { observer.disconnect(); stickyObserver.disconnect() }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <>
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />
      <nav
        className={cn(
          "sticky top-11 z-30 transition-all duration-300",
          isSticky
            ? "py-3 nav-glass"
            : "py-4"
        )}
      >
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-5 md:gap-8 overflow-x-auto scrollbar-none">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 shrink-0",
                  activeId === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                )}
              >
                <span className={cn(
                  "text-[12px] font-bold w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-200",
                  activeId === s.id
                    ? "bg-foreground text-background"
                    : "bg-muted/50"
                )}>
                  {s.num}
                </span>
                <span className="text-[13px] font-medium">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default function ThoughtSpotPage() {
  return (
    <PageTransition>
    <div className="relative" style={{ overflowX: "clip" }}>
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
        <div className="absolute top-[300px] left-[-100px] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "rgba(94, 92, 230, 0.08)" }} />
        <div className="absolute top-[1800px] right-[-100px] w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(0, 113, 227, 0.07)" }} />
        <div className="absolute top-[3600px] left-[10%] w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(255, 159, 10, 0.06)" }} />
      </div>

      {/* Back */}
      <section className="pt-24 md:pt-28">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.08]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_ENTER }}>
            ThoughtSpot
          </motion.h1>
          <motion.p className="mt-5 text-[17px] text-muted-foreground leading-[1.65] max-w-[680px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}>
            AI‑powered analytics companion delivering real‑time insights, natural‑language answers, drill‑downs, and KPI watchlists with alerts and sharing, for decisions on‑the‑go, securely anywhere.
          </motion.p>
          <motion.div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {META.map((m) => (
              <div key={m.label}>
                <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-medium">{m.label}</p>
                <p className="text-[15px] font-semibold mt-1">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero image */}
      <section className="pb-12">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <SectionImage src="/assets/images/1GW8AENYNU5gayo8utt1YsKnfY.png" alt="ThoughtSpot Mobile overview" />
        </div>
      </section>

      {/* Sticky Section Nav */}
      <StickyNav />

      {/* Outcomes */}
      <section className="py-14 md:py-18" id="outcomes">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Outcomes</motion.p>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {OUTCOMES.map((o) => (
              <motion.div key={o.label} variants={fadeUp} className="p-5 rounded-2xl glass-card">
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
      <section className="py-14 md:py-18" id="context">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Context</motion.p>
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Analytics on‑the‑go, reimagined
          </motion.h2>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Unifying Liveboards, natural‑language answers, and KPI monitoring for on‑the‑go decisions demanded a modern, consistent mobile experience.
          </motion.p>
          <SectionImage src="/assets/images/b9abnddOjscCPgIGp9S4ltGVYt0.png" alt="Context overview" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <SectionImage src="/assets/images/Qtiy69qOTZTOI1o5KVMD9jpo1r0.png" alt="Context before" />
            <SectionImage src="/assets/images/DkWSGCTDdRuWrzPZeMKKEBLg0ew.png" alt="Context after" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { q: "What was happening before?", a: "The app functioned as a view-only companion to ThoughtSpot Web Portal but lacked modern interaction polish and efficiency for short, on‑the‑go sessions." },
              { q: "Why did it need to change?", a: "Users needed quick, editable charts in Natural Language, fewer steps, and robust native patterns across iOS‑heavy usage while maintaining SSO and enterprise readiness." },
              { q: "What principles guided decisions?", a: "Clear, Responsive, Metaphor, Fluid motion, Multi‑sensory, and Multi‑layered informed hierarchy, feedback pacing, and stitched transitions across flows." },
              { q: "What outcomes were targeted?", a: "Reduce steps and errors, accelerate speed‑to‑insight, standardize system tokens and type scale, and improve accessibility and performance across devices." },
            ].map((item) => (
              <div key={item.q} className="p-5 rounded-xl border border-border/50">
                <h3 className="text-[14px] font-semibold mb-1.5">{item.q}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-10">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="rounded-2xl p-8 md:p-10 glass-card">
            <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-semibold mb-3">Problem Statement</p>
            <p className="text-[17px] md:text-[19px] font-medium leading-[1.6] tracking-tight">
              How might we deliver instant, trustworthy analytics on mobile by unifying Liveboards, natural‑language answers, and KPI monitoring with a consistent system, purposeful motion, and platform‑native behaviors so stakeholders can act confidently between meetings?
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-18" id="process">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Process</motion.p>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            A crisp six‑stage path from audit to handoff ensured high craft, repeatability, and measurable impact.
          </motion.p>
          <SectionImage src="/assets/images/cgpyV6m3F7GbfMwo85VgSfLFrqs.png" alt="Six-stage design process" />
        </div>
      </section>

      {/* Design Tenets */}
      <section className="py-14 md:py-18" id="tenets">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Design tenets</motion.p>
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Coherent, fast, and legible everywhere
          </motion.h2>
          <motion.div className="grid grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {TENETS.map((t) => (
              <motion.div key={t.title} variants={fadeUp} className="p-5 rounded-xl border border-border/50">
                <h3 className="text-[14px] font-semibold mb-1">{t.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{t.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Splash Screen */}
      <section className="py-14 md:py-18" id="design">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Splash screen</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Brand and performance aligned to create a trustworthy first impression. This helped us reduce first-time user drop off rates.
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
      <section className="py-14 md:py-18">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Watchlist KPIs</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            From static viewer to on‑the‑go KPI management with add, edit, and delete.
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
            { label: "Metric", text: "Higher task success, faster completion times, & increased feature adoption." },
          ]} />
        </div>
      </section>

      {/* AI Audio Input */}
      <section className="py-14 md:py-18">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>AI Audio Input</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            From static viewer to on‑the‑go KPI management with add, edit, and delete.
          </motion.p>
          <SectionVideo src="/assets/videos/FWVbGPRDWHA9zeBpF4CbGsj1LA.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Problem", text: "Text‑only input slowed exploratory queries for users preferring fast voice search." },
            { label: "Objective", text: "Add microphone entry and state clarity to accelerate question‑to‑answer cycles." },
            { label: "Solution", text: "More than 30 iterations refined mic states for idle, listening, thinking, success, and error." },
            { label: "Metric", text: "Increased voice queries & faster voice to chart completion times." },
          ]} />
        </div>
      </section>

      {/* Header Updates */}
      <section className="py-14 md:py-18">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Header Updates</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            iOS‑native clarity with glass, solid, and tinted options and smart collapse.
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
            { label: "Solution", text: "Prototyped 6–7 flows for glass, solid, & tinted headers with large‑title collapse." },
            { label: "Metric", text: "Higher title legibility, fewer navigation errors, and faster content reach on long lists." },
          ]} />
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-14 md:py-18">
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
      <section className="py-14 md:py-18" id="learnings">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Learnings</motion.p>
          <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Here are six concise learnings shaped by an iteration‑heavy process, rigorous handoffs, and async feedback loops.
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

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            className="rounded-2xl md:rounded-[2rem] p-10 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_ENTER }}
            style={{ background: "rgba(29, 29, 31, 0.95)", backdropFilter: "blur(20px) saturate(180%)", WebkitBackdropFilter: "blur(20px) saturate(180%)" }}
          >
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-white">
              Let's create your<br />next big idea.
            </h2>
            <p className="mt-4 text-[17px] leading-[1.6] text-white/50 max-w-[420px]">
              Available for full-time roles, freelance projects, and design consulting.
            </p>
            <a href="https://calendly.com/design-kousik/intro-call" target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "inverted", size: "default" }), "mt-8")}>
              Schedule a call <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
    </PageTransition>
  )
}
