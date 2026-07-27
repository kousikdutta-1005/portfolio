import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"

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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] },
  }),
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
          >
            <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
              <span className="block">Kousik Dutta</span>
              <span className="block text-muted-foreground">UX Designer</span>
            </h1>
            <p className="mt-6 text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground leading-relaxed max-w-[560px]">
              I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
            </p>
            <a
              href="https://calendly.com/design-kousik/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-foreground text-[14px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              Schedule a call
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Industry Work
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
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
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.behance.net/kousikdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View Academic Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Services
          </motion.p>
          <motion.h2
            className="text-2xl font-semibold tracking-tight mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Workshops
          </motion.h2>
          <div className="flex flex-wrap gap-2">
            {["UX Research", "UX Design", "UI Design", "Motion"].map((s) => (
              <Badge key={s} variant="secondary" className="text-[13px] px-4 py-1.5">{s}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50 overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 mb-8">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Testimonials
          </p>
        </div>
        <div className="relative">
          <div className="flex gap-4 animate-scroll">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="shrink-0 w-[340px] p-5 rounded-xl border bg-card"
              >
                <p className="text-[14px] leading-relaxed text-foreground mb-4">"{t.quote}"</p>
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

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 text-center">
          <motion.h2
            className="text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em] leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's create your<br />next big idea.
          </motion.h2>
          <a
            href="https://calendly.com/design-kousik/intro-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary text-[14px] font-medium hover:bg-white/90 transition-colors"
          >
            Schedule a call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <div className="rounded-2xl border overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-foreground/15 group-hover:-translate-y-1">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">{project.title}</h3>
        <div className="flex gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
