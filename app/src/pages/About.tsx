import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Download } from "lucide-react"

const EASE_ENTER = [0, 0, 0.2, 1] as const
const DURATION_REVEAL = 0.5
const STAGGER = 0.08

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
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
      <section className="pt-24 pb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTER }}
          >
            Design that<br />drives growth.
          </motion.h1>
          <motion.p
            className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-[520px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.15 }}
          >
            I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
          </motion.p>
          <motion.div
            className="flex items-center gap-4 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.3 }}
          >
            <a
              href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "default", size: "default" }))}
            >
              Download resume
              <Download className="w-4 h-4" />
            </a>
            <a
              href="https://calendly.com/design-kousik/intro-call"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-accent hover:underline hover:underline-offset-4 transition-all"
            >
              Book a call →
            </a>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_ENTER }}
          >
            {[
              { src: "/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png", alt: "Kousik working" },
              { src: "/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png", alt: "Design process" },
              { src: "/assets/images/8LPRSiOjoKRFuwtCYe9vWT2eM.png", alt: "Presentation" },
            ].map((img, i) => (
              <motion.img
                key={img.alt}
                src={img.src}
                alt={img.alt}
                className="w-full h-48 object-cover rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_ENTER, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Experience
          </motion.p>
          <motion.div
            className="space-y-0"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {EXPERIENCE.map((exp) => (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div>
                  <h3 className="text-[15px] font-medium">{exp.role}</h3>
                  <p className="text-[13px] text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-[12px] font-mono text-muted-foreground">{exp.period}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Recognition
          </motion.p>
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {AWARDS.map((award) => (
              <motion.div key={award.title} variants={fadeUp}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="p-4">
                    <h3 className="text-[13px] font-semibold">{award.title}</h3>
                    {award.sub && <p className="text-[12px] text-muted-foreground mt-0.5">{award.sub}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
              Why choose me
            </p>
            <h2 className="text-[24px] font-semibold tracking-tight mb-6">
              Design that moves metrics.
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {VALUES.map((v) => (
              <motion.div key={v.title} variants={fadeUp}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="p-5">
                    <h3 className="text-[14px] font-semibold mb-1.5">{v.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        className="mt-8 py-20 bg-foreground text-background rounded-t-3xl"
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
