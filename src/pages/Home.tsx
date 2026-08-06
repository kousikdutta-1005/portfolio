import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { ArrowUpRight } from "lucide-react"
import { PageTransition } from "@/components/PageTransition"
import { Seo } from "@/components/Seo"

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

const PROJECTS = [
  {
    title: "ThoughtSpot Mobile",
    desc: "Analytics shaped into a mobile decision loop teams could trust.",
    meta: "Analytics, AI, mobile",
    signal: "3x MAU growth",
    image: "/assets/images/GLP0Z4G1xKxcD0e0TDg9EWRgzQ.png",
    href: "/case-study/thoughtspot",
  },
  {
    title: "Philips Cardiocare",
    desc: "Preventive heart care made understandable, personal, and actionable.",
    meta: "Healthcare, research, service",
    signal: "82.1 SUS",
    image: "/assets/images/NRmPx5otSD5B8RKHstn08Zcs0k.png",
    href: "/case-study/philips",
  },
  {
    title: "Airtel Live Chat",
    desc: "Support flows clarified so people could get help faster.",
    meta: "Telecom, support, chat",
    signal: "Faster support flows",
    image: "/assets/images/elvpFwKLIpGRQQqelaZQI5Xw.png",
    href: "https://www.behance.net/gallery/154991935/Airtel-Live-Chat-UX-Design-Casestudy",
    external: true,
  },
  {
    title: "OLX Autos Workshop",
    desc: "Service-system thinking made visible for sharper team decisions.",
    meta: "Workshop, service systems",
    signal: "Shared team clarity",
    image: "/assets/images/lsO27yP1rhwECcphfDr6QnvgQ.png",
    href: "https://drive.google.com/file/d/1qahC8wyxudzjzuO9Zrtvk9e6Tz2UO9Cx/view?usp=drive_link",
    external: true,
  },
]

const EXPERIMENTS = [
  {
    title: "market-lab",
    desc: "An Indian equity research terminal that scores every NSE stock from official exchange data and rebuilds itself daily. Free to use, free to run, no account.",
    meta: "Data product, self-updating",
    signal: "1,604 stocks scored daily",
    image: "/assets/images/market-lab.png",
    href: "https://experiments.kousikdutta.com",
  },
]

const BRANDS = [
  { name: "Vedantu", src: "/assets/brands/vedantu.svg", height: 26 },
  { name: "Airtel", src: "/assets/brands/airtel.svg", height: 24 },
  { name: "OLX", src: "/assets/brands/olx-official.svg", height: 28 },
  { name: "Philips", src: "/assets/brands/philips.svg", height: 21 },
  { name: "ThoughtSpot", src: "/assets/brands/thoughtspot.svg", height: 38 },
  { name: "Precisely", src: "/assets/brands/precisely.svg", height: 27 },
]

const TESTIMONIALS = [
  { quote: "He has a strong understanding of product design and platform thinking.", name: "Alok Kumar", role: "Director (Design), Vedantu", avatar: "/assets/images/7fVFQW1WlW9URfSAH5RgMjT6lJA.png" },
  { quote: "He deeply understands user needs and values, making his solutions impactful.", name: "Pooja Kurup", role: "Product Designer, Philips", avatar: "/assets/images/nOMEfjkKW0HQZULIlhVnG39Fs.png" },
  { quote: "Kousik is a quick learner, highly adaptive, and creative.", name: "Sachin Rathi", role: "Design Manager, OLX Autos", avatar: "/assets/images/D6yfJKWbII8T1IlkQ8FWj8mQQIg.png" },
  { quote: "He conducted comprehensive research, analyzed data, and ideated 12 concepts.", name: "Sharad Mothay", role: "Senior Designer, Philips", avatar: "/assets/images/4vOLqtlry3zW82ZElaI6Zk8dSKI.png" },
  { quote: "He demonstrated exceptional design skills and a deep understanding of users.", name: "Shubham Gupta", role: "Senior Designer, Philips", avatar: "/assets/images/0LYNsSXPyC8kHefAFB308cDpM.png" },
  { quote: "Kousik showed excellent design process skills in solving business problems.", name: "Sonali Khandelwal", role: "Product Designer, OLX Autos", avatar: "/assets/images/n92t34yynreya1AL7P3DrnTeBCI.png" },
  { quote: "He evaluated, selected, and realized an industry-standard design concept.", name: "Pravin Ghodke", role: "Senior Designer, Philips", avatar: "/assets/images/uCRXWTi6yWqT2HHLxJ129sRGOM.png" },
  { quote: "Kousik is proactive and quick to grasp complex concepts.", name: "Keerti Chowdhry", role: "Senior Designer, OLX Autos", avatar: "/assets/images/aTmkDoNtTpwJjGWsx2gi5hPzMTk.png" },
  { quote: "Kousik is strong at design execution and documenting ideas.", name: "Poornima Kapoor", role: "Lead Designer, Airtel", avatar: "/assets/images/yLQEIFzvuqW7VcwbkkFzM8Z4N6A.png" },
]

const FEATURED_TESTIMONIALS = TESTIMONIALS.slice(0, 4)

const HERO_STATS = [
  { value: 5, suffix: "+", label: "Years designing" },
  { value: 6, label: "Products" },
  { value: 650, suffix: "M+", label: "App reach" },
  { value: 3, suffix: "x", label: "MAU growth" },
]

const LEVERAGE = [
  {
    title: "I turn fog into a point of view.",
    desc: "Before the interface, I clarify the decision. What matters, what does not, and what the product needs to make obvious.",
  },
  {
    title: "I make the system feel calm.",
    desc: "I shape flows, hierarchy, states, and motion so complex work feels understandable and trustworthy.",
  },
  {
    title: "I build enough to learn faster.",
    desc: "AI-assisted code helps me turn direction into something teams can feel, test, and improve without replacing judgment.",
  },
]

function AnimatedHeroStat({ value, suffix = "", label }: (typeof HERO_STATS)[number]) {
  const [displayValue, setDisplayValue] = useState(0)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    const duration = 1150
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(value * eased))

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayValue(value)
      }
    }

    frameRef.current = requestAnimationFrame(tick)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [value])

  return (
    <div className="hero-stat">
      <strong aria-label={`${value}${suffix} ${label}`}>
        <span aria-hidden="true">{displayValue}{suffix}</span>
      </strong>
      <span>{label}</span>
    </div>
  )
}

export default function HomePage() {
  return (
    <PageTransition>
    <Seo
      title="Kousik Dutta - Senior Product Designer"
      description="Senior product designer shaping AI, analytics, healthcare, and systems-led product work with clear thinking, refined craft, and buildable prototypes."
      path="/"
    />
    <div className="overflow-hidden relative">
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 relative min-h-[64vh] flex items-center pointer-events-none">
        <div className="max-w-[980px] mx-auto px-6 md:px-10 relative z-10 w-full pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: stronger thesis */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_ENTER }}
            >
              <h1 className="text-[clamp(3.35rem,7.4vw,6rem)] font-bold tracking-[-0.04em] leading-[0.99]">
                <span className="block">Thinking</span>
                <span className="block heading-italic">becomes</span>
                <span className="block text-foreground/80">product.</span>
              </h1>
            </motion.div>

            {/* Right: role, proof, and actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ENTER, delay: 0.15 }}
            >
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground mb-3">
                I'm Kousik Dutta, a senior product designer.
              </p>
              <p className="text-[17px] leading-[1.65] text-muted-foreground">
                I think in systems, shape clear interfaces, and build working prototypes with AI-assisted code when it helps teams learn faster.
              </p>
              <div className="hero-stats mt-7" aria-label="Kousik's proof points">
                {HERO_STATS.map((stat) => (
                  <AnimatedHeroStat key={stat.label} {...stat} />
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-7">
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "default" }))}
                  aria-label="Schedule a call in a new tab"
                  data-cursor="none"
                >
                  Schedule a call
                </a>
                <Link to="/about" className="text-link text-[15px]" data-cursor="none">
                  See how I think
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="company-proof-section py-6 md:py-7" aria-label="Companies and teams">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="company-proof"
          >
            <p className="company-proof-copy">Product thinking shaped with teams at</p>
            <div className="company-marquee" aria-label="Vedantu, Airtel, OLX, Philips, ThoughtSpot, and Precisely">
              <div className="company-marquee-track">
                {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                  <img
                    key={`${brand.name}-${i}`}
                    src={assetPath(brand.src)}
                    alt={i < BRANDS.length ? brand.name : ""}
                    aria-hidden={i >= BRANDS.length}
                    className="company-logo"
                    style={{ height: brand.height }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects: compact, high-utility work cards */}
      <section id="selected-work" className="py-16 md:py-20 scroll-mt-24">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="section-kicker mb-1.5">
              Selected work
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              Where thinking <span className="heading-italic">became</span> product
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {PROJECTS.map((project, i) => (
              <motion.div key={project.title} variants={fadeUp} custom={i}>
                {project.external ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card-link group block"
                    aria-label={`Open ${project.title} case study in a new tab`}
                    data-cursor="none"
                  >
                    <ProjectCard project={project} />
                  </a>
                ) : (
                  <Link to={project.href} className="project-card-link group block" aria-label={`Open ${project.title} case study`} data-cursor="none">
                    <ProjectCard project={project} />
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a
              href="https://www.behance.net/kousikdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-[15px]"
              aria-label="View academic projects on Behance in a new tab"
              data-cursor="none"
            >
              View academic projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Experiments — things built to think with, rather than case studies of past work */}
      <section id="experiments" className="py-16 md:py-20 scroll-mt-24">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
          >
            <p className="section-kicker mb-1.5">
              Experiments
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              Things I build to <span className="heading-italic">think</span> with
            </h2>
            <p className="mt-2.5 text-[15px] leading-[1.58] text-muted-foreground max-w-[560px]">
              Working products, not prototypes. The fastest way I know to find out whether an
              idea survives contact with real data.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {EXPERIMENTS.map((project, i) => (
              <motion.div key={project.title} variants={fadeUp} custom={i}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card-link group block"
                  aria-label={`Open ${project.title} in a new tab`}
                  data-cursor="none"
                >
                  <ProjectCard project={project} />
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="method-panel">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="method-kicker">How my brain creates leverage</p>
              <h2 className="method-title">
                I do not start with screens. I start with the <span className="heading-italic">shape</span> of the problem.
              </h2>
            </motion.div>
            <motion.div
              className="method-list"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {LEVERAGE.map((item, index) => (
                <motion.div key={item.title} variants={fadeUp} className="method-row">
                  <span className="method-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 md:py-18">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            className="mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="section-kicker mb-1.5">
              What people say
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
              Trusted for the way I <span className="heading-italic">think</span>
            </h2>
            <p className="mt-2.5 text-[15px] leading-[1.58] text-muted-foreground max-w-[560px]">
              Signals from people who have seen me turn uncertainty into clear product direction.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {FEATURED_TESTIMONIALS.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <TestimonialCard t={t} />
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-4 text-[13px] text-muted-foreground">
            More references from Philips, OLX Autos, Airtel, and Vedantu are available on request.
          </p>
        </div>
      </section>

    </div>
    </PageTransition>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="testimonial-quote">
      <p className="text-[15px] leading-[1.58] text-foreground/90 mb-4">"{t.quote}"</p>
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

type CardProject = {
  title: string
  desc: string
  meta: string
  signal: string
  image: string
  href: string
  external?: boolean
}

function ProjectCard({ project }: { project: CardProject }) {
  const actionLabel = project.external || project.href.startsWith("http") ? "Open" : "View"

  return (
    <div className="project-card-shell">
      <div className="project-card-media aspect-[16/9] overflow-hidden">
          <img
            src={assetPath(project.image)}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
      </div>
      <div className="project-card-content">
        <div className="project-card-topline">
          <p className="project-card-meta">{project.meta}</p>
          <span className="project-card-action" aria-hidden="true">
            {actionLabel}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
        <div className="project-card-copy">
          <h3>{project.title}</h3>
          <p>{project.desc}</p>
        </div>
        <p className="project-card-signal">{project.signal}</p>
      </div>
    </div>
  )
}
