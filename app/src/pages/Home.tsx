import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowUpRight } from "lucide-react"

// Design system motion tokens
const EASE_ENTER = [0, 0, 0.2, 1] as const
const DURATION_REVEAL = 0.5
const STAGGER = 0.1

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

const BRANDS = ["ThoughtSpot", "Philips", "OLX", "Airtel", "Vedantu", "Precisely"]

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
    <div>
      {/* Hero — 2-column layout matching Framer site */}
      <section className="pt-28 pb-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-end">
            {/* Left: Name */}
            <motion.h1
              className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_ENTER }}
            >
              <span className="block">Kousik Dutta</span>
              <span className="block text-muted-foreground">UX Designer</span>
            </motion.h1>

            {/* Right: Description + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.2 }}
            >
              <p className="text-[17px] text-muted-foreground leading-relaxed">
                I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "default" }))}
                >
                  Schedule a call
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brand Marquee */}
      <section className="py-8 border-t border-b overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex animate-brand-scroll">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="shrink-0 px-10 text-[18px] font-semibold text-muted-foreground/50 tracking-tight whitespace-nowrap"
              >
                {brand}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Industry Work
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
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
          </div>

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
              className="inline-flex items-center gap-1.5 text-[14px] text-accent hover:underline hover:underline-offset-4 transition-all"
            >
              View all projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
              What I do
            </p>
            <h2 className="text-[24px] font-semibold tracking-tight mb-5">Services & Workshops</h2>
          </motion.div>
          <motion.div
            className="flex flex-wrap gap-2.5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.05 }}
          >
            {["UX Research", "UX Design", "UI Design", "Design Systems", "Motion Design"].map((s) => (
              <motion.div key={s} variants={fadeUp}>
                <Badge variant="secondary" className="text-[13px] px-4 py-2 rounded-full font-medium">
                  {s}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials — 2 rows */}
      <section className="py-12 overflow-hidden space-y-4">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 mb-2">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Testimonials
          </motion.p>
        </div>
        {/* Row 1 — scrolls left */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll-left pl-6 md:pl-10 lg:pl-20 hover:[animation-play-state:paused]">
            {[...row1, ...row1, ...row1].map((t, i) => (
              <TestimonialCard key={`r1-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll-right pl-6 md:pl-10 lg:pl-20 hover:[animation-play-state:paused]">
            {[...row2, ...row1, ...row2, ...row1].map((t, i) => (
              <TestimonialCard key={`r2-${t.name}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="mt-12 py-20 bg-foreground text-background rounded-t-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: EASE_ENTER }}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-tight">
            Let's create your<br />next big idea.
          </h2>
          <p className="mt-3 text-[15px] opacity-60 max-w-[400px]">
            Available for full-time roles, freelance projects, and design consulting.
          </p>
          <a
            href="https://calendly.com/design-kousik/intro-call"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "inverted", size: "default" }), "mt-6")}
          >
            Schedule a call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.section>
    </div>
  )
}

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="shrink-0 w-[300px] p-5 rounded-2xl border bg-card transition-shadow hover:shadow-md">
      <p className="text-[14px] leading-[1.6] mb-4">"{t.quote}"</p>
      <div className="flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
        <div>
          <p className="text-[13px] font-medium">{t.name}</p>
          <p className="text-[11px] text-muted-foreground">{t.role}</p>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <motion.div
      className="rounded-2xl overflow-hidden border bg-card"
      whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight">{project.title}</h3>
        <div className="flex items-center gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] font-normal rounded-full">{tag}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
