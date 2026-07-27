import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowUpRight } from "lucide-react"

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
  { name: "ThoughtSpot", src: "/assets/brands/thoughtspot.svg" },
  { name: "Philips", src: "/assets/brands/philips.svg" },
  { name: "OLX", src: "/assets/brands/olx.svg" },
  { name: "Airtel", src: "/assets/brands/airtel.svg" },
  { name: "Vedantu", src: "/assets/brands/vedantu.svg" },
  { name: "Precisely", src: "/assets/brands/precisely.svg" },
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
    href: "#",
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

export default function HomePage() {
  const row1 = TESTIMONIALS.slice(0, 5)
  const row2 = TESTIMONIALS.slice(5)

  return (
    <div className="overflow-hidden">
      {/* Hero — Apple-style: big bold type, generous breathing room */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-16 items-end">
            {/* Left: Name — Apple uses very large, bold display type */}
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

            {/* Right: Description + CTA — Apple's secondary content is smaller, lighter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_ENTER, delay: 0.15 }}
              className="pb-2"
            >
              <p className="text-[17px] leading-[1.65] text-muted-foreground">
                I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
              </p>
              <div className="flex items-center gap-4 mt-7">
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "default" }))}
                >
                  Schedule a call
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Marquee — Apple-style: subtle, muted, lets content breathe */}
      <section className="py-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center animate-brand-scroll">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <img
                key={`${brand.name}-${i}`}
                src={brand.src}
                alt={brand.name}
                className="shrink-0 h-4 mx-12 opacity-30 dark:invert dark:opacity-20 grayscale"
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects — Apple card grid: no borders, shadow-based, large radius */}
      <section className="py-20 md:py-28">
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
              View all projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services — Apple's chip/tag style */}
      <section className="py-20 md:py-24 section-alt rounded-[2rem] mx-4">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-1.5">
              Capabilities
            </p>
            <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-8">
              What I do
            </h2>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["UX Research", "UX Design", "UI Design", "Design Systems", "Motion Design", "Prototyping", "Workshop Facilitation"].map((s) => (
              <motion.div key={s} variants={fadeUp}>
                <Badge variant="secondary" className="text-[14px] px-5 py-2.5 rounded-full font-medium bg-background dark:bg-background/80">
                  {s}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials — 2 rows, Apple-style cards (no borders, shadow only) */}
      <section className="py-20 md:py-28 overflow-hidden space-y-5">
        <div className="max-w-[980px] mx-auto px-6 md:px-10 mb-4">
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
        {/* Row 1 — scrolls left */}
        <div className="relative">
          <div className="flex gap-5 animate-scroll-left pl-6 md:pl-10 hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="flex gap-5 animate-scroll-right pl-6 md:pl-10 hover:[animation-play-state:paused]">
            {[...row2, ...row1, ...row2, ...row1].map((t, i) => (
              <TestimonialCard key={`r2-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Apple's dark section with generous spacing */}
      <motion.section
        className="py-28 md:py-36 relative overflow-hidden rounded-[2rem] mx-4 mb-4 bg-[#1d1d1f]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: EASE_ENTER }}
      >
        <div className="max-w-[980px] mx-auto px-6 md:px-10 relative z-10">
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.03em] leading-[1.1] text-white">
            Let's create your<br />next big idea.
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-white/50 max-w-[420px]">
            Available for full-time roles, freelance projects, and design consulting.
          </p>
          <a
            href="https://calendly.com/design-kousik/intro-call"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "inverted", size: "default" }), "mt-8")}
          >
            Schedule a call
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="shrink-0 w-[320px] p-6 rounded-2xl apple-card">
      <p className="text-[15px] leading-[1.65] text-foreground/90 mb-5">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
        <div>
          <p className="text-[14px] font-semibold tracking-tight">{t.name}</p>
          <p className="text-[12px] text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden apple-card"
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex items-center justify-between">
        <h3 className="text-[16px] font-semibold tracking-tight">{project.title}</h3>
        <div className="flex items-center gap-1.5">
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[11px] font-medium text-muted-foreground px-2.5 py-1 rounded-full bg-secondary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
