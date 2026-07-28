import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { ArrowRight, ArrowUpRight, Download } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { PerspectiveGrid } from "@/components/PerspectiveGrid"
import { PageTransition } from "@/components/PageTransition"

// Apple HIG motion: spring-based, purposeful, natural physics
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

const BRANDS = [
  { name: "ThoughtSpot", src: "/assets/brands/thoughtspot.svg", height: 40 },
  { name: "Philips", src: "/assets/brands/philips.svg", height: 22 },
  { name: "Airtel", src: "/assets/brands/airtel.svg", height: 24 },
  { name: "Vedantu", src: "/assets/brands/vedantu.svg", height: 26 },
  { name: "Precisely", src: "/assets/brands/precisely.svg", height: 28 },
]

const PROJECTS = [
  {
    title: "ThoughtSpot Mobile",
    tags: ["UX Design", "UI Design", "Motion"],
    image: "/assets/images/GLP0Z4G1xKxcD0e0TDg9EWRgzQ.png",
    href: "/case-study/thoughtspot",
  },
  {
    title: "Philips Cardiocare",
    tags: ["Research", "UX Design", "UI Design"],
    image: "/assets/images/NRmPx5otSD5B8RKHstn08Zcs0k.png",
    href: "/case-study/philips",
  },
  {
    title: "Airtel Live Chat",
    tags: ["UX Design", "UI Design"],
    image: "/assets/images/elvpFwKLIpGRQQqelaZQI5Xw.png",
    href: "https://www.behance.net/gallery/154991935/Airtel-Live-Chat-UX-Design-Casestudy",
    external: true,
  },
  {
    title: "OLX Autos Workshop",
    tags: ["Workshop", "System Maps"],
    image: "/assets/images/lsO27yP1rhwECcphfDr6QnvgQ.png",
    href: "https://drive.google.com/file/d/1qahC8wyxudzjzuO9Zrtvk9e6Tz2UO9Cx/view?usp=drive_link",
    external: true,
  },
]

const TESTIMONIALS = [
  { quote: "He has a strong understanding of product design and platform thinking.", name: "Alok Kumar", role: "Director (Design), Vedantu", avatar: "/assets/images/7fVFQW1WlW9URfSAH5RgMjT6lJA.png" },
  { quote: "He deeply understands user needs and values, making his solutions impactful.", name: "Pooja Kurup", role: "Product Designer, Philips", avatar: "/assets/images/nOMEfjkKW0HQZULIlhVnG39Fs.png" },
  { quote: "Kousik is a quick learner, enthusiast and highly adaptive and creative.", name: "Sachin Rathi", role: "Design Manager, OLX Autos", avatar: "/assets/images/D6yfJKWbII8T1IlkQ8FWj8mQQIg.png" },
  { quote: "He conducted comprehensive research, analyzed data, and ideated 12 concepts.", name: "Sharad Mothay", role: "Senior Designer, Philips", avatar: "/assets/images/4vOLqtlry3zW82ZElaI6Zk8dSKI.png" },
  { quote: "He demonstrated exceptional design skills and a deep understanding of users.", name: "Shubham Gupta", role: "Senior Designer, Philips", avatar: "/assets/images/0LYNsSXPyC8kHefAFB308cDpM.png" },
  { quote: "Kousik shown excellent design process skills in solving business problems.", name: "Sonali Khandelwal", role: "Product Designer, OLX Autos", avatar: "/assets/images/n92t34yynreya1AL7P3DrnTeBCI.png" },
  { quote: "He evaluated, selected, and realized the industry-standard design concept.", name: "Pravin Ghodke", role: "Senior Designer, Philips", avatar: "/assets/images/uCRXWTi6yWqT2HHLxJ129sRGOM.png" },
  { quote: "Kousik is very proactive and very quick to grasp complex concepts.", name: "Keerti Chowdhry", role: "Senior Designer, OLX Autos", avatar: "/assets/images/aTmkDoNtTpwJjGWsx2gi5hPzMTk.png" },
  { quote: "Kousik is good at design execution and documenting his ideas.", name: "Poornima Kapoor", role: "Lead Designer, Airtel", avatar: "/assets/images/yLQEIFzvuqW7VcwbkkFzM8Z4N6A.png" },
]

const ROLES = ["AI-first Product Designer", "UX Designer", "Interface Builder"]

function RotatingRoles() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[28px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={ROLES[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute text-[18px] font-semibold tracking-tight text-foreground"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default function HomePage() {
  const row1 = TESTIMONIALS.slice(0, 5)
  const row2 = TESTIMONIALS.slice(5)

  return (
    <PageTransition>
    <div className="overflow-hidden relative">
      {/* Interactive perspective grid spans full page */}
      <PerspectiveGrid gridSize={44} />

      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden" style={{ zIndex: 1, minHeight: "100%" }} aria-hidden="true">
        <div className="absolute top-[200px] left-[-100px] w-[700px] h-[700px] rounded-full blur-[100px]" style={{ background: "rgba(0, 113, 227, 0.12)" }} />
        <div className="absolute top-[900px] right-[-150px] w-[600px] h-[600px] rounded-full blur-[80px]" style={{ background: "rgba(94, 92, 230, 0.09)" }} />
        <div className="absolute top-[1800px] left-[10%] w-[800px] h-[800px] rounded-full blur-[120px]" style={{ background: "rgba(255, 159, 10, 0.08)" }} />
        <div className="absolute top-[2800px] right-[5%] w-[500px] h-[500px] rounded-full blur-[90px]" style={{ background: "rgba(0, 113, 227, 0.09)" }} />
      </div>
      {/* Hero: Apple-style big type with generous breathing room */}
      <section className="pt-32 pb-20 md:pt-44 md:pb-28 relative min-h-[70vh] flex items-center pointer-events-none">
        <div className="max-w-[980px] mx-auto px-6 md:px-10 relative z-10 w-full pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Name + animated role */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_ENTER }}
            >
              <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bold tracking-[-0.04em] leading-[1.02]">
                <span className="block">Kousik</span>
                <span className="block text-gradient">Dutta.</span>
              </h1>
            </motion.div>

            {/* Right: Role cycle + Description + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ENTER, delay: 0.15 }}
            >
              <div className="mb-4">
                <RotatingRoles />
              </div>
              <p className="text-[17px] leading-[1.65] text-muted-foreground">
                I design AI-first, high-craft product experiences for complex systems, then turn those designs into working interfaces with agents like GitHub Copilot and Claude.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-7">
                <a
                  href="#selected-work"
                  className={cn(buttonVariants({ variant: "default", size: "default" }))}
                >
                  View selected work
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
                <a
                  href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[15px] font-medium text-accent hover:underline hover:underline-offset-4 transition-all"
                >
                  Resume
                  <Download className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand marquee: subtle, muted, lets content breathe */}
      <section className="py-6">
        <div className="max-w-[980px] mx-auto px-6 md:px-10 overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)", maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="flex items-center animate-brand-scroll">
              {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                <img
                  key={`${brand.name}-${i}`}
                  src={assetPath(brand.src)}
                  alt={brand.name}
                  className="shrink-0 mx-10 brand-logo-light"
                  style={{ height: brand.height }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects: Apple card grid with shadow-based depth */}
      <section id="selected-work" className="py-20 md:py-28 scroll-mt-24">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-1.5">
              Selected Work
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              Industry Projects
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {PROJECTS.map((project, i) => (
              <motion.div key={project.title} variants={fadeUp} custom={i}>
                {project.external ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className="group block">
                    <ProjectCard project={project} />
                  </a>
                ) : (
                  <Link to={project.href} className="group block">
                    <ProjectCard project={project} />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a
              href="https://www.behance.net/kousikdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] font-medium text-accent hover:underline hover:underline-offset-4 transition-all"
            >
              View Academic Projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services: frosted glass panel */}
      <section className="py-20 md:py-28">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="glass-card rounded-2xl md:rounded-[2rem] p-8 md:p-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-1.5">
                Services
              </p>
              <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-10">
                What I bring to the table
              </h2>
            </motion.div>
            <motion.div
              className="flex flex-wrap gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["Workshops", "UX Research", "UX Design", "UI Design", "Motion"].map((s) => (
                <motion.div key={s} variants={fadeUp}>
                  <Badge variant="secondary" className="text-[14px] px-5 py-2.5 rounded-full font-medium bg-background/80 dark:bg-background/40 backdrop-blur-sm">
                    {s}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials: two rows of Apple-style cards */}
      <section className="py-20 md:py-28 space-y-5">
        <div className="max-w-[980px] mx-auto px-6 md:px-10 mb-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-1.5">
              Kind Words
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              Testimonials
            </h2>
          </motion.div>
        </div>
        {/* Row 1 scrolls left */}
        <div className="max-w-[980px] mx-auto px-6 md:px-10 overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)", maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)" }}>
          <div className="flex gap-5 animate-scroll-left hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
        {/* Row 2 scrolls right */}
        <div className="max-w-[980px] mx-auto px-6 md:px-10 overflow-hidden" style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)", maskImage: "linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)" }}>
          <div className="flex gap-5 animate-scroll-right hover:[animation-play-state:paused]">
            {[...row2, ...row1, ...row2, ...row1].map((t, i) => (
              <TestimonialCard key={`r2-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </section>

    </div>
    </PageTransition>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="shrink-0 w-[280px] md:w-[320px] p-5 md:p-6 rounded-2xl apple-card">
      <p className="text-[15px] leading-[1.65] text-foreground/90 mb-5">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <img src={assetPath(t.avatar)} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-[14px] font-semibold tracking-tight">{t.name}</p>
          <p className="text-[12px] text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
  const [isHovered, setIsHovered] = useState(false)
  const rafRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setTilt({
        rotateX: (0.5 - y) * 10,
        rotateY: (x - 0.5) * 10,
        glareX: x * 100,
        glareY: y * 100,
      })
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setIsHovered(false)
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 })
  }, [])

  return (
    <div
      className="perspective-[800px]"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="rounded-2xl overflow-hidden apple-card transition-transform duration-300 ease-out will-change-transform relative"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.015 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={assetPath(project.image)}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="p-5 flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-semibold tracking-tight">{project.title}</h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-[11px] font-medium text-muted-foreground px-2.5 py-1 rounded-full bg-secondary/60 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* Glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
          }}
        />
      </div>
    </div>
  )
}
