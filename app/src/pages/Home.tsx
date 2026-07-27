import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  MagnifyingGlass,
  PencilSimple,
  Lightbulb,
  Cube,
  Play,
  ArrowRight,
  Quotes,
  CalendarBlank,
  BehanceLogo,
} from "@phosphor-icons/react"

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

const SERVICES = [
  { icon: MagnifyingGlass, label: "UX Research" },
  { icon: PencilSimple, label: "UX Design" },
  { icon: Lightbulb, label: "UI Design" },
  { icon: Cube, label: "Design Systems" },
  { icon: Play, label: "Motion Design" },
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
  return (
    <div>
      {/* Hero — left-aligned, compact */}
      <section className="pt-24 pb-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
              <span className="block">Kousik Dutta</span>
              <span className="block text-muted-foreground">UX Designer</span>
            </h1>
            <p className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-[520px]">
              I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://calendly.com/design-kousik/intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default", size: "default" }))}
              >
                <CalendarBlank weight="bold" className="w-4 h-4" />
                Schedule a call
              </a>
              <Link
                to="/about"
                className="inline-flex items-center gap-1 text-[15px] text-accent hover:text-accent/80 transition-colors font-medium"
              >
                Learn more
                <ArrowRight weight="bold" className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects — 2-column grid */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Industry Work
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
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
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.behance.net/kousikdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] text-accent hover:text-accent/80 font-medium transition-colors"
            >
              <BehanceLogo weight="bold" className="w-4 h-4" />
              View Academic Projects
              <ArrowRight weight="bold" className="w-3 h-3" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services — with icons */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
            What I do
          </p>
          <h2 className="text-[24px] font-semibold tracking-tight mb-5">Services & Workshops</h2>
          <div className="flex flex-wrap gap-2.5">
            {SERVICES.map((s) => (
              <Badge key={s.label} variant="secondary" className="text-[13px] px-4 py-2 rounded-full gap-1.5 font-medium">
                <s.icon weight="bold" className="w-3.5 h-3.5 text-accent" />
                {s.label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 mb-6">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
            Testimonials
          </p>
        </div>
        <div className="relative">
          <div className="flex gap-4 animate-scroll pl-6 md:pl-10 lg:pl-20">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="shrink-0 w-[300px] p-5 rounded-2xl border bg-card"
              >
                <Quotes weight="fill" className="w-5 h-5 text-accent/40 mb-2" />
                <p className="text-[14px] leading-[1.6] mb-4">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-[13px] font-medium">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark section */}
      <section className="mt-12 py-20 bg-foreground text-background rounded-t-3xl">
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
            <CalendarBlank weight="bold" className="w-4 h-4" />
            Schedule a call
          </a>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="rounded-2xl overflow-hidden border bg-card transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold tracking-tight">{project.title}</h3>
        <div className="flex items-center gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] font-normal rounded-full">{tag}</Badge>
          ))}
          <ArrowUpRight weight="bold" className="w-3.5 h-3.5 text-muted-foreground ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  )
}
