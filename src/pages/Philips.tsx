import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
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

const USER_INTERVIEWS = [
  { title: "Gaps to questions", desc: "Literature and competitor reviews answered early questions and exposed gaps reframed as new questions." },
  { title: "Objectives", desc: "Those questions defined interview objectives, target participants, and a focused discussion guide." },
  { title: "Questionnaire", desc: "Objectives shaped clear, phased questions to ease participants and surface honest insights." },
]

const LEARNINGS: { title: string; desc: string; image?: string }[] = [
  { title: "Research depth", desc: "Reviewed 140+ sources and 18 interviews to guide choices.", image: "/assets/images/b9OoNNeJac3xWYgEwwW5cDJO8.png" },
  { title: "Inductive coding", desc: "Built Excel codebook and grouped insights into 4 themes.", image: "/assets/images/TRd5S978oTc5ik4BexV9THbI.png" },
  { title: "Decision tools", desc: "Assessed 12 concepts using a Pugh matrix before selection.", image: "/assets/images/a3108No4fjugOpjetH5z8spz6gY.png" },
  { title: "DLS alignment", desc: "Applied Philips Consumer DLS for consistent and accessible interface.", image: "/assets/images/UVmMkAEgKUh8JWjxHwVDdOWOq00.png" },
  { title: "Agile sprints", desc: "Practiced SAFe with 6 practices and regular sprint reviews.", image: "/assets/images/ktUfjJR2NOSdqVtLyQyrrYvmu2w.png" },
  { title: "Usability proof", desc: "Achieved 82.1 SUS (A) from 18 participants in usability testing.", image: "/assets/images/XmzU9NdKM3kGZSGeAGzjGb6DGKs.png" },
]

const META = [
  { label: "Organisation", value: "Philips Healthcare" },
  { label: "Designer", value: "Kousik Dutta" },
  { label: "Design Lead", value: "Praveen G, Shaon S" },
  { label: "Duration", value: "January – July 2023" },
]

const SECTIONS = [
  { id: "outcomes", num: 1, label: "Outcomes" },
  { id: "context", num: 2, label: "Context" },
  { id: "research", num: 3, label: "Research" },
  { id: "analysis", num: 4, label: "Analysis" },
  { id: "define", num: 5, label: "Define" },
  { id: "ideation", num: 6, label: "Ideation" },
  { id: "design", num: 7, label: "Design" },
  { id: "learnings", num: 8, label: "Learnings" },
]

const DEFINE_CONTENT = {
  heading: "Focused design brief",
  desc: "Analyzed research, defined four problems, set guiding principles, and delivered a focused design brief.",
}

const IDEATION_CONTENT = {
  heading: "From SCAMPER to solution",
  desc: "After applying SCAMPER, 24 concepts were generated, 12 shortlisted, and evaluated using a Pugh matrix.",
}


function SectionImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("w-full rounded-2xl object-cover frost-media", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    />
  )
}

function StickyNav() {
  const [activeId, setActiveId] = useState<string>("")
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    const stickyObserver = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    )

    if (sentinelRef.current) stickyObserver.observe(sentinelRef.current)

    return () => {
      observer.disconnect()
      stickyObserver.disconnect()
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 80
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <>
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />
      <nav className={cn("sticky top-11 z-30 transition-all duration-300", isSticky ? "py-3 nav-glass" : "py-4")}>
        <div className="max-w-[980px] mx-auto px-6 md:px-10">
          <div className="flex items-center gap-5 md:gap-8 overflow-x-auto scrollbar-none">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap transition-all duration-200 shrink-0",
                  activeId === section.id ? "text-foreground" : "text-muted-foreground hover:text-foreground/70"
                )}
              >
                <span
                  className={cn(
                    "text-[12px] font-bold w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-200",
                    activeId === section.id ? "bg-foreground text-background" : "bg-muted/50"
                  )}
                >
                  {section.num}
                </span>
                <span className="text-[13px] font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}

export default function PhilipsPage() {
  return (
    <PageTransition>
      <div className="relative" style={{ overflowX: "clip" }}>
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden" style={{ zIndex: -1 }} aria-hidden="true">
          <div className="absolute top-[300px] right-[-80px] w-[600px] h-[600px] rounded-full blur-[100px]" style={{ background: "rgba(0, 113, 227, 0.08)" }} />
          <div className="absolute top-[1400px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[80px]" style={{ background: "rgba(94, 92, 230, 0.06)" }} />
          <div className="absolute top-[2600px] right-[5%] w-[700px] h-[700px] rounded-full blur-[120px]" style={{ background: "rgba(52, 199, 89, 0.06)" }} />
        </div>

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

        <section className="pt-8 pb-10 md:pt-12 md:pb-14">
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
            <motion.div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.2 }}
            >
              {META.map((item) => (
                <div key={item.label} className="py-3">
                  <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-[15px] font-semibold mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="pb-12">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <SectionImage src="/assets/images/zmHb3X25M69yV81iHU14amDoU.png" alt="Philips Cardiocare" />
          </div>
        </section>

        <StickyNav />

        <section className="py-14 md:py-18" id="outcomes">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Outcomes</motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/oiW8eXHbvjUx2WW5fIiPIPypsZo.png" alt="Outcomes overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/60gbN3iRBXtWFOg8nb0sG08YlU.png" alt="Outcomes overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/fx07bQrlNg5sqn6wuPnUU4Qe1oU.png" alt="Outcomes overview 3" />
              </motion.div>
            </motion.div>
            <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {OUTCOMES.map((item) => (
                <motion.div key={item.label} variants={fadeUp} className="p-6 rounded-2xl glass-card">
                  <p className="text-[28px] font-bold tracking-tight">{item.metric}</p>
                  <p className="text-[14px] font-semibold mt-1">{item.label}</p>
                  <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-14 md:py-18" id="context">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Context</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Understanding coronary artery disease
            </motion.h2>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/EjkgQuLwQ7ag90M29P3Xx23x8.png" alt="Context overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/4At8dv1k2CMfJgLk9dEOBxORyQ.png" alt="Context overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/f0tNHf76okLFl9ma1YdROf5FG4.png" alt="Context overview 3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/Ip5ZgGQrbA8AN2IIfSpgmFtj1uQ.png" alt="Context overview 4" />
              </motion.div>
            </motion.div>
            <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Framing the disease, symptoms, and lifestyle risks created the baseline for the intervention opportunity.
            </motion.p>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {CONTEXT.map((item) => (
                <motion.div key={item.q} variants={fadeUp}>
                  <div className="h-full p-6 rounded-2xl apple-card">
                    <h3 className="text-[14px] font-semibold mb-2">{item.q}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <SectionImage src="/assets/images/OjaomaIcjw7zg9CMMQk4NkDOhE.png" alt="CAD context synthesis" className="mb-8" />
            <div className="rounded-2xl p-8 md:p-10 glass-card">
              <p className="text-[12px] uppercase tracking-wide text-muted-foreground font-semibold mb-3">Problem Statement</p>
              <p className="text-[17px] md:text-[19px] font-medium leading-[1.6] tracking-tight">
                How might we create a comprehensive solution to reduce the risk factors linked to CAD among Indian adults, considering its potential for heart attacks and cardiac arrests?
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18" id="research">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Research</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Literature review to field interviews
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Secondary and primary research helped clarify risks, behavior patterns, and intervention opportunities.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/fKeYUp4JFUBo9lzG78yDwB2FE.png" alt="Research overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/9jUCGRB1HSCARf006awm5YRirE.png" alt="Research overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/08YeGtXgECqYezRyaWV3KhnHAY.png" alt="Research overview 3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/OTVTpRwpzlwC7can36hvpaVkiQ.png" alt="Research overview 4" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/2myRWXxSO1JZLRoybrlrD8l7o5s.png" alt="Research overview 5" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/ndGimVdJQdbjximjW46GCXW2Kco.png" alt="Research overview 6" />
              </motion.div>
            </motion.div>

            <motion.h4 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Literature Review: Insights</motion.h4>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Actionable insights from reviewing 141 literatures.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {LIT_INSIGHTS.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <div className="h-full p-5 rounded-2xl apple-card">
                    <h3 className="text-[14px] font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.h4 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Competitor Research</motion.h4>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Adjacent experiences revealed patterns, missing support, and whitespace for habit-forming care journeys.
            </motion.p>
            <SectionImage src="/assets/images/3RKpKWtBNF2tnzlsjsm5pNPjSes.png" alt="Competitor research synthesis" className="mb-10" />

            <motion.h4 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>User Interviews</motion.h4>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Interview planning translated research gaps into focused conversations with participants.
            </motion.p>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {USER_INTERVIEWS.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <div className="h-full p-5 rounded-2xl apple-card">
                    <h3 className="text-[14px] font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <SectionImage src="/assets/images/gHdDnmGFpBHbwr5BV0xh0DHxW4I.png" alt="User interview synthesis" />
          </div>
        </section>

        <section className="py-14 md:py-18" id="analysis">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Analysis</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Making sense of the behavior landscape
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Journey mapping, personas, systems thinking, and inductive coding helped frame where design could intervene.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/RzMKvtKV1VnbeHf6CEKn9RqPCU.png" alt="Analysis overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/o46rgWPXBGbyO3GDHthLaXQzXg.png" alt="Analysis overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/pcWOeZqZ9oKOs0Yos2nB3U6zl0.png" alt="Analysis overview 3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/EsyxLpXeQJFahS2fuF1HItrCsM.png" alt="Analysis overview 4" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/sj79LzZWkit9SJ0c7Cnva3pgofs.png" alt="Analysis overview 5" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/Pu2R8p8ofwH9sdLYBJafV4w60I.png" alt="Analysis overview 6" />
              </motion.div>
            </motion.div>

            <motion.h4 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>&quot;As is&quot; User Story</motion.h4>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Lifecycle of a typical CAD patient before diagnosis.
            </motion.p>
            <motion.div className="space-y-8 mb-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {[
                {
                  phase: "Phase 1/4",
                  title: "College Life (18-23Y)",
                  desc: "Poor diet, long sitting, late nights, smoking or alcohol, and ignored self care dominate.",
                  image: "/assets/images/IgnkCq4U2ZO6KiRNsnFUJNTTQS0.png",
                },
                {
                  phase: "Phase 2/4",
                  title: "Professional life (24-27Y)",
                  desc: "Work disrupts meals, extends sitting, adds parties, increases alcohol or smoking, and neglects self care.",
                  image: "/assets/images/e4wzzmAPnQjECBs88VTnFreht10.png",
                },
                {
                  phase: "Phase 3/4",
                  title: "Family (28-32Y)",
                  desc: "Diet improves slightly, but sitting persists, stress rises, weight increases, BP and cholesterol emerge.",
                  image: "/assets/images/hhEPti9RdxDqITQaj0JAwaFKs.png",
                },
                {
                  phase: "Phase 4/4",
                  title: "CAD symptoms (35+Y)",
                  desc: "Better diet and walks start, less alcohol or smoking, chest pain leads to tests and treatment.",
                  image: "/assets/images/VM7wfvwutt2dHqExq6ycfPZXSsM.jpg",
                },
              ].map((item) => (
                <motion.div key={item.phase} variants={fadeUp}>
                  <div className="p-6 rounded-2xl glass-card mb-4">
                    <p className="text-[12px] uppercase tracking-wide text-accent font-semibold mb-1">{item.phase}</p>
                    <h3 className="text-[15px] font-semibold mb-2">{item.title}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                  <SectionImage src={item.image} alt={item.title} />
                </motion.div>
              ))}
            </motion.div>
            <motion.h4 className="text-[22px] font-bold tracking-tight mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Primary User Persona</motion.h4>
            <SectionImage src="/assets/images/V0Hxyj2lxijTQbqkNGl3X9Uvqc.png" alt="Primary user persona" />
          </div>
        </section>

        <section className="py-14 md:py-18" id="define">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Define</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {DEFINE_CONTENT.heading}
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {DEFINE_CONTENT.desc}
            </motion.p>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/I1lppYC2pMjS4k8Fr7zEBCxbq7Q.png" alt="Define overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/L9qbVEnSE4K0npKVMFtmoQT3A.png" alt="Define overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/Oy41zORxVeNBc46CXIz2pHbM.png" alt="Define overview 3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/5wbpJ2oO60Wl4xSPn7eUlqyYPs.png" alt="Define overview 4" />
              </motion.div>
            </motion.div>
            <motion.h4 className="text-[22px] font-bold tracking-tight mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Design Principles</motion.h4>
            <SectionImage src="/assets/images/uP18d7ftpul2Q8z135WSeL4219c.png" alt="Design principles" />
          </div>
        </section>

        <section className="py-14 md:py-18" id="ideation">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Ideation</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {IDEATION_CONTENT.heading}
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {IDEATION_CONTENT.desc}
            </motion.p>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/T9Om1XEaC8XxaKh1s1vtUqAE8.png" alt="Ideation overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/ac4LYMm9DDZ185e9jWF50Zms.png" alt="Ideation overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/T4v0684xUYlK8mkYMKpY8DmBc.png" alt="Ideation overview 3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/KuMHy0UqLiaM5e8J9b4rTYMVWEc.png" alt="Ideation overview 4" />
              </motion.div>
            </motion.div>
            <motion.h4 className="text-[22px] font-bold tracking-tight mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>12 Concepts</motion.h4>
            <SectionImage src="/assets/images/uv5PQCkDMWXLPYZAYdtdEobSsSU.png" alt="12 concepts" className="mb-10" />
            <motion.h4 className="text-[22px] font-bold tracking-tight mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Final Solution</motion.h4>
            <SectionImage src="/assets/images/w1FtMWYv4E1BwI4OJTv0pSiw.png" alt="Final solution" />
          </div>
        </section>

        <section className="py-14 md:py-18" id="design">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Design</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The Cardiocare ecosystem
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-10" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Holistic heart health management across devices, apps, and AI.
            </motion.p>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/bPEhgyXwWdLeo3yJ7ZUVGPIUl0.png" alt="Design overview 1" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/a6V6C1mKD5ymefXm3kHe6GOdaE.png" alt="Design overview 2" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/cWfzP5h6sbus048FwykJ7b0tQr4.png" alt="Design overview 3" />
              </motion.div>
              <motion.div variants={fadeUp}>
                <SectionImage src="/assets/images/7g3fkIhbMUZ5k2QJxZFx2mYS6ws.png" alt="Design overview 4" />
              </motion.div>
            </motion.div>

            <div className="space-y-16">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Ecosystem</h4>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-[680px]">
                  Central web app providing overview of connected devices, apps, & bit-sized insights.
                </p>
                <SectionImage src="/assets/images/pMkuCCsKbGGqDInFMLwJ0NQNww.png" alt="Cardiocare ecosystem" />
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Learn</h4>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                    Educational content about coronary artery disease in short videos, articles & blogs from legit resources.
                  </p>
                  <SectionImage src="/assets/images/OVkn4oZlYIpXiWhU2SDQNkqkScA.png" alt="Learn feature" className="max-h-[520px] object-top" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Routine</h4>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                    Tailored lifestyle modification suggestions integrated into existing routines for a heart‑healthier lifestyle.
                  </p>
                  <SectionImage src="/assets/images/838Ltuj9ErqvqFvc42m3CNWw.png" alt="Routine feature" className="max-h-[520px] object-top" />
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-10" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Track</h4>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                    Track health across connected apps and services with personalized insights and lifestyle tips.
                  </p>
                  <SectionImage src="/assets/images/prOHXP4zgbH8eaceY2oO6TShSk.png" alt="Track feature" className="max-h-[520px] object-top" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Health Wiz</h4>
                  <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                    AI health companion that simplifies medical jargon, explains health activities, & offers helpful features.
                  </p>
                  <SectionImage src="/assets/images/GeDQDLqUkbz5f2uPhBkUXmjYI.png" alt="Health Wiz feature" className="max-h-[520px] object-top" />
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Lifestyle Change Suggestions</h4>
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6 max-w-[680px]">
                  WhatsApp prompt noting health changes, directing users to central app for analysis and lifestyle mods.
                </p>
                <SectionImage src="/assets/images/SesFQCUIIDduKIA7xxJhrG1KKYM.png" alt="Lifestyle change feature" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-18" id="learnings">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Learnings</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What I took away
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              These learnings reflect work at Philips and how the team shaped my growth.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {LEARNINGS.map((l) => (
                <motion.div key={l.title} variants={fadeUp} className="rounded-2xl overflow-hidden border border-border/50">
                  {l.image && <img src={l.image} alt={l.title} className="w-full aspect-[4/3] object-cover frost-media" />}
                  <div className="p-4">
                    <h3 className="text-[14px] font-semibold mb-1">{l.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{l.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
