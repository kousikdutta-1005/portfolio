import { motion } from "framer-motion"
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

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center text-center">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-[clamp(3rem,7vw,5rem)] font-semibold tracking-[-0.04em] leading-[1.05]">
              Design that<br />drives growth.
            </h1>
          </motion.div>
          <motion.p
            className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-[480px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full bg-accent text-accent-foreground text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              Download resume
              <Download className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-24">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.div
            className="grid grid-cols-3 gap-3 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img src="/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png" alt="Kousik working" className="w-full h-52 object-cover rounded-xl" />
            <img src="/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png" alt="Design process" className="w-full h-52 object-cover rounded-xl" />
            <img src="/assets/images/8LPRSiOjoKRFuwtCYe9vWT2eM.png" alt="Presentation" className="w-full h-52 object-cover rounded-xl" />
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.p
            className="text-[12px] font-medium tracking-[0.08em] uppercase text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.p>
          <div className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="flex items-center justify-between py-5 border-b last:border-b-0"
              >
                <div>
                  <h3 className="text-[16px] font-medium">{exp.role}</h3>
                  <p className="text-[14px] text-muted-foreground mt-0.5">{exp.company}</p>
                </div>
                <span className="text-[13px] font-mono text-muted-foreground">{exp.period}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.p
            className="text-[12px] font-medium tracking-[0.08em] uppercase text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Recognition
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-sm transition-shadow">
                  <CardContent className="p-5">
                    <h3 className="text-[14px] font-semibold">{award.title}</h3>
                    {award.sub && <p className="text-[13px] text-muted-foreground mt-1">{award.sub}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="max-w-[980px] mx-auto px-6">
          <motion.p
            className="text-[12px] font-medium tracking-[0.08em] uppercase text-muted-foreground mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why choose me
          </motion.p>
          <motion.h2
            className="text-[clamp(1.8rem,4vw,2.5rem)] font-semibold tracking-[-0.03em] mb-10"
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover:shadow-sm transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-[15px] font-semibold mb-2">{v.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <motion.h2
            className="text-[clamp(2.5rem,6vw,4rem)] font-semibold tracking-[-0.04em] leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's create your<br />next big idea.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <a
              href="https://calendly.com/design-kousik/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 px-7 py-3 rounded-full bg-accent text-accent-foreground text-[14px] font-medium hover:opacity-90 transition-opacity"
            >
              Schedule a call
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
