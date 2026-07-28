import { motion, useScroll, useMotionValueEvent, useSpring, useTransform } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { ArrowRight, Download } from "lucide-react"
import { PageTransition } from "@/components/PageTransition"
import { useState, useRef } from "react"
import { useTheme } from "@/components/ThemeProvider"

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
  { title: "2X University Gold Medal", sub: "Best Design & Overall Student" },
  { title: "Winner", sub: "D'source Design Challenge 2022" },
  { title: "CII Young Designer Awards 2022", sub: "" },
  { title: "Honorable Mention", sub: "Student Service Design Challenge 2022" },
  { title: "Design Excellence Award", sub: "Dean's List 2021" },
]

const VALUES = [
  { title: "Outcome-first", desc: "We set a scorecard together & design to move it, not just ship screens." },
  { title: "Fast, honest loops", desc: "You get quick drafts, clear trade-offs, weekly progress you can see & test." },
  { title: "Systems that scale", desc: "I leave patterns, tokens, & docs so teams ship faster with consistent quality." },
  { title: "Built for reality", desc: "I handle edge cases, accessibility, and clean handoff so engineering moves smoothly." },
]

/* ── Story Cube Data ── */

const STORY_CHAPTERS = [
  {
    label: "The designer",
    heading: ["Driving", "Growth."],
    text: "Product designer with 6+ years turning complex problems into intuitive, growth-driving digital experiences.",
  },
  {
    label: "The journey",
    heading: ["Built", "at Scale."],
    text: "Philips, ThoughtSpot, and Precisely, designing products used by millions across healthcare, analytics, and data integrity.",
  },
  {
    label: "The craft",
    heading: ["Research", "First."],
    text: "Every project starts with understanding people. Research, rapid prototyping, and systems thinking are how great products ship.",
  },
  {
    label: "The passion",
    heading: ["Heart", "& Craft."],
    text: "2× gold medalist. Industry-recognized. What truly drives me is creating work that genuinely improves people's lives.",
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
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3) }
function easeInOut(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
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
  const isDark = resolvedTheme === "dark"
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  // Smooth scroll progress — tight tracking, minimal lag
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 50, mass: 0.2 })
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(smoothProgress, "change", setProgress)

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
    <section ref={containerRef} className="relative" style={{ height: "250vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pt-32 pb-20 md:pt-44 md:pb-28 relative z-10">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            {/* Left — Big heading (hero then chapter headings) */}
            <div className="relative min-h-[140px]">
              {/* Hero heading */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center"
                animate={{
                  opacity: showHero ? 1 : 0,
                  y: showHero ? 0 : -20,
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ pointerEvents: showHero ? "auto" : "none" }}
              >
                <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[1.02]">
                  <span className="block">Design</span>
                  <span className="block text-gradient">Driven.</span>
                </h1>
              </motion.div>

              {/* Chapter headings — same big style */}
              {STORY_CHAPTERS.map((ch, ci) => (
                <motion.div
                  key={ch.label}
                  className="absolute inset-0 flex flex-col justify-center"
                  animate={{
                    opacity: !showHero && chapter === ci ? 1 : 0,
                    y: !showHero && chapter === ci ? 0 : 20,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ pointerEvents: !showHero && chapter === ci ? "auto" : "none" }}
                >
                  <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[1.02]">
                    <span className="block">{ch.heading[0]}</span>
                    <span className="block text-gradient">{ch.heading[1]}</span>
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
                  animate={{
                    opacity: showHero ? 1 : 0,
                    y: showHero ? 0 : -15,
                  }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
                  style={{ pointerEvents: showHero ? "auto" : "none" }}
                >
                  <p className="text-[17px] leading-[1.65] text-foreground/70">
                    Product designer with 6+ years turning complex problems into intuitive, growth-driving digital experiences.
                  </p>
                </motion.div>

                {/* Chapter descriptions */}
                {STORY_CHAPTERS.map((ch, ci) => (
                  <motion.div
                    key={ch.label + "-text"}
                    className="absolute inset-0 flex flex-col justify-center"
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
              <div className="flex items-center gap-4 mt-7">
                <a
                  href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "default" }))}
                >
                  Download resume
                  <Download className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-medium text-accent hover:underline hover:underline-offset-4 transition-all"
                >
                  Book a call →
                </a>
              </div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-6">
            {STORY_CHAPTERS.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: !showHero && chapter === i ? "var(--accent)" : "var(--muted-foreground)",
                  opacity: !showHero && chapter === i ? 1 : 0.25,
                  transform: !showHero && chapter === i ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
          </div>
        </div>

        {/* Recognition — always visible below the hero text */}
        <div className="max-w-[980px] mx-auto px-6 md:px-10 mt-8 relative z-10">
          <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-4">
            Recognition
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {AWARDS.map((award) => (
              <div key={award.title} className="p-4 rounded-xl apple-card">
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
    <div className="relative">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
        <div className="absolute top-[100px] right-[-80px] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "rgba(94, 92, 230, 0.1)" }} />
        <div className="absolute top-[800px] left-[-120px] w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(255, 159, 10, 0.08)" }} />
        <div className="absolute top-[1600px] right-[5%] w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(0, 113, 227, 0.07)" }} />
      </div>

      {/* Scroll-driven Hero + Story Cube */}
      <StoryCubeSection />

      {/* Values */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-1.5">
              Why choose me
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-8">
              Design that moves metrics.
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={fadeUp}>
                <div className="h-full p-6 rounded-2xl glass-card">
                  <h3 className="text-[15px] font-semibold mb-2">{v.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{v.desc}</p>
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
