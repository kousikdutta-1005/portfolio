import { motion, useScroll, useMotionValueEvent, useSpring, useReducedMotion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { PageTransition } from "@/components/PageTransition"
import { useState, useRef } from "react"
import { useTheme } from "@/components/theme-context"
import { Seo } from "@/components/Seo"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const
const DURATION_REVEAL = 0.6
const STAGGER = 0.08

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
}

const AWARDS = [
  { title: "2x University Gold Medal", sub: "Best Design and Overall Student" },
  { title: "Winner", sub: "D'source Design Challenge 2022" },
  { title: "CII Young Designer Awards 2022", sub: "" },
  { title: "Honorable Mention", sub: "Student Service Design Challenge 2022" },
  { title: "Design Excellence Award", sub: "Dean's List 2021" },
]

const VALUES = [
  { title: "Thoughtful framing", desc: "I make the real problem visible before anyone falls in love with a solution." },
  { title: "Calm craft", desc: "I shape flows, hierarchy, and states until the product feels obvious and trustworthy." },
  { title: "Buildable direction", desc: "I prototype with AI-assisted code so the idea can be tested, not just admired." },
  { title: "Real-world systems", desc: "Edge cases, accessibility, and handoff stay inside the work from the start." },
]

const EXPERIENCE = [
  {
    period: "2024 to present",
    role: "UX Designer",
    company: "Precisely",
    desc: "Designing data-integrity workflows with clearer systems, tighter handoff, and faster prototype loops.",
  },
  {
    period: "2023 to 2024",
    role: "Product Designer",
    company: "ThoughtSpot",
    desc: "Designed mobile analytics experiences across KPI watchlists, AI input states, native navigation, and advanced filters.",
  },
  {
    period: "2022 to 2024",
    role: "Freelance Designer",
    company: "Multiple brands",
    desc: "Partnered with teams on workshops, product flows, and interface systems when clarity and speed mattered.",
  },
  {
    period: "2021 to 2023",
    role: "Internships",
    company: "Philips, OLX, Airtel, Vedantu",
    desc: "Built research depth and production-facing UX craft across healthcare, service design, telecom, commerce, and learning.",
  },
]

/* ── Story Cube Data ── */

const STORY_CHAPTERS = [
  {
    label: "Thought",
    heading: ["Thoughts", "First."],
    text: "I start by making vague product problems legible. The work gets better when the decision gets clearer.",
  },
  {
    label: "Craft",
    heading: ["Craft", "Second."],
    text: "Then I turn direction into calm interfaces, tight systems, and product moments people can trust.",
  },
  {
    label: "Build",
    heading: ["Build", "Third."],
    text: "AI-assisted code helps me make the idea real faster, so teams can feel the product before committing to it.",
  },
  {
    label: "Human",
    heading: ["Still", "Human."],
    text: "The point is not the artifact. The point is clearer decisions, better products, and work that improves everyday life.",
  },
]

/* ── Isometric Rubik's Cube → Pixel Heart ── */

const UNIT = 44
const HALF = UNIT / 2
const STRIDE = UNIT + 6 // 6px gap ensures cubes never touch

// Floating photo cards per chapter (5 cubes now)
const FLOAT_IMAGES = [
  ["/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png", "/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png", "/assets/images/a6V6C1mKD5ymefXm3kHe6GOdaE.png", "/assets/images/GLP0Z4G1xKxcD0e0TDg9EWRgzQ.png", "/assets/images/elvpFwKLIpGRQQqelaZQI5Xw.png"],
  ["/assets/images/GLP0Z4G1xKxcD0e0TDg9EWRgzQ.png", "/assets/images/NRmPx5otSD5B8RKHstn08Zcs0k.png", "/assets/images/zmHb3X25M69yV81iHU14amDoU.png", "/assets/images/elvpFwKLIpGRQQqelaZQI5Xw.png", "/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png"],
  ["/assets/images/elvpFwKLIpGRQQqelaZQI5Xw.png", "/assets/images/8LPRSiOjoKRFuwtCYe9vWT2eM.png", "/assets/images/OjaomaIcjw7zg9CMMQk4NkDOhE.png", "/assets/images/NRmPx5otSD5B8RKHstn08Zcs0k.png", "/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png"],
  ["/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png", "/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png", "/assets/images/a6V6C1mKD5ymefXm3kHe6GOdaE.png", "/assets/images/8LPRSiOjoKRFuwtCYe9vWT2eM.png", "/assets/images/GLP0Z4G1xKxcD0e0TDg9EWRgzQ.png"],
]

// 5 photo cubes — asymmetrically distributed, never overlapping center where rubiks lives
const FLOAT_POSITIONS = [
  { startX: 6, startY: 15, endX: 10, endY: 25, size: 50 },
  { startX: 78, startY: 8, endX: 82, endY: 18, size: 56 },
  { startX: 88, startY: 45, endX: 84, endY: 55, size: 44 },
  { startX: 72, startY: 78, endX: 76, endY: 82, size: 48 },
  { startX: 8, startY: 72, endX: 12, endY: 78, size: 42 },
]

// 3×3×3 grid positions centered at origin
const GRID: [number, number, number][] = []
for (let y = -1; y <= 1; y++)
  for (let z = -1; z <= 1; z++)
    for (let x = -1; x <= 1; x++)
      GRID.push([x, y, z])

// 27-cell pixel heart — spacing must be >= UNIT so cubes never overlap
const HEART_SCALE = 1.05
const HEART: [number, number][] = [
  // Row -3 (top bumps)
  [-1.5, -3], [-0.5, -3], [1.5, -3], [0.5, -3],
  // Row -2
  [-2.5, -2], [-1.5, -2], [-0.5, -2], [0.5, -2], [1.5, -2], [2.5, -2],
  // Row -1
  [-2.5, -1], [-1.5, -1], [-0.5, -1], [0.5, -1], [1.5, -1], [2.5, -1],
  // Row 0
  [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0],
  // Row 1
  [-1.5, 1], [-0.5, 1], [0.5, 1], [1.5, 1],
  // Row 2
  [-0.5, 2], [0.5, 2],
]

function prand(s: number) {
  const v = Math.sin(s * 127.1 + 311.7) * 43758.5453
  return v - Math.floor(v)
}

// Generate scatter positions with minimum spacing guarantee
function generateScatter() {
  const positions: { x: number; y: number; z: number; rx: number; ry: number }[] = []
  const minDist = UNIT * 1.4

  for (let i = 0; i < 27; i++) {
    let attempts = 0
    let px: number, py: number, pz: number
    do {
      px = (prand(i + attempts * 7) - 0.5) * 400
      py = (prand(i + 50 + attempts * 13) - 0.5) * 350
      pz = (prand(i + 200 + attempts * 3) - 0.5) * 100
      attempts++
    } while (
      attempts < 50 &&
      positions.some(p => Math.hypot(p.x - px, p.y - py) < minDist)
    )
    positions.push({
      x: px, y: py, z: pz,
      rx: (prand(i + 100) - 0.5) * 360,
      ry: (prand(i + 150) - 0.5) * 360,
    })
  }
  return positions
}
const SCATTER = generateScatter()

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp01(v: number) { return Math.max(0, Math.min(1, v)) }

function UnitCube({ x, y, z, rx, ry, isDark }: { x: number; y: number; z: number; rx: number; ry: number; isDark: boolean }) {
  // Apple HIG solid Rubik's cube colors — muted, premium
  const face = (bg: string, border: string, shadow?: string): React.CSSProperties => ({
    position: "absolute",
    width: UNIT,
    height: UNIT,
    borderRadius: 8,
    backfaceVisibility: "hidden",
    background: bg,
    border,
    boxShadow: shadow || "none",
  })

  // Brushed metal / titanium look
  const front = face(
    isDark
      ? "linear-gradient(135deg, #4a4a52 0%, #2c2c34 50%, #3d3d45 100%)"
      : "linear-gradient(135deg, #e8e8ec 0%, #d4d4da 50%, #eaeaef 100%)",
    isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.08)",
    isDark ? "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3)" : "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.04)"
  )
  const top = face(
    isDark
      ? "linear-gradient(180deg, #55555e 0%, #3a3a42 100%)"
      : "linear-gradient(180deg, #f2f2f5 0%, #dcdce2 100%)",
    isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.06)",
    isDark ? "inset 0 1px 0 rgba(255,255,255,0.18)" : "inset 0 1px 0 rgba(255,255,255,1)"
  )
  const side = face(
    isDark
      ? "linear-gradient(180deg, #3a3a42 0%, #28282e 100%)"
      : "linear-gradient(180deg, #d8d8de 0%, #c4c4cc 100%)",
    isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.05)"
  )

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: UNIT,
        height: UNIT,
        marginLeft: -HALF,
        marginTop: -HALF,
        transformStyle: "preserve-3d",
        transform: `translate3d(${x}px,${y}px,${z}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
      }}
    >
      <div style={{ ...front, transform: `translateZ(${HALF}px)` }} />
      <div style={{ ...top, transform: `rotateX(90deg) translateZ(${HALF}px)` }} />
      <div style={{ ...side, transform: `rotateY(180deg) translateZ(${HALF}px)` }} />
      <div style={{ ...side, transform: `rotateY(90deg) translateZ(${HALF}px)` }} />
      <div style={{ ...side, transform: `rotateY(-90deg) translateZ(${HALF}px)` }} />
      <div style={{ ...side, transform: `rotateX(-90deg) translateZ(${HALF}px)` }} />
    </div>
  )
}

// Floating photo cube — theme-aware styling
function PhotoCube({ src, size, x, y, rx, ry, isDark }: { src: string; size: number; x: number; y: number; rx: number; ry: number; isDark: boolean }) {
  const half = size / 2
  const imgFace: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    borderRadius: 10,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 32px rgba(0,0,0,0.1)",
  }
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
        willChange: "transform",
      }}
    >
      <div style={{ ...imgFace, transform: `translateZ(${half}px)` }}>
        <img src={assetPath(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ ...imgFace, transform: `rotateY(90deg) translateZ(${half}px)` }}>
        <img src={assetPath(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ ...imgFace, transform: `rotateY(180deg) translateZ(${half}px)` }}>
        <img src={assetPath(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ ...imgFace, transform: `rotateY(-90deg) translateZ(${half}px)` }}>
        <img src={assetPath(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ ...imgFace, transform: `rotateX(90deg) translateZ(${half}px)` }}>
        <img src={assetPath(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ ...imgFace, transform: `rotateX(-90deg) translateZ(${half}px)` }}>
        <img src={assetPath(src)} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  )
}

function StoryCubeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const prefersReducedMotion = useReducedMotion()
  const isDark = resolvedTheme === "dark"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  // Smooth scroll progress — tight tracking, minimal lag
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 50, mass: 0.2 })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(smoothProgress, "change", setProgress)

  if (prefersReducedMotion) {
    return (
      <section className="relative py-24 md:py-28">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-[clamp(3rem,7vw,4rem)] font-bold tracking-[-0.035em] leading-[1.02]">
                <span className="block">Think systems.</span>
                <span className="block text-foreground/80">Make it <span className="heading-italic">real.</span></span>
              </h1>
            </div>
            <div>
              <p className="text-[17px] leading-[1.65] text-foreground/70">
                I'm Kousik. I use design to make product decisions visible, testable, and shippable. My edge is the way I frame the problem, craft the system, and build enough to learn faster.
              </p>
              <div className="flex items-center gap-3.5 mt-6">
                <a
                  href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "default" }))}
                  aria-label="Download resume in a new tab"
                  data-cursor="none"
                >
                  Download resume
                </a>
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-[15px]"
                  aria-label="Book a call in a new tab"
                  data-cursor="none"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[13px] font-semibold text-muted-foreground mb-3">
              Recognition
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-4">
              {AWARDS.map((award) => (
                <div key={award.title} className="border-t border-border/55 pt-3">
                  <h3 className="text-[13px] font-semibold leading-tight">{award.title}</h3>
                  {award.sub && <p className="text-[12px] text-muted-foreground mt-1">{award.sub}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Simplified 3 phases: cube (0–0.3) → scatter (0.3–0.6) → heart (0.6–1.0)
  const chapter = progress < 0.2 ? 0 : progress < 0.4 ? 1 : progress < 0.6 ? 2 : 3
  const isHeart = progress >= 0.75

  // Container rotation — flatten for heart phase
  let cRx = 50, cRz = -45
  if (progress >= 0.6) {
    const ht = clamp01((progress - 0.6) / 0.2)
    cRx = lerp(50, 15, ht)
    cRz = lerp(-45, 0, ht)
  }

  // Scale: gentle ease down
  const cubeScale = progress < 0.3 ? 2.2 : lerp(2.2, 1.8, clamp01((progress - 0.3) / 0.3))

  const cubes = GRID.map(([gx, gy, gz], i) => {
    const sp = SCATTER[i]
    const hp = HEART[i]
    let x: number, y: number, z: number, rx = 0, ry = 0

    if (progress < 0.3) {
      // Phase 1: Rubik's cube — simple grid, subtle layer twist
      const twist = clamp01(progress / 0.3)
      const angle = twist * Math.PI / 3
      if (gy === -1) {
        const c = Math.cos(angle), s = Math.sin(angle)
        x = (gx * c + gz * s) * STRIDE
        z = (-gx * s + gz * c) * STRIDE
        ry = twist * 60
      } else {
        x = gx * STRIDE; z = gz * STRIDE
      }
      y = gy * STRIDE
    } else if (progress < 0.6) {
      // Phase 2: Scatter — cubes drift to random positions
      const t = clamp01((progress - 0.3) / 0.3)
      let sx = gx, sz = gz, sry = 0
      // Account for twisted layer
      if (gy === -1) {
        const c = Math.cos(Math.PI / 3), s = Math.sin(Math.PI / 3)
        sx = gx * c + gz * s
        sz = -gx * s + gz * c
        sry = 60
      }
      x = lerp(sx * STRIDE, sp.x, t)
      y = lerp(gy * STRIDE, sp.y, t)
      z = lerp(sz * STRIDE, sp.z, t)
      rx = sp.rx * t
      ry = lerp(sry, sp.ry, t)
    } else {
      // Phase 3: Heart formation
      const t = clamp01((progress - 0.6) / 0.25)
      x = lerp(sp.x, hp[0] * STRIDE * HEART_SCALE, t)
      y = lerp(sp.y, hp[1] * STRIDE * HEART_SCALE, t)
      z = lerp(sp.z, 0, t)
      rx = sp.rx * (1 - t)
      ry = sp.ry * (1 - t)
    }

    return { x, y, z, rx, ry }
  })

  // chapter -1 = hero, 0-3 = story chapters
  const showHero = chapter === 0 && progress < 0.05

  return (
    <section ref={containerRef} className="relative" style={{ height: "230vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pt-28 pb-16 md:pt-36 md:pb-20 relative z-10">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left — Big heading (hero then chapter headings) */}
            <div className="relative min-h-[260px] md:min-h-[330px]">
              {/* Hero heading */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center"
                aria-hidden={!showHero}
                animate={{
                  opacity: showHero ? 1 : 0,
                  y: showHero ? 0 : -20,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ pointerEvents: showHero ? "auto" : "none" }}
              >
                <h1 className="text-[clamp(3rem,7vw,4rem)] font-bold tracking-[-0.035em] leading-[1.02]">
                  <span className="block">Think systems.</span>
                  <span className="block text-foreground/80">Make it <span className="heading-italic">real.</span></span>
                </h1>
              </motion.div>

              {/* Chapter headings — same big style */}
              {STORY_CHAPTERS.map((ch, ci) => (
                <motion.div
                  key={ch.label}
                  className="absolute inset-0 flex flex-col justify-center"
                  aria-hidden={showHero || chapter !== ci}
                  animate={{
                    opacity: !showHero && chapter === ci ? 1 : 0,
                    y: !showHero && chapter === ci ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ pointerEvents: !showHero && chapter === ci ? "auto" : "none" }}
                >
                  <h2 className="text-[clamp(3.25rem,7vw,5rem)] font-bold tracking-[-0.04em] leading-[1.02]">
                    <span className="block">{ch.heading[0]}</span>
                    <span className="block text-foreground/80 heading-italic">{ch.heading[1]}</span>
                  </h2>
                </motion.div>
              ))}
            </div>

            {/* Right — Description + CTA */}
            <div>
              <div className="relative min-h-[100px]">
                {/* Hero description */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center"
                  aria-hidden={!showHero}
                  animate={{
                    opacity: showHero ? 1 : 0,
                    y: showHero ? 0 : -15,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
                  style={{ pointerEvents: showHero ? "auto" : "none" }}
                >
                  <p className="text-[17px] leading-[1.65] text-foreground/70">
                    I'm Kousik. I use design to make product decisions visible, testable, and shippable. My edge is the way I frame the problem, craft the system, and build enough to learn faster.
                  </p>
                </motion.div>

                {/* Chapter descriptions */}
                {STORY_CHAPTERS.map((ch, ci) => (
                  <motion.div
                    key={ch.label + "-text"}
                    className="absolute inset-0 flex flex-col justify-center"
                    aria-hidden={showHero || chapter !== ci}
                    animate={{
                      opacity: !showHero && chapter === ci ? 1 : 0,
                      y: !showHero && chapter === ci ? 0 : 15,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
                    style={{ pointerEvents: !showHero && chapter === ci ? "auto" : "none" }}
                  >
                    <p className="text-[17px] leading-[1.65] text-foreground/70">
                      {ch.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-3.5 mt-6">
                <a
                  href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "default" }))}
                  aria-label="Download resume in a new tab"
                  data-cursor="none"
                >
                  Download resume
                </a>
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-[15px]"
                  aria-label="Book a call in a new tab"
                  data-cursor="none"
                >
                  Book a call
                </a>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-5" aria-hidden="true">
            {STORY_CHAPTERS.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: !showHero && chapter === i ? "var(--color-accent)" : "var(--color-muted-foreground)",
                  opacity: !showHero && chapter === i ? 1 : 0.25,
                  transform: !showHero && chapter === i ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
          </div>
        </div>

        {/* Recognition — always visible below the hero text */}
        <div className="max-w-[980px] mx-auto px-6 md:px-10 mt-6 relative z-10">
          <p className="text-[13px] font-semibold text-muted-foreground mb-3">
            Recognition
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-4">
            {AWARDS.map((award) => (
              <div key={award.title} className="border-t border-border/55 pt-3">
                <h3 className="text-[13px] font-semibold leading-tight">{award.title}</h3>
                {award.sub && <p className="text-[12px] text-muted-foreground mt-1">{award.sub}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Cube — background, bigger, starts top-left → ends bottom-right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              perspective: 900,
              perspectiveOrigin: "50% 45%",
              opacity: 0.85,
              position: "absolute",
              top: `${lerp(15, 60, progress)}%`,
              left: `${lerp(12, 65, progress)}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${cRx}deg) rotateZ(${cRz}deg) scale(${cubeScale})`,
                position: "relative",
                width: STRIDE * 5,
                height: STRIDE * 5,
              }}
            >
              <motion.div
                style={{
                  transformStyle: "preserve-3d",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                }}
                animate={isHeart ? { rotateY: [0, 360] } : { rotateY: 0 }}
                transition={
                  isHeart
                    ? { duration: 20, repeat: Infinity, ease: "linear" }
                    : { duration: 0.6 }
                }
              >
                {cubes.map((c, i) => (
                  <UnitCube key={i} {...c} isDark={isDark} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Floating photo cubes — drift and rotate across the section */}
          {FLOAT_POSITIONS.map((pos, fi) => {
            const spin = progress * 100
            const px = lerp(pos.startX, pos.endX, progress)
            const py = lerp(pos.startY, pos.endY, progress)
            const isFeatured = fi === chapter || (showHero && fi === 0)
            return (
              <div
                key={fi}
                style={{
                  position: "absolute",
                  top: `${py}%`,
                  left: `${px}%`,
                  perspective: 600,
                  zIndex: isFeatured ? 3 : 1,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <motion.div
                  key={`photo-${fi}-${chapter}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: isFeatured ? 1.5 : 1,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <PhotoCube
                    src={FLOAT_IMAGES[chapter][fi]}
                    size={pos.size}
                    x={0}
                    y={0}
                    rx={spin * 0.4 + fi * 40}
                    ry={spin + fi * 60}
                    isDark={isDark}
                  />
                </motion.div>
              </div>
            )
          })}
          </div>
        </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <PageTransition>
    <Seo
      title="About Kousik Dutta - Product Design, Systems Thinking, AI Prototyping"
      description="Learn how Kousik Dutta frames product problems, designs calm systems, and uses AI-assisted code to make product direction testable."
      path="/about"
    />
    <div className="relative">
      {/* Scroll-driven Hero + Story Cube */}
      <StoryCubeSection />

      {/* Experience */}
      <section className="py-12 md:py-16">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6"
          >
            <p className="section-kicker mb-1.5">
              Experience
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              Built inside <span className="heading-italic">real</span> product teams.
            </h2>
          </motion.div>

          <motion.ol
            className="experience-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {EXPERIENCE.map((item, index) => (
              <motion.li
                key={`${item.company}-${item.role}`}
                variants={fadeUp}
                className={cn(
                  "experience-row",
                  index < EXPERIENCE.length - 1 && "experience-row-bordered"
                )}
              >
                <p className="text-[12px] text-muted-foreground font-semibold">
                  {item.period}
                </p>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                    <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{item.role}</h3>
                    <p className="text-[14px] text-foreground/70">{item.company}</p>
                  </div>
                  <p className="mt-1.5 text-[14px] leading-[1.58] text-muted-foreground max-w-[620px]">
                    {item.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="section-kicker mb-1.5">
              How I work
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6">
              How my brain helps a team <span className="heading-italic">move.</span>
            </h2>
          </motion.div>
          <motion.div
            className="value-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="value-row">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
    </PageTransition>
  )
}
