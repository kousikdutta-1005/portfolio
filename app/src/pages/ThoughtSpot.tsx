import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { useEffect, useRef, useState } from "react"
import { VideoToolbar } from "@/components/VideoToolbar"
import { VideoOverlay } from "@/components/VideoOverlay"
import { PageTransition } from "@/components/PageTransition"
import { CaseEvidenceStrip, CaseStory, type CaseEvidenceItem, type CaseStoryItem } from "@/components/CaseStory"
import { CaseStudyNav, type CaseStudyNavSection } from "@/components/CaseStudyNav"
import { CaseRetro, type CaseRetroItem } from "@/components/CaseRetro"
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
  { label: "Company", value: "ThoughtSpot" },
  { label: "Role", value: "Product Designer" },
  { label: "Design Lead", value: "Tarun Bhandari" },
  { label: "Duration", value: "4 months, January to April 2024" },
]

const SUMMARY: CaseStoryItem[] = [
  {
    label: "What was broken",
    text: "The app could show data, but it still felt too passive for the short, high-pressure moments where mobile analytics matters.",
  },
  {
    label: "What changed",
    text: "I helped shape native flows, voice input states, KPI watchlists, headers, filters, alerts, and handoff details into one clearer system.",
  },
  {
    label: "Why it works",
    text: "The redesign reduced interpretation work. People could ask, scan, filter, share, and keep track of metrics without returning to desktop.",
  },
  {
    label: "How it scales",
    text: "The patterns were documented as states, tokens, and behavior rules so new analytics surfaces could inherit the same mobile rhythm.",
  },
]

const OUTCOMES: CaseEvidenceItem[] = [
  { value: "3x", label: "Mobile adoption", desc: "Monthly active usage grew after the redesign, showing the app was entering more work routines." },
  { value: "4.9", label: "Quality rating", desc: "App Store rating moved from 2.9 to 4.9, with Play Store at 4.8 after the mobile experience improved." },
  { value: "9.7k", label: "New installs", desc: "Recent installs gave the team a clearer top-of-funnel metric to build on." },
  { value: "6", label: "Core task coverage", desc: "Watchlists, voice queries, headers, filters, alerts, and sharing covered the main mobile analytics jobs." },
]

const TENETS = [
  { title: "Clear", desc: "Make hierarchy obvious and reduce interpretation." },
  { title: "Responsive", desc: "Provide instant, meaningful feedback to every action." },
  { title: "Metaphor", desc: "Use familiar data and audio cues to convey state." },
  { title: "Fluid motion", desc: "Stitch transitions to preserve spatial context and focus." },
  { title: "Optional feedback", desc: "Pair visuals with subtle haptics and audio only when they clarify state." },
  { title: "Visible progress", desc: "Use gentle looping states to show that the system is still working." },
]

const LEARNINGS = [
  { title: "Iteration discipline", desc: "Thirty to forty iterations per feature helped remove ambiguity before engineering picked up the work.", image: "/assets/images/uMp2AXVNrFmJN8ZwWLTd5j9p9A.webp" },
  { title: "Conceptual modeling", desc: "Conceptual and organizational models helped the team choose patterns before polishing screens.", image: "/assets/images/ZPT5OKjtkv10BDGkfgZFwVielA.webp" },
  { title: "Systems handoff", desc: "Specs, tokens, and state matrices made handoff calmer and reduced interpretation for engineers.", image: "/assets/images/XLRGR5JwEYOrajQIvZXjDHDupU.webp" },
  { title: "Edge readiness", desc: "Documenting empty, loading, error, and recovery states early kept the experience reliable.", image: "/assets/images/Z4QVhleSAUrUTJKhQDKwgSHrJM.webp" },
  { title: "Async clarity", desc: "Short Loom updates made decisions visible without slowing the team down.", image: "/assets/images/aNVv6LANXfb4E8jMjXuqrxfa48.webp" },
  { title: "Taste through critique", desc: "Regular critique cycles helped the work become simpler, sharper, and easier to ship.", image: "/assets/images/cKidWTTfgxLZMZ9hnwbnWQoTlM.webp" },
]

const RETRO: CaseRetroItem[] = [
  {
    claim: "I treated adoption growth as proof the redesign worked",
    shipped:
      "The outcomes lead with a 3x rise in monthly active usage and a rating jump from 2.9 to 4.9, reported as the result of my work. Those are single headline numbers with no guardrail that could have said the redesign failed.",
    better:
      "Go from goal to signal to metric, not straight to whatever is easy to count. Pick one guardrail metric that is allowed to veto a launch, report every headline number with a percentile beside it, and write down before release what result would make me call it a failure.",
    article: { title: "When the Metric Becomes the Target", to: "/journal/when-the-metric-lies" },
  },
  {
    claim: "I redesigned an analytics app without auditing the charts",
    shipped:
      "I reworked headers, filters, watchlists, voice, and sharing, and said the redesign reduced interpretation work. I never questioned how the charts themselves encode values on a small screen, whether a pie or color scale was the wrong choice, or whether they showed any uncertainty.",
    better:
      "Rank encodings by how accurately eyes read them, so position and length carry the value and color carries only grouping. Start bars at zero, show a confidence band instead of a single point, and ship a data table under each chart so exact values and screen readers both work.",
    article: { title: "Charts That Tell the Truth", to: "/journal/charts-that-tell-truth" },
  },
  {
    claim: "I set a three second target that hides slowness",
    shipped:
      "On the splash screen I set a perceived sub-three-second target for time to first interaction, and listed it as something to track. Three seconds is many times past the point where an app stops feeling instant, so the target could pass while launch still felt slow.",
    better:
      "Budget to 100 milliseconds for feedback and 400 for flow, and measure interaction to next paint at the 75th percentile of real devices, not a single vague target. Show the result the instant a person taps and reconcile in the background, and use a skeleton only for the middle wait band.",
    article: { title: "Latency Is a Feeling", to: "/journal/latency-is-a-feeling" },
  },
  {
    claim: "I named accessibility as a goal but shipped no method",
    shipped:
      "The context section lists better accessibility as a targeted outcome, yet nothing in the work shows how I got there. The voice states and headers lean on color and audio cues, and there is no contrast rule, focus order, or screen reader path anywhere.",
    better:
      "Treat exclusion as a research signal and fix it at the token level: 4.5 to 1 contrast, named controls, a sensible focus order, and a second channel so meaning never rests on color or audio alone. Run the voice flow through a screen reader, and check contrast automatically in the build.",
    article: { title: "Solve for One, Help Everyone", to: "/journal/solve-for-one" },
  },
]

function SectionImage({ src, alt, className, loading = "lazy" }: { src: string; alt: string; className?: string; loading?: "eager" | "lazy" }) {
  const [loaded, setLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const objectPosition = className?.includes("object-top") ? "top" : undefined
  const resolvedSrc = assetPath(src)

  useEffect(() => {
    setLoaded(false)
    const image = imageRef.current
    if (image?.complete && image.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [resolvedSrc])

  return (
    <motion.div
      className={cn("w-full rounded-2xl media-loading-frame frost-media", !loaded && "content-loading-frame", className)}
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
        ref={imageRef}
        src={resolvedSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn("block w-full h-auto rounded-2xl", loaded ? "media-loaded" : "media-pending")}
        style={{ objectPosition }}
        loading={loading}
      />
    </motion.div>
  )
}

function SectionVideo({ src, className }: { src: string; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const objectPosition = className?.includes("object-top") ? "top" : undefined
  const resolvedSrc = assetPath(src)

  useEffect(() => {
    setLoaded(false)
    const video = videoRef.current
    if (video && video.readyState >= 2) {
      setLoaded(true)
    }
  }, [resolvedSrc])

  function togglePlayback() {
    const video = videoRef.current
    if (!video) {
      console.warn("Could not toggle video playback because the video element was not available.")
      return
    }

    if (video.paused) {
      video.play().catch((error) => console.warn("Could not play video.", error))
      return
    }

    video.pause()
  }

  function openExpandedVideo() {
    videoRef.current?.pause()
    setIsExpanded(true)
  }

  function closeExpandedVideo() {
    setIsExpanded(false)
    requestAnimationFrame(() => {
      videoRef.current?.play().catch((error) => console.warn("Could not resume video.", error))
    })
  }

  return (
    <motion.div
      className={cn("w-full rounded-2xl media-loading-frame frost-media video-surface", !loaded && "content-loading-frame", className)}
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
        ref={videoRef}
        src={resolvedSrc}
        autoPlay
        controls={false}
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLoaded(true)}
        onCanPlay={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className={cn("block w-full h-auto rounded-2xl", loaded ? "media-loaded" : "media-pending")}
        style={{ objectPosition }}
      />
      <VideoToolbar
        isExpanded={false}
        isPlaying={isPlaying}
        onToggleExpanded={openExpandedVideo}
        onTogglePlaying={togglePlayback}
      />
      {isExpanded && (
        <VideoOverlay
          src={resolvedSrc}
          label="ThoughtSpot case study video"
          objectPosition={objectPosition}
          onClose={closeExpandedVideo}
        />
      )}
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
  { id: "retro", num: 6, label: "In hindsight" },
  { id: "learnings", num: 7, label: "Learnings" },
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
    <div className="thoughtspot-case-study relative" style={{ overflowX: "clip" }}>
      {/* Back */}
      <section className="pt-20 md:pt-24">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <Link to="/" className="back-link" data-cursor="none">
            Back to work
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-6 pb-8 md:pt-8 md:pb-10 relative">
        <div className="waypoint-3d" data-x-desktop="0.85" data-y-desktop="0.4" data-x-mobile="0.5" data-y-mobile="0.25" data-z-depth="-150" />
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-4" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER }}>
            ThoughtSpot Mobile
          </motion.p>
          <motion.h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.04em] leading-[0.99] max-w-[860px]" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE_ENTER }}>
            Analytics that move at the <span className="heading-italic">speed</span> of work.
          </motion.h1>
          <motion.p className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[680px]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}>
            A mobile analytics experience for liveboards, natural-language answers, drilldowns, and KPI watchlists. Designed so decisions can happen securely, wherever work happens.
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

      <CaseStory
        title="From viewer to decision loop"
        lead="This project was about making mobile analytics feel useful in the moments between meetings. Less waiting. Less decoding. More confidence to act."
        items={SUMMARY}
      />

      {/* Hero image */}
      <section className="pb-8">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <SectionImage src="/assets/images/1GW8AENYNU5gayo8utt1YsKnfY.jpg" alt="ThoughtSpot Mobile overview" loading="eager" />
        </div>
      </section>

      {/* Sticky Section Nav */}
      <CaseStudyNav sections={SECTIONS} />

      {/* Outcomes */}
      <section className="py-10 md:py-14" id="outcomes">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Clearer mobile work showed up in <span className="heading-italic">usage</span>.
          </motion.h2>
          <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[680px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            I keep the proof close to metrics teams already watch: adoption, app quality, acquisition, and core task coverage.
          </motion.p>
          <CaseEvidenceStrip items={OUTCOMES} />
          <SectionImage src="/assets/images/uGueO4PFCfSuGeGcj4lbKrjB4Mg.webp" alt="Outcomes navigation" className="mb-4" loading="eager" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionImage src="/assets/images/jLhitZnlkZ9Y0R6MFifDKQr8NY.webp" alt="Outcomes detail" />
            <SectionImage src="/assets/images/3Df7nprnGZRaZrJyjcOxU2YVZY.webp" alt="Outcomes metrics" />
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="py-10 md:py-14 relative" id="context">
        <div className="waypoint-3d" data-x-desktop="0.2" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="150" />
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Context</motion.p>
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Analytics, <span className="heading-italic">wherever</span> work happens
          </motion.h2>
          <motion.p className="text-[15px] text-muted-foreground mb-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Liveboards, natural-language answers, and KPI monitoring came together in a mobile experience built for quick, confident decisions.
          </motion.p>
          <SectionImage src="/assets/images/b9abnddOjscCPgIGp9S4ltGVYt0.webp" alt="Context overview" className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <SectionImage src="/assets/images/Qtiy69qOTZTOI1o5KVMD9jpo1r0.webp" alt="Context before" />
            <SectionImage src="/assets/images/DkWSGCTDdRuWrzPZeMKKEBLg0ew.webp" alt="Context after" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-4">
            {[
              { q: "What was happening before?", a: "The app worked as a view-only companion, but it did not feel fast enough for short mobile sessions." },
              { q: "Why did it need to change?", a: "Users needed quick chart edits, fewer steps, native iOS patterns, SSO confidence, and clearer feedback when asking questions in natural language." },
              { q: "What principles guided decisions?", a: "Clarity, responsiveness, familiar metaphors, fluid motion, optional sensory feedback, and visible system state guided the details." },
              { q: "What outcomes were targeted?", a: "Fewer steps, fewer errors, faster time to insight, cleaner tokens, better accessibility, and more reliable performance across devices." },
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
              How might we make mobile analytics fast enough to use between meetings, while keeping liveboards, natural-language answers, KPI monitoring, and enterprise trust in one coherent system?
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-14" id="process">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Process</motion.p>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            A six-stage path kept the work grounded: audit the gaps, map the system, explore the flows, test the states, refine the motion, and hand off with enough detail to build.
          </motion.p>
          <SectionImage src="/assets/images/cgpyV6m3F7GbfMwo85VgSfLFrqs.webp" alt="Six-stage design process" />
        </div>
      </section>

      {/* Design Tenets */}
      <section className="py-10 md:py-14 relative" id="tenets">
        <div className="waypoint-3d" data-x-desktop="0.8" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="-100" />
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
            <SectionImage src="/assets/images/bqWNGldH6ksYT40vmjCt1jEazOo.webp" alt="Splash screen design" />
            <SectionImage src="/assets/images/DvLNSxogWdLeZZfn35uY9Qow.webp" alt="Splash iterations" />
          </div>
          <SectionVideo src="/assets/videos/9bxlnoBWJxlLHAX8yU4BZd6QdHk.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Gap", text: "No launch screen meant a lost brand moment and unclear app start feedback." },
            { label: "Intent", text: "Communicate system vitality immediately without adding wait time or visual noise." },
            { label: "Decision", text: "Animate logo lines as bar charts so loading felt tied to the product instead of generic progress." },
            { label: "Measure", text: "Track time to first interaction and launch drop-off against a sub-three-second perceived target." },
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
            <SectionImage src="/assets/images/b7742pYl5LTqMshkmzd3upHOtw.webp" alt="Watchlist explorations" />
            <SectionImage src="/assets/images/CeluGI9etrRb63ETxUc1Q8OSo.webp" alt="Watchlist final" />
          </div>
          <FeatureDetail items={[
            { label: "Gap", text: "A view-only watchlist limited actionability and pushed users back to desktop." },
            { label: "Intent", text: "Enable quick KPI updates during short mobile sessions with minimal steps." },
            { label: "Decision", text: "Unify add, edit, and delete into one reachable flow with clear recovery states." },
            { label: "Measure", text: "Evaluate task success, completion time, error recovery, and feature adoption." },
          ]} />
        </div>
      </section>

      {/* Voice input */}
      <section className="py-10 md:py-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Voice input for AI answers</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Voice input made natural-language analysis faster when typing slowed the moment down.
          </motion.p>
          <SectionVideo src="/assets/videos/FWVbGPRDWHA9zeBpF4CbGsj1LA.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Gap", text: "Text-only input slowed exploratory queries when speaking was faster than typing." },
            { label: "Intent", text: "Add microphone entry and state clarity to shorten question-to-answer cycles." },
            { label: "Decision", text: "Refine idle, listening, thinking, success, and error states through more than 30 iterations." },
            { label: "Measure", text: "Watch voice-query completion, recovery from errors, and time from question to chart." },
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
            { label: "Gap", text: "The basic header lost title clarity as people moved through long mobile lists." },
            { label: "Intent", text: "Improve title readability while scrolling and reduce navigation mistakes." },
            { label: "Decision", text: "Prototype six to seven glass, solid, and tinted header flows with large-title collapse." },
            { label: "Measure", text: "Check title legibility, navigation errors, and content reach on long lists." },
          ]} />
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-10 md:py-14">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h3 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Advanced Filters</motion.h3>
          <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Mobile-first filtering that kept the power of desktop filters without making the phone feel heavy.
          </motion.p>
          <SectionVideo src="/assets/videos/PweIRReRx2pW53VpnfzIDuKOzY.mp4" className="mb-6" />
          <FeatureDetail items={[
            { label: "Gap", text: "Mobile filters were basic while web offered richer multi-facet workflows." },
            { label: "Intent", text: "Deliver advanced filtering on mobile without sacrificing speed or context." },
            { label: "Decision", text: "Compare page, modal, and hybrid models, then refine the one that preserved context best." },
            { label: "Measure", text: "Track task success, multi-facet edit time, step count, and perceived performance." },
          ]} />
        </div>
      </section>

      <CaseRetro
        id="retro"
        lead="I am proud of what shipped here, but a few calls do not hold up. I leaned on launch numbers, left the charts and accessibility unexamined, and set a speed target that was too soft to mean much."
        items={RETRO}
      />

      {/* Learnings */}
      <section className="py-10 md:py-14" id="learnings">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            What the work <span className="heading-italic">clarified</span>
          </motion.h2>
          <motion.p className="text-[15px] text-muted-foreground mb-8 max-w-[680px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            The most useful lessons were not about making screens prettier. They were about removing ambiguity before it became product debt.
          </motion.p>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {LEARNINGS.map((l) => (
              <motion.div key={l.title} variants={fadeUp} className="border-t border-border/55 pt-4">
                {l.image && <img src={assetPath(l.image)} alt={l.title} className="w-full aspect-[4/3] object-cover rounded-2xl frost-media mb-4" loading="lazy" />}
                <h3 className="text-[14px] font-semibold mb-1">{l.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{l.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
    </PageTransition>
  )
}
