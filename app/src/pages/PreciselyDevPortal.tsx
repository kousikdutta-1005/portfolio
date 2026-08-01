import { Link } from "react-router-dom"
import { AnimatePresence, motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { CircleCheck, FileText, Gauge, ListChecks, Monitor, PlaySquare, WandSparkles, Workflow, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { VideoToolbar } from "@/components/VideoToolbar"
import { VideoOverlay } from "@/components/VideoOverlay"
import { PageTransition } from "@/components/PageTransition"
import { CaseStudyNav, type CaseStudyNavSection } from "@/components/CaseStudyNav"
import { CaseRetro, type CaseRetroItem } from "@/components/CaseRetro"
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

type MediaSlot = {
  title: string
  caption: string
  alt: string
  src?: string
  darkSrc?: string
  type?: "image" | "video"
}

const MEDIA = {
  cover: {
    title: "Hero visual",
    caption: "A clearer way for developers to try Precisely location APIs before they build.",
    alt: "Precisely Developer Portal interface used as the hero visual for the case study",
    src: "/assets/images/precisely-devportal/hero-visual.png",
    darkSrc: "/assets/images/precisely-devportal/hero-visual-dark.png",
    type: "image",
  },
  dataVisibility: {
    title: "Make the data visible",
    caption: "Datasets, categories, and availability appear before developers send a request.",
    alt: "Precisely Developer Portal Features page showing datasets, category tabs, and availability table",
    src: "/assets/images/precisely-devportal/data-visibility-datasets.png",
    type: "image",
  },
  realTryouts: {
    title: "Real tryouts",
    caption: "Setup, data choices, live inputs, and the response preview stay together.",
    alt: "Video of the Precisely API tryout demo workspace",
    src: "/assets/videos/precisely-devportal/real-tryout.mp4",
    type: "video",
  },
  startingSimple: {
    title: "Reverse Geocode",
    caption: "Reverse Geocode became the simplest place to check inputs, map behavior, and results.",
    alt: "Video of the Reverse Geocode demo validating coordinate input and map output",
    src: "/assets/videos/precisely-devportal/reverse-geocode.mp4",
    type: "video",
  },
  simplerMaps: {
    title: "Time Zone and Wi-Fi",
    caption: "Time Zone and Wi-Fi kept the map useful without making the experience heavy.",
    alt: "Video of Time Zone and Wi-Fi demos using lightweight map context",
    src: "/assets/videos/precisely-devportal/timezone-wifi.mp4",
    type: "video",
  },
  geotax: {
    title: "GeoTAX",
    caption: "GeoTAX tested dense setup and harder-to-read results.",
    alt: "Video of the GeoTAX API demo with configuration and map output",
    src: "/assets/videos/precisely-devportal/geotax.mp4",
    type: "video",
  },
  controlPower: {
    title: "Emergency Info",
    caption: "Emergency Info showed advanced controls only where they helped.",
    alt: "Video of the Emergency Info demo with map context and emergency-service boundary feedback",
    src: "/assets/videos/precisely-devportal/emergency-info.mp4",
    type: "video",
  },
} satisfies Record<string, MediaSlot>

const PLATFORM_SHIFT_SCREENS: MediaSlot[] = [
  {
    title: "Old portal",
    src: "/assets/images/precisely-devportal/platform-old-portal.png",
    alt: "Old Precisely APIs portal showing an Explore APIs grid",
    caption: "Old portal (https://developer.precisely.com/apis)",
    type: "image",
  },
  {
    title: "Cloud portal",
    src: "/assets/images/precisely-devportal/platform-cloud-portal.png",
    alt: "Cloud Precisely Developer Portal showing the Address Autocomplete demo",
    caption: "Cloud portal (https://developer.cloud.precisely.com/)",
    type: "image",
  },
]

const DEMO_ILLUSION_SCREENS: MediaSlot[] = [
  {
    title: "Emergency Info API",
    src: "/assets/images/precisely-devportal/demo-illusion-emergency-info.png",
    alt: "Emergency Info API old portal map demo",
    caption: "Emergency Info API (Old Portal)",
    type: "image",
  },
  {
    title: "Fixed inputs and disabled fields",
    src: "/assets/images/precisely-devportal/demo-illusion-disabled-fields.png",
    caption: "Fixed inputs, disabled fields",
    alt: "Emergency Info API old portal fixed input state",
    type: "image",
  },
]

const META = [
  { label: "Client", value: "Precisely" },
  { label: "Role", value: "Product design, systems" },
  { label: "Scope", value: "Developer portal demos" },
  { label: "Timeline", value: "August to October 2025" },
]

type SummaryItem = {
  label: string
  text: string
}

const SUMMARY: SummaryItem[] = [
  {
    label: "Problem",
    text: "Developers could see demos, but they still had to work too hard to know if an API fit.",
  },
  {
    label: "Shift",
    text: "The work moved from separate demo screens to one clear pattern they could all share.",
  },
  {
    label: "Designed",
    text: "A workspace where developers could see the data, enter real inputs, use the map, send requests, and read results without losing context.",
  },
  {
    label: "Result",
    text: "Five APIs now use the pattern. The next APIs have a clear place to go.",
  },
]

const OUTCOME_PROOF = [
  { value: "2", label: "Baseline coverage", desc: "Old and cloud portals compared to find repeated evaluation friction." },
  { value: "5", label: "API coverage", desc: "Pattern tested across five high-variance APIs before treating it as reusable." },
  { value: "1", label: "Task continuity", desc: "Data, inputs, maps, requests, and results stay in one evaluation flow." },
  { value: "3", label: "Reuse pipeline", desc: "Three next APIs already mapped to reduce future rollout and rework risk." },
]

const STORY_GUARDS = [
  { title: "Why now", desc: "The cloud migration gave the team a clean moment to rethink the demo experience instead of carrying old behavior forward." },
  { title: "What changed", desc: "The demo stopped being a static example and became a place to try real inputs, understand data, and read the result." },
  { title: "Why it scales", desc: "Each API can keep its own behavior while reusing the same page logic, so new demos do not start from zero." },
]

const PATTERN_SMELLS = [
  { title: "It looked interactive, but stayed locked", desc: "Predefined examples and disabled fields made the old demos feel interactive without letting people try real scenarios." },
  { title: "The story broke across pages", desc: "Docs, tryout controls, maps, and results lived in separate places." },
  { title: "Maps changed from API to API", desc: "Some APIs needed maps, some needed tables, and some needed more setup, but there was no shared flow." },
  { title: "The result did not explain enough", desc: "Responses appeared as raw results, not as evidence a developer could read, compare, and trust." },
]

const SYSTEM_RULES = [
  { title: "Keep the work in one place", desc: "Keep context, inputs, requests, maps, and results close enough that the user never loses the thread." },
  { title: "Let people try real inputs", desc: "A demo only earns trust when developers can test their own coordinates, addresses, datasets, and filters." },
  { title: "Start simple, then add control", desc: "Show advanced choices only when the API actually needs them." },
  { title: "Keep one shared shape", desc: "Make the experience feel familiar while still letting each API show what makes it different." },
]

const LEARNINGS = [
  { title: "Demos should help people decide", desc: "A demo should help someone understand fit, not just prove that an API exists." },
  { title: "Framing comes before polish", desc: "The useful move was finding the repeated problem and turning it into a pattern the team could reuse." },
  { title: "Prototypes made the pattern easier to check", desc: "AI-assisted front-end work helped test ideas in code quickly, but the clarity still had to come from the product decisions." },
]

type BrokenFlowNodeData = {
  index: string
  title: string
  detail: string
  icon: typeof FileText
  emphasis?: boolean
}

const BROKEN_FLOW_STEPS: BrokenFlowNodeData[] = [
  {
    index: "01",
    title: "Docs",
    detail: "API meaning elsewhere.",
    icon: FileText,
  },
  {
    index: "02",
    title: "Demos",
    detail: "Locked examples.",
    icon: PlaySquare,
  },
  {
    index: "03",
    title: "Tryout",
    detail: "Separate flow.",
    icon: Monitor,
    emphasis: true,
  },
  {
    index: "04",
    title: "Evaluate",
    detail: "Unclear output.",
    icon: ListChecks,
  },
  {
    index: "05",
    title: "Build",
    detail: "Decision stalls.",
    icon: Wrench,
  },
]

const SYSTEM_SCALE_STAGES = [
  {
    title: "Completed",
    icon: CircleCheck,
    items: ["Reverse Geocode", "Time Zone", "Wi-Fi", "GeoTAX", "Emergency Info"],
  },
  {
    title: "In Progress",
    icon: Gauge,
    items: ["Search at Location", "Search Nearby"],
  },
  {
    title: "Planned",
    icon: Workflow,
    items: ["Travel Boundary", "Summarize", "Calculate Overlap"],
  },
  {
    title: "Future",
    icon: WandSparkles,
    items: ["More APIs to come"],
  },
]

const DESIGN_STEPS = [
  {
    title: "Making the data visible",
    desc: "Datasets, categories, and attributes moved up front, so developers could understand what they were about to use.",
    media: MEDIA.dataVisibility,
  },
  {
    title: "Real tryouts",
    desc: "The tryout pattern kept setup, data choices, inputs, and the response preview together, so developers did not have to remember details from another page.",
    media: MEDIA.realTryouts,
  },
  {
    title: "Reverse Geocode",
    desc: "Reverse Geocode gave me the simplest place to test the pattern: one clear input, one map, and one result.",
    media: MEDIA.startingSimple,
  },
  {
    title: "Time Zone and Wi-Fi",
    desc: "These APIs needed map context, but not a heavy map experience. The map stayed useful and quiet.",
    media: MEDIA.simplerMaps,
  },
  {
    title: "GeoTAX",
    desc: "GeoTAX tested the other end: more setup, more choices, and results that needed careful explanation.",
    media: MEDIA.geotax,
  },
  {
    title: "Emergency Info",
    desc: "Emergency Info showed more control only where it helped the user understand boundaries and next steps.",
    media: MEDIA.controlPower,
  },
]

const RETRO: CaseRetroItem[] = [
  {
    claim: "I reported coverage counts, not whether developers decided faster",
    shipped:
      "I presented five APIs on the pattern and three more mapped as proof it worked. Those are counts of what I built, not evidence that a single developer evaluated an API faster or reached a confident yes or no.",
    better:
      "Pick one activation signal, a developer reaching a result they trust, and define it before building. Watch it as a signal, not a target, and compare it against the old portal, so I learn whether evaluation got faster instead of counting APIs shipped.",
    article: { title: "When the Metric Becomes the Target", to: "/journal/when-the-metric-lies" },
  },
  {
    claim: "I never measured time to a developer's first real result",
    shipped:
      "The workspace lets a developer enter inputs, send a request, and read a result, but I never timed how long a new developer takes to reach a first correct response. I assumed the flow was fast enough and never checked.",
    better:
      "Instrument time to a first successful request and treat that moment as the point the demo earns its keep. Watch new developers reach it in a session, then cut or reorder every step before it that does not help them get there.",
    article: { title: "The First Five Minutes", to: "/journal/the-first-five-minutes" },
  },
  {
    claim: "I designed the tryout but not how developers find the right API",
    shipped:
      "I put my effort into the workspace inside each API and left the names and grouping that lead people to the right one as they were. A developer who does not already know that Reverse Geocode or GeoTAX fits can still walk the wrong way.",
    better:
      "Run an open card sort and a tree test on the API names and categories before design, so the words match what developers call the job. Then check first click success on a text only version of the menu before I style anything.",
    article: { title: "Naming Is the Architecture", to: "/journal/naming-is-the-architecture" },
  },
  {
    claim: "I called the pattern reusable but never designed its configuration",
    shipped:
      "I proved the pattern across five APIs and said the next demos would reuse the same page logic. I never defined the set of options the next engineer fills in, so each new API can bend the pattern a slightly different way.",
    better:
      "Define the pattern's inputs as a small closed set of named options instead of open flags, so a contradictory setup cannot be written down. Write out what the pattern will refuse to do before the next three APIs are added to it.",
    article: { title: "A Component's Props Are a User Interface", to: "/journal/component-api-design" },
  },
]

const SECTIONS: CaseStudyNavSection[] = [
  { id: "outcomes", num: 1, label: "Impact" },
  { id: "context", num: 2, label: "Context" },
  { id: "diagnosis", num: 3, label: "Diagnosis" },
  { id: "system", num: 4, label: "System" },
  { id: "design", num: 5, label: "Execution" },
  { id: "scale", num: 6, label: "Scale" },
  { id: "retro", num: 7, label: "In hindsight" },
  { id: "learnings", num: 8, label: "Takeaways" },
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
        <motion.div key={item.title} variants={fadeUp} className="border-t border-border/55 pt-4">
          <h3 className="text-[14px] font-semibold mb-1.5">{item.title}</h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function CaseStory({ items }: { items: SummaryItem[] }) {
  return (
    <motion.section
      className="precisely-story-section pb-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <div className="precisely-story-layout">
          <motion.div variants={fadeUp} className="precisely-story-lead">
            <h2>The shift</h2>
            <p>Developers did not need another polished example. They needed one place to understand the data, try their own inputs, and know whether the API made sense for their work.</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="precisely-story-points" aria-label="Case summary">
            {items.map((summaryItem) => (
              <motion.article key={summaryItem.label} variants={fadeUp} className="precisely-story-point">
                <h3>{summaryItem.label}</h3>
                <p>{summaryItem.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

function EvidenceStrip({ items }: { items: { value: string; label: string; desc: string }[] }) {
  return (
    <motion.div
      className="precisely-evidence-strip"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="Evidence from the case study"
    >
      {items.map((item) => (
        <motion.div key={item.label} variants={fadeUp} className="precisely-evidence-item">
          <span>{item.value}</span>
          <h3>{item.label}</h3>
          <p>{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

function BrokenFlowNodeCard({ data }: { data: BrokenFlowNodeData }) {
  const Icon = data.icon

  return (
    <div className={cn("broken-flow-node-card", data.emphasis && "is-emphasis")}>
      <div className="broken-flow-node-topline">
        <span>{data.index}</span>
        <div className="broken-flow-node-icon">
          <Icon aria-hidden="true" strokeWidth={2.15} />
        </div>
      </div>
      <strong>{data.title}</strong>
      <p>{data.detail}</p>
    </div>
  )
}

function BrokenFlowDiagram() {
  return (
    <motion.figure
      className="broken-flow-figure"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <div
        className="broken-flow-board"
        aria-label="Broken evaluation flow showing documentation, demos, tryout, evaluation, and implementation with a context lost loop."
      >
        <div className="broken-flow-canvas">
          <div className="broken-flow-path">
            {BROKEN_FLOW_STEPS.map((step, index) => (
              <div key={step.title} className="broken-flow-step">
                <BrokenFlowNodeCard data={step} />
                {index < BROKEN_FLOW_STEPS.length - 1 && <span className="broken-flow-arrow" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="broken-flow-loop" aria-hidden="true">
            <span>Context lost</span>
            <strong>Back to docs</strong>
          </div>
        </div>
      </div>
      <figcaption className="precisely-media-caption">
        Understanding an API required switching between demos, separate tryout pages, and external documentation, preventing developers from forming a complete mental model in a single place.
      </figcaption>
    </motion.figure>
  )
}

function WhatChangedChart() {
  return (
    <motion.figure
      className="precisely-chart-figure"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <div className="precisely-chart-surface what-changed-chart">
        <div className="precisely-chart-header">
          <h3>Before and after</h3>
        <p>The shape of the work changed: new APIs could fit predictably and avoid a fresh redesign.</p>
        </div>
        <div className="what-changed-body" aria-label="Before, every API needed a fresh demo. After, new APIs reuse the pattern.">
          <div className="what-changed-point is-before">
            <span>Before</span>
            <strong>Every API needed a fresh demo</strong>
          </div>
          <svg className="what-changed-arc" viewBox="0 0 360 180" role="img" aria-hidden="true">
            <defs>
              <marker id="whatChangedArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M1.5 1.5 L8.5 5 L1.5 8.5" />
              </marker>
            </defs>
            <path d="M20 126 C78 70 226 54 326 72" markerEnd="url(#whatChangedArrow)" />
          </svg>
          <div className="what-changed-point is-after">
            <span>After</span>
            <strong>New APIs reuse the pattern</strong>
          </div>
        </div>
      </div>
      <figcaption className="precisely-media-caption">The change was simple to explain: new APIs could reuse the pattern instead of becoming one-off demo redesigns.</figcaption>
    </motion.figure>
  )
}

function SystemScaleChart() {
  return (
    <motion.figure
      className="precisely-chart-figure"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <div className="precisely-chart-surface system-scale-chart">
        <div className="system-scale-scroller" aria-label="System scale across completed, in-progress, planned, and future APIs.">
          <div className="system-scale-timeline">
            {SYSTEM_SCALE_STAGES.map((stage) => {
              const Icon = stage.icon

              return (
                <div key={stage.title} className="system-scale-stage">
                  <div className="system-scale-icon">
                    <Icon aria-hidden="true" strokeWidth={2.2} />
                  </div>
                  <h4>{stage.title}</h4>
                  <ul>
                    {stage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <figcaption className="precisely-media-caption">Completed work, active work, planned work, and future APIs all use the same underlying model.</figcaption>
    </motion.figure>
  )
}

function CaseMedia({ item, className }: { item: MediaSlot; className?: string }) {
  const [loaded, setLoaded] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const mediaRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const shouldLoadVideo = useInView(mediaRef, { once: true, margin: "360px 0px" })

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

  if (!item.src) {
    return null
  }

  const resolvedSrc = assetPath(item.src)

  return (
    <motion.figure
      className={cn("precisely-media-figure frost-media content-loading-frame", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <div
        ref={mediaRef}
        className={cn("precisely-media-image-wrap", item.type === "video" && "video-surface")}
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
        {item.type === "video" && shouldLoadVideo ? (
          <>
            <video
              ref={videoRef}
              src={resolvedSrc}
              aria-label={item.alt}
              autoPlay
              controls={false}
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              loop
              muted
              playsInline
              preload="auto"
              onLoadedMetadata={() => setLoaded(true)}
              onLoadedData={() => setLoaded(true)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className={cn("precisely-media-image", loaded ? "media-loaded" : "media-pending")}
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
                label={item.alt}
                onClose={closeExpandedVideo}
              />
            )}
          </>
        ) : item.type === "video" ? (
          <div className="precisely-media-image precisely-media-video-placeholder" aria-label={item.alt} />
        ) : (
          <>
            <img
              src={assetPath(item.src)}
              alt={item.alt}
              onLoad={() => setLoaded(true)}
              className={cn("precisely-media-image", item.darkSrc && "precisely-theme-media-light", loaded ? "media-loaded" : "media-pending")}
              loading="eager"
            />
            {item.darkSrc && (
              <img
                src={assetPath(item.darkSrc)}
                alt={item.alt}
                onLoad={() => setLoaded(true)}
                className={cn("precisely-media-image precisely-theme-media-dark", loaded ? "media-loaded" : "media-pending")}
                loading="eager"
              />
            )}
          </>
        )}
      </div>
      <figcaption className="precisely-media-caption">{item.caption}</figcaption>
    </motion.figure>
  )
}

function CompareMedia({
  screens,
  caption,
}: {
  screens: MediaSlot[]
  caption: string
}) {
  const availableScreens = screens.filter((screen): screen is MediaSlot & { src: string } => Boolean(screen.src))

  if (availableScreens.length === 0) {
    return null
  }

  return (
    <motion.figure
      className="precisely-media-figure frost-media"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <div className="precisely-platform-compare">
        {availableScreens.map((screen) => (
          <div key={screen.title} className="precisely-platform-panel">
            <div className="precisely-media-image-wrap">
              <img
                src={assetPath(screen.src)}
                alt={screen.alt}
                className="precisely-media-image"
                loading="eager"
              />
            </div>
            <p>{screen.caption}</p>
          </div>
        ))}
      </div>
      <figcaption className="precisely-media-caption">{caption}</figcaption>
    </motion.figure>
  )
}

export default function PreciselyDevPortalPage() {
  return (
    <PageTransition>
      <Seo
        title="Precisely Developer Portal Case Study - Kousik Dutta"
        description="A product design case study on turning fragmented location API demos into a clearer tryout pattern for Precisely."
        path="/case-study/precisely-devportal"
        image="https://kousikdutta.com/assets/images/precisely-devportal/api-catalog.png"
      />
      <div className="relative precisely-case-study" style={{ overflowX: "clip" }}>
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
          <div className="waypoint-3d" data-x-desktop="0.85" data-y-desktop="0.4" data-x-mobile="0.5" data-y-mobile="0.25" data-z-depth="-150" />
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
              Helping developers try location APIs before they <span className="heading-italic">build</span>.
            </motion.h1>
            <motion.p
              className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[700px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}
            >
              Precisely’s location API demos moved from disconnected examples into a clearer flow for understanding data, testing real inputs, reading outputs, and deciding whether an API fits.
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

        <div className="relative">
          <div className="waypoint-3d" data-x-desktop="0.2" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.35" data-z-depth="150" />
          <CaseStory items={SUMMARY} />
        </div>

        <section className="pb-8">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <CaseMedia item={MEDIA.cover} className="precisely-hero-media" />
          </div>
        </section>

        <CaseStudyNav sections={SECTIONS} />

        <section className="py-10 md:py-14" id="outcomes">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The demos became easier to <span className="heading-italic">follow</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The proof stayed practical: baseline coverage, API coverage, task continuity, and reuse pipeline. Those are product metrics a developer platform team can keep tracking after launch.
            </motion.p>
            <EvidenceStrip items={OUTCOME_PROOF} />
            <WhatChangedChart />
          </div>
        </section>

        <section className="py-10 md:py-14 relative" id="context">
          <div className="waypoint-3d" data-x-desktop="0.8" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="-100" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The portal shift opened the right <span className="heading-italic">question</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Precisely was moving from an older on-prem developer portal to a cloud portal. That migration created a clean moment to question the demos themselves: were they helping developers decide, or just showing that the APIs existed?
            </motion.p>
            <div className="precisely-context-stack">
              <CompareMedia
                screens={PLATFORM_SHIFT_SCREENS}
                caption="The move to the cloud portal gave the team a clean moment to rethink API evaluation instead of simply porting old demo behavior forward."
              />
              <CompareMedia
                screens={DEMO_ILLUSION_SCREENS}
                caption="The old demos looked interactive, but fixed examples and locked fields meant developers could not test real scenarios or trust the result."
              />
              <BrokenFlowDiagram />
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 relative" id="diagnosis">
          <div className="waypoint-3d" data-x-desktop="0.2" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="100" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The same break kept appearing in the learning <span className="heading-italic">flow</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The same failures appeared across portal versions and API types. That made the work bigger than cleanup. The demos needed a shared pattern that could teach developers how each API worked.
            </motion.p>
            <OpenGrid items={PATTERN_SMELLS} />
            <motion.div className="mt-8 border-t border-border/55 pt-5" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h3 className="text-[18px] md:text-[20px] font-bold tracking-[-0.02em] mb-2">What had to be true</h3>
              <p className="text-[14px] text-muted-foreground leading-relaxed mb-5 max-w-[660px]">
                The story had to connect the timing, the design change, and the reason the pattern could carry future APIs.
              </p>
              <OpenGrid items={STORY_GUARDS} />
            </motion.div>
          </div>
        </section>

        <section className="py-10 md:py-14 relative" id="system">
          <div className="waypoint-3d" data-x-desktop="0.8" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="-150" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              One workspace, flexible enough for each <span className="heading-italic">API</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The pattern had to stay familiar from demo to demo, while still giving each API room to explain what made it different.
            </motion.p>
            <OpenGrid items={SYSTEM_RULES} />
          </div>
        </section>

        <section className="py-10 md:py-14 relative" id="design">
          <div className="waypoint-3d" data-x-desktop="0.2" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The pattern was tested against real API <span className="heading-italic">complexity</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              One polished demo would not have been enough. The pattern had to work across data discovery, a general tryout flow, simple geocoding, lightweight map APIs, dense tax setup, and emergency-service workflows.
            </motion.p>
            <div className="space-y-8">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">{DESIGN_STEPS[0].title}</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5 max-w-[680px]">{DESIGN_STEPS[0].desc}</p>
                <CaseMedia item={DESIGN_STEPS[0].media} />
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">{DESIGN_STEPS[1].title}</h3>
                <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5 max-w-[680px]">{DESIGN_STEPS[1].desc}</p>
                <CaseMedia item={DESIGN_STEPS[1].media} />
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {DESIGN_STEPS.slice(2, 4).map((item) => (
                  <motion.div key={item.title} variants={fadeUp}>
                    <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">{item.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">{item.desc}</p>
                    <CaseMedia item={item.media} />
                  </motion.div>
                ))}
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                {DESIGN_STEPS.slice(4).map((item) => (
                  <motion.div key={item.title} variants={fadeUp}>
                    <h3 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">{item.title}</h3>
                    <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">{item.desc}</p>
                    <CaseMedia item={item.media} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 relative" id="scale">
          <div className="waypoint-3d" data-x-desktop="0.8" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.5" data-z-depth="-100" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The next API had a place to <span className="heading-italic">go</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Once the pattern worked across five APIs, the next question was scale. The same structure could carry in-progress, planned, and future APIs without redesigning the tryout experience each time.
            </motion.p>
            <SystemScaleChart />
          </div>
        </section>

        <CaseRetro
          id="retro"
          lead="I am proud of the tryout pattern, but proud is not the same as proven. These are the four places where I mistook building the thing for showing it worked, and what I would test now."
          items={RETRO}
        />

        <section className="py-10 md:py-14" id="learnings">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What the work <span className="heading-italic">shows</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[720px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              This case study is not about making API screens prettier. It is about making a complex product easier to understand, try, and trust.
            </motion.p>
            <OpenGrid items={LEARNINGS} />
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
