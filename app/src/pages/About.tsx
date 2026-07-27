import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  DownloadSimple,
  CalendarBlank,
  Trophy,
  Medal,
  Star,
  Target,
  Lightning,
  GitBranch,
  CheckCircle,
  Briefcase,
  GraduationCap,
} from "@phosphor-icons/react"

const EXPERIENCE = [
  { period: "2024 — Present", role: "UX Designer", company: "Precisely", icon: Briefcase },
  { period: "2023 — 2024", role: "Product Designer", company: "ThoughtSpot", icon: Briefcase },
  { period: "2022 — 2024", role: "Freelance Designer", company: "Multiple Brands", icon: Lightning },
  { period: "2021 — 2023", role: "Internships", company: "Philips, Olx, Airtel, Vedantu", icon: GraduationCap },
]

const AWARDS = [
  { title: "2X University Gold Medal", sub: "Best Design & Overall Student", icon: Medal },
  { title: "Winner", sub: "D'source Design Challenge 2022", icon: Trophy },
  { title: "CII Young Designer Awards 2022", sub: "", icon: Star },
  { title: "Honorable Mention", sub: "Student Service Design Challenge 2022", icon: Trophy },
  { title: "Design Excellence Award", sub: "Dean's List 2021", icon: Star },
]

const VALUES = [
  { title: "Outcome-first", desc: "We set a scorecard together & design to move it, not just ship screens.", icon: Target },
  { title: "Fast, honest loops", desc: "You get quick drafts, clear trade-offs, weekly progress you can see & test.", icon: Lightning },
  { title: "Systems that scale", desc: "I leave patterns, tokens, & docs so teams ship faster with consistent quality.", icon: GitBranch },
  { title: "Built for reality", desc: "I handle edge cases, accessibility, and clean handoff so engineering moves smoothly.", icon: CheckCircle },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero — left-aligned */}
      <section className="pt-24 pb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[-0.04em] leading-[1.1]">
              Design that<br />drives growth.
            </h1>
            <p className="mt-5 text-[17px] text-muted-foreground leading-relaxed max-w-[520px]">
              I help ambitious companies achieve their business goals by strategically designing their MVPs, optimising for growth & beyond.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default", size: "default" }))}
              >
                <DownloadSimple weight="bold" className="w-4 h-4" />
                Download resume
              </a>
              <a
                href="https://calendly.com/design-kousik/intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[15px] text-accent hover:text-accent/80 transition-colors font-medium"
              >
                <CalendarBlank weight="bold" className="w-3.5 h-3.5" />
                Book a call
                <ArrowRight weight="bold" className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="pb-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/assets/images/ruT6GHFIiPerqY8LNYaz4FCFSxo.png" alt="Kousik working" className="w-full h-48 object-cover rounded-xl" />
            <img src="/assets/images/sdo2Gvh8uiuifu2p675NabVbw.png" alt="Design process" className="w-full h-48 object-cover rounded-xl" />
            <img src="/assets/images/8LPRSiOjoKRFuwtCYe9vWT2eM.png" alt="Presentation" className="w-full h-48 object-cover rounded-xl" />
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-5">
            Experience
          </p>
          <div className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center justify-between py-4 border-b last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <exp.icon weight="bold" className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-medium">{exp.role}</h3>
                    <p className="text-[13px] text-muted-foreground">{exp.company}</p>
                  </div>
                </div>
                <span className="text-[12px] font-mono text-muted-foreground">{exp.period}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-5">
            Recognition
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {AWARDS.map((award, i) => (
              <motion.div
                key={award.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <Card className="h-full hover:border-accent/30 transition-colors">
                  <CardContent className="p-4">
                    <award.icon weight="fill" className="w-5 h-5 text-accent mb-2" />
                    <h3 className="text-[13px] font-semibold">{award.title}</h3>
                    {award.sub && <p className="text-[12px] text-muted-foreground mt-0.5">{award.sub}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
          <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-2">
            Why choose me
          </p>
          <h2 className="text-[24px] font-semibold tracking-tight mb-6">
            Design that moves metrics.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Card className="h-full hover:border-accent/30 transition-colors">
                  <CardContent className="p-5">
                    <v.icon weight="bold" className="w-5 h-5 text-accent mb-2" />
                    <h3 className="text-[14px] font-semibold mb-1.5">{v.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8 py-20 bg-foreground text-background rounded-t-3xl">
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
