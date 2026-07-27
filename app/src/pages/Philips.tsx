import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"
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

const OUTCOMES = [
  { metric: "2X", label: "Gold Medals", desc: "Won 2 University Gold Medals for this Graduation Project Thesis." },
  { metric: "🏆", label: "iF Design Award", desc: "Features from this project shipped in Philips' iF‑winning Guided Health Service." },
  { metric: "82.1", label: "SUS Score (A)", desc: "From 18 participants, validates excellent usability and user delight." },
]

const CONTEXT = [
  { q: "What is CAD?", a: "CAD is artery narrowing that reduces heart blood flow, causing angina and heart attacks." },
  { q: "Symptoms", a: "Symptoms include angina, breathlessness, fatigue, palpitations, dizziness, nausea, and heart attack." },
  { q: "Risk factors", a: "Risks include smoking, high BP, high LDL, diabetes, obesity, unhealthy diet, age, family history, & male sex." },
]

const LIT_INSIGHTS = [
  { title: "CAD Risk Factors", desc: "A sedentary lifestyle, poor diet, metabolic conditions, and inequities elevate CAD risk in Indians 30+." },
  { title: "Stress Management", desc: "Managing chronic stress and mental health reduces behaviors and physiologic drivers linked to CAD." },
  { title: "Culture & Society", desc: "Promote healthy diets, address socioeconomic gaps, and lower cultural barriers to regular activity." },
  { title: "Tech Interventions", desc: "Digital self‑monitoring and nudges can support behavior change and targeted prevention at scale." },
  { title: "Environmental Factors", desc: "Pollution, limited green spaces, and urban design influence cardiovascular risk profiles." },
  { title: "Device Risk Classification", desc: "A classification helps providers select appropriate monitors to manage individual risk profiles." },
]

const USER_JOURNEY = [
  { phase: "Phase 1/4", title: "College Life (18-23Y)", desc: "Poor diet, long sitting, late nights, smoking or alcohol, and ignored self care dominate." },
  { phase: "Phase 2/4", title: "Starts professional life (24-27Y)", desc: "Work disrupts meals, extends sitting, adds parties, increases alcohol or smoking, and neglects self care." },
  { phase: "Phase 3/4", title: "Marries and starts a family (28-32Y)", desc: "Diet improves slightly, but sitting persists, stress rises, weight increases, BP and cholesterol emerge." },
  { phase: "Phase 4/4", title: "CAD symptoms starts (35+Y)", desc: "Better diet and walks start, less alcohol or smoking, chest pain leads to tests and treatment." },
]

const DESIGN_FEATURES = [
  { title: "Ecosystem", desc: "Central web app providing overview of connected devices, apps, & bit-sized insights." },
  { title: "Learn", desc: "Educational content about coronary artery disease in short videos, articles & blogs from legit resources." },
  { title: "Routine", desc: "Tailored lifestyle modification suggestions integrated into existing routines for a heart‑healthier lifestyle." },
  { title: "Track", desc: "Track health across connected apps and services with personalized insights and lifestyle tips." },
  { title: "Health Wiz", desc: "AI health companion that simplifies medical jargon, explains health activities, & offers helpful features." },
  { title: "Lifestyle Change", desc: "WhatsApp prompt noting health changes, directing users to central app for analysis and lifestyle mods." },
]

const LEARNINGS = [
  { title: "Research depth", desc: "Reviewed 140+ sources and 18 interviews to guide choices." },
  { title: "Inductive coding", desc: "Built Excel codebook and grouped insights into 4 themes." },
  { title: "Decision tools", desc: "Assessed 12 concepts using a Pugh matrix before selection." },
  { title: "DLS alignment", desc: "Applied Philips Consumer DLS for consistent and accessible interface." },
  { title: "Agile sprints", desc: "Practiced SAFe with 6 practices and regular sprint reviews." },
  { title: "Usability proof", desc: "Achieved 82.1 SUS (A) from 18 participants in usability testing." },
]

const META = [
  { label: "Organisation", value: "Philips Healthcare" },
  { label: "Designer", value: "Kousik Dutta" },
  { label: "Design Lead", value: "Praveen G, Shaon S" },
  { label: "Duration", value: "January – July 2023" },
]

export default function PhilipsPage() {
  return (
    <PageTransition>
    <div className="overflow-hidden relative">
      {/* Background blurs */}
      <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
        <div className="absolute top-[300px] right-[-80px] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "rgba(0, 113, 227, 0.08)" }} />
        <div className="absolute top-[1400px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(94, 92, 230, 0.06)" }} />
        <div className="absolute top-[2600px] right-[5%] w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(52, 199, 89, 0.06)" }} />
      </div>

      {/* Back nav */}
      <section className="pt-24 md:pt-28">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <Link to="/" className="inline-flex items-center gap-1.5 text-[14px] text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.08]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_ENTER }}
          >
            Cardiocare
          </motion.h1>
          <motion.p
            className="mt-5 text-[17px] text-muted-foreground leading-[1.65] max-w-[680px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}
          >
            Cardiocare is a holistic heart health management ecosystem that enables users to live a heart-healthy lifestyle & prevent Coronary artery disease among Indians above 30.
          </motion.p>

          {/* Meta */}
          <motion.div
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.2 }}
          >
            {META.map((m) => (
              <div key={m.label} className="py-3">
                <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-medium">{m.label}</p>
                <p className="text-[15px] font-semibold mt-1">{m.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.img
            src="/assets/images/zmHb3X25M69yV81iHU14amDoU.png"
            alt="Philips Cardiocare"
            className="w-full rounded-2xl md:rounded-3xl object-cover frost-media"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_ENTER, delay: 0.2 }}
          />
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Outcomes
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {OUTCOMES.map((o) => (
              <motion.div key={o.label} variants={fadeUp}>
                <div className="h-full p-6 rounded-2xl glass-card">
                  <p className="text-[28px] font-bold tracking-tight">{o.metric}</p>
                  <p className="text-[14px] font-semibold mt-1">{o.label}</p>
                  <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{o.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Context */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Context
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Understanding coronary artery disease
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {CONTEXT.map((item) => (
              <motion.div key={item.q} variants={fadeUp}>
                <div className="h-full p-6 rounded-2xl apple-card">
                  <h3 className="text-[14px] font-semibold mb-2">{item.q}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.div
            className="rounded-2xl md:rounded-[2rem] p-8 md:p-12 glass-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_ENTER }}
          >
            <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-semibold mb-3">Problem Statement</p>
            <p className="text-[18px] md:text-[20px] font-medium leading-[1.6] tracking-tight">
              How might we create a comprehensive solution to reduce the risk factors linked to CAD among Indian adults, considering its potential for heart attacks and cardiac arrests?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Research: Literature Review */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Research
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Literature Review
          </motion.h2>
          <motion.p
            className="text-[15px] text-muted-foreground mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Actionable insights from reviewing 141 literatures
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {LIT_INSIGHTS.map((l) => (
              <motion.div key={l.title} variants={fadeUp}>
                <div className="h-full p-5 rounded-2xl apple-card">
                  <h3 className="text-[14px] font-semibold mb-1.5">{l.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{l.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Analysis: User Journey */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Analysis
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            "As Is" User Story
          </motion.h2>
          <motion.p
            className="text-[15px] text-muted-foreground mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Lifecycle of a typical CAD patient (pre-diagnosis)
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {USER_JOURNEY.map((j) => (
              <motion.div key={j.phase} variants={fadeUp}>
                <div className="h-full p-6 rounded-2xl glass-card">
                  <p className="text-[12px] uppercase tracking-wide text-accent font-semibold mb-1">{j.phase}</p>
                  <h3 className="text-[15px] font-semibold mb-2">{j.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{j.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Design
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            The Cardiocare ecosystem
          </motion.h2>
          <motion.p
            className="text-[15px] text-muted-foreground mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Holistic heart health management across devices, apps, and AI
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {DESIGN_FEATURES.map((f) => (
              <motion.div key={f.title} variants={fadeUp}>
                <div className="h-full p-6 rounded-2xl apple-card">
                  <h3 className="text-[15px] font-semibold mb-2">{f.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Learnings */}
      <section className="py-16 md:py-20">
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <motion.p
            className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Learnings
          </motion.p>
          <motion.h2
            className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            What I took away
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {LEARNINGS.map((l) => (
              <motion.div key={l.title} variants={fadeUp}>
                <div className="h-full p-5 rounded-2xl glass-card">
                  <h3 className="text-[14px] font-semibold mb-1.5">{l.title}</h3>
                  <p className="text-[14px] text-muted-foreground leading-relaxed">{l.desc}</p>
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
