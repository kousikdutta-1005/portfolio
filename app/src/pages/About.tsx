import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight, Download } from "lucide-react"
import { PageTransition } from "@/components/PageTransition"

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
    <PageTransition>
    <div className="overflow-hidden relative">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
        <div className="absolute top-[100px] right-[-80px] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "rgba(94, 92, 230, 0.1)" }} />
        <div className="absolute top-[800px] left-[-120px] w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(255, 159, 10, 0.08)" }} />
        <div className="absolute top-[1600px] right-[5%] w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(0, 113, 227, 0.07)" }} />
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.08]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTER }}
          >
            Design that<br /><span className="text-gradient">drives growth.</span>
          </motion.h1>
          <motion.p
            className="mt-5 text-[17px] text-muted-foreground leading-[1.65] max-w-[520px]"
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
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-16">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            className="grid grid-cols-3 gap-4"
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
                className="w-full h-48 md:h-56 object-cover rounded-xl md:rounded-2xl frost-media"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE_ENTER, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-6"
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
                className="flex items-center justify-between py-5 border-b border-border/50 last:border-b-0"
              >
                <div>
                  <h3 className="text-[16px] font-semibold tracking-tight">{exp.role}</h3>
                  <p className="text-[14px] text-muted-foreground mt-0.5">{exp.company}</p>
                </div>
                <span className="text-[13px] text-muted-foreground">{exp.period}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Recognition
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {AWARDS.map((award) => (
              <motion.div key={award.title} variants={fadeUp}>
                <div className="h-full p-5 rounded-2xl apple-card">
                  <h3 className="text-[14px] font-semibold">{award.title}</h3>
                  {award.sub && <p className="text-[13px] text-muted-foreground mt-1">{award.sub}</p>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            className="rounded-2xl md:rounded-[2rem] p-10 md:p-16 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE_ENTER }}
            style={{
              background: "rgba(29, 29, 31, 0.95)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }}
          >
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.03em] leading-[1.1] text-white">
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
          </motion.div>
        </div>
      </section>
    </div>
    </PageTransition>
  )
}
