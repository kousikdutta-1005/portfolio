import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Download } from "lucide-react"

const EXPERIENCE = [
  { period: "2024 — Present", role: "UX Designer", company: "Precisely" },
  { period: "2023 — 2024", role: "Product Designer", company: "ThoughtSpot" },
  { period: "2022 — 2024", role: "Freelance Designer", company: "Multiple Brands" },
  { period: "2021 — 2023", role: "Internships", company: "Philips, Olx, Airtel, Vedantu" },
]

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

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0, 0, 0.2, 1] },
  }),
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
              Design that<br />drives growth.
            </h1>
            <p className="mt-6 text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground leading-relaxed max-w-[560px]">
              I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
            </p>
            <a
              href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-foreground text-[14px] font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              Download resume
              <Download className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            className="grid grid-cols-3 gap-4 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png" alt="Kousik working" className="w-full h-56 object-cover rounded-xl" />
            <img src="/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png" alt="Design process" className="w-full h-56 object-cover rounded-xl" />
            <img src="/assets/images/8LPRSiOjoKRFuwtCYe9vWT2eM.png" alt="Presentation" className="w-full h-56 object-cover rounded-xl" />
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.p>
          <div className="space-y-0 border rounded-xl overflow-hidden">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h3 className="text-[15px] font-medium">{exp.role}</h3>
                  <p className="text-[13px] text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-[12px] font-mono text-muted-foreground">{exp.period}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Awards
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-5">
                    <h3 className="text-[14px] font-semibold mb-1">{award.title}</h3>
                    {award.sub && <p className="text-[12px] text-muted-foreground">{award.sub}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* More Photos */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-2 gap-4">
            <img src="/assets/images/6B8uqd2e6S9IFPXTDVafB2GgnU.png" alt="Design work" className="w-full h-64 object-cover rounded-xl" />
            <img src="/assets/images/IB6kjn9ha0ReYQDVilt8rtzRw.png" alt="Workshop" className="w-full h-64 object-cover rounded-xl" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Me?
          </motion.p>
          <motion.h2
            className="text-2xl font-semibold tracking-tight mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Design that moves metrics.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Card className="h-full transition-all hover:shadow-sm hover:border-foreground/15">
                  <CardContent className="p-5">
                    <h3 className="text-[14px] font-semibold mb-2">{v.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
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
