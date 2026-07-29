import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { PageTransition } from "@/components/PageTransition"
import { CaseEvidenceStrip, CaseStory, type CaseEvidenceItem, type CaseStoryItem } from "@/components/CaseStory"
import { CaseStudyNav, type CaseStudyNavSection } from "@/components/CaseStudyNav"
import { Seo } from "@/components/Seo"

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

const OUTCOMES: CaseEvidenceItem[] = [
  { value: "82.1", label: "SUS benchmark", desc: "A-grade usability score, giving the team a standard read on clarity and ease of use." },
  { value: "18", label: "User validation", desc: "Participants tested the concept so decisions were checked against real comprehension." },
  { value: "12", label: "Concept coverage", desc: "Shortlisted concepts were compared with a Pugh matrix before selecting the direction." },
  { value: "4", label: "Behavior themes", desc: "Research synthesis grouped insights into themes the product system could act on." },
]

const CONTEXT = [
  { q: "What is CAD?", a: "CAD is artery narrowing that reduces heart blood flow, causing angina and heart attacks." },
  { q: "Symptoms", a: "Symptoms include angina, breathlessness, fatigue, palpitations, dizziness, nausea, and heart attack." },
  { q: "Risk factors", a: "Risks include smoking, high BP, high LDL, diabetes, obesity, unhealthy diet, age, family history, and male sex." },
]

const LIT_INSIGHTS = [
  { title: "CAD Risk Factors", desc: "A sedentary lifestyle, poor diet, metabolic conditions, and inequities elevate CAD risk in Indians 30+." },
  { title: "Stress Management", desc: "Managing chronic stress and mental health reduces behaviors and physiologic drivers linked to CAD." },
  { title: "Culture and society", desc: "Promote healthy diets, address socioeconomic gaps, and lower cultural barriers to regular activity." },
  { title: "Tech interventions", desc: "Digital self-monitoring and nudges can support behavior change and targeted prevention at scale." },
  { title: "Environmental Factors", desc: "Pollution, limited green spaces, and urban design influence cardiovascular risk profiles." },
  { title: "Device Risk Classification", desc: "A classification helps providers select appropriate monitors to manage individual risk profiles." },
]

const USER_INTERVIEWS = [
  { title: "Gaps to questions", desc: "Literature and competitor reviews answered early questions and exposed gaps reframed as new questions." },
  { title: "Objectives", desc: "Those questions defined interview objectives, target participants, and a focused discussion guide." },
  { title: "Questionnaire", desc: "Objectives shaped clear, phased questions to ease participants and surface honest insights." },
]

const LEARNINGS: { title: string; desc: string; image?: string }[] = [
  { title: "Research depth", desc: "A wide research base helped separate medical facts from assumptions about behavior.", image: "/assets/images/b9OoNNeJac3xWYgEwwW5cDJO8.png" },
  { title: "Inductive coding", desc: "A structured codebook turned interviews into themes the team could make decisions from.", image: "/assets/images/TRd5S978oTc5ik4BexV9THbI.png" },
  { title: "Decision tools", desc: "The Pugh matrix made concept selection explicit instead of relying on taste alone.", image: "/assets/images/a3108No4fjugOpjetH5z8spz6gY.png" },
  { title: "DLS alignment", desc: "Philips Consumer DLS kept the interface consistent, legible, and accessible.", image: "/assets/images/UVmMkAEgKUh8JWjxHwVDdOWOq00.png" },
  { title: "Sprint rhythm", desc: "Regular reviews helped research, service logic, and interface details move together.", image: "/assets/images/ktUfjJR2NOSdqVtLyQyrrYvmu2w.png" },
  { title: "Usability proof", desc: "The SUS score gave the team a practical read on whether the concept felt clear.", image: "/assets/images/XmzU9NdKM3kGZSGeAGzjGb6DGKs.png" },
]

const META = [
  { label: "Company", value: "Philips Healthcare" },
  { label: "Role", value: "Product Designer" },
  { label: "Design Lead", value: "Praveen G, Shaon S" },
  { label: "Duration", value: "7 months, January to July 2023" },
]

const SUMMARY: CaseStoryItem[] = [
  {
    label: "What was broken",
    text: "CAD prevention was not only an information problem. Risk, habits, and progress needed to feel understandable enough to act on.",
  },
  {
    label: "What changed",
    text: "I shaped the research synthesis, concept evaluation, ecosystem logic, UX flows, and interface direction around prevention.",
  },
  {
    label: "Why it works",
    text: "The system connected learning, routines, monitoring, guidance, and lifestyle change so the user was not left with isolated advice.",
  },
  {
    label: "How it scales",
    text: "The ecosystem model gave Philips a reusable pattern for connected devices, app guidance, and everyday health behavior support.",
  },
]

const SECTIONS: CaseStudyNavSection[] = [
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
  const [loaded, setLoaded] = useState(false)
  const objectPosition = className?.includes("object-top") ? "top" : undefined

  return (
    <motion.div
      className={cn("w-full rounded-2xl media-loading-frame content-loading-frame frost-media", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: EASE_ENTER }}
    >
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="media-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EASE_ENTER }}
          />
        )}
      </AnimatePresence>
      <img
        src={assetPath(src)}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={cn("block w-full rounded-2xl object-cover", loaded ? "media-loaded" : "media-pending")}
        style={{ objectPosition }}
        loading="lazy"
      />
    </motion.div>
  )
}

export default function PhilipsPage() {
  return (
    <PageTransition>
      <Seo
        title="Philips Cardiocare Case Study - Kousik Dutta"
        description="A healthcare product design case study on preventive heart care, research synthesis, service systems, and action-oriented patient support."
        path="/case-study/philips"
      />
      <div className="philips-case-study relative" style={{ overflowX: "clip" }}>
        <section className="pt-20 md:pt-24">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Link to="/" className="back-link" data-cursor="none">
                Back to work
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="pt-6 pb-8 md:pt-8 md:pb-10">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p
              className="text-[13px] font-semibold text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER }}
            >
              Philips Cardiocare
            </motion.p>
            <motion.h1
              className="text-[clamp(2.8rem,6vw,5.2rem)] font-bold tracking-[-0.04em] leading-[0.99] max-w-[860px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_ENTER }}
            >
              Preventive heart care, made easier to <span className="heading-italic">act</span> on.
            </motion.h1>
            <motion.p
              className="mt-4 text-[17px] text-muted-foreground leading-[1.58] max-w-[680px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.1 }}
            >
              Cardiocare helps Indian adults over 30 understand heart risk, build healthier routines, and act before prevention becomes treatment.
            </motion.p>
            <motion.div
              className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_ENTER, delay: 0.2 }}
            >
              {META.map((item) => (
                <div key={item.label} className="py-2">
                  <p className="text-[12px] text-muted-foreground font-medium">{item.label}</p>
                  <p className="text-[15px] font-semibold mt-1">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <CaseStory
          title="From risk to daily action"
          lead="This project was about making preventive heart care feel understandable, personal, and doable before the user reaches a crisis point."
          items={SUMMARY}
        />

        <section className="pb-8">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <SectionImage src="/assets/images/zmHb3X25M69yV81iHU14amDoU.png" alt="Philips Cardiocare" />
          </div>
        </section>

        <CaseStudyNav sections={SECTIONS} />

        <section className="py-10 md:py-14" id="outcomes">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Signals that the system felt <span className="heading-italic">usable</span>.
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6 max-w-[680px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The outcome signals are strongest when read together: usability benchmark, validation sample, concept coverage, and behavior themes.
            </motion.p>
            <CaseEvidenceStrip items={OUTCOMES} />
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
          </div>
        </section>

        <section className="py-10 md:py-14" id="context">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Context</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Understanding <span className="heading-italic">coronary</span> artery disease
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
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Framing the disease, symptoms, and lifestyle risks created the baseline for the intervention opportunity.
            </motion.p>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {CONTEXT.map((item) => (
                <motion.div key={item.q} variants={fadeUp}>
                  <div className="h-full border-t border-border/55 pt-4">
                    <h3 className="text-[14px] font-semibold mb-2">{item.q}</h3>
                    <p className="text-[14px] text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <SectionImage src="/assets/images/OjaomaIcjw7zg9CMMQk4NkDOhE.png" alt="CAD context synthesis" className="mb-6" />
            <div className="border-y border-border/60 py-5 md:py-6">
              <p className="text-[13px] text-muted-foreground font-semibold mb-3">Problem statement</p>
              <p className="text-[17px] md:text-[19px] font-medium leading-[1.6] tracking-tight">
                How might we create a comprehensive solution to reduce the risk factors linked to CAD among Indian adults, considering its potential for heart attacks and cardiac arrests?
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="research">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Research</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Literature review to <span className="heading-italic">field</span> interviews
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Secondary and primary research helped clarify risks, behavior patterns, and intervention opportunities.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
              Actionable insights from 141 research sources.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {LIT_INSIGHTS.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <div className="h-full border-t border-border/55 pt-4">
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
            <SectionImage src="/assets/images/3RKpKWtBNF2tnzlsjsm5pNPjSes.png" alt="Competitor research synthesis" className="mb-8" />

            <motion.h4 className="text-[22px] font-bold tracking-tight mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>User Interviews</motion.h4>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Interview planning translated research gaps into focused conversations with participants.
            </motion.p>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-x-7 gap-y-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {USER_INTERVIEWS.map((item) => (
                <motion.div key={item.title} variants={fadeUp}>
                  <div className="h-full border-t border-border/55 pt-4">
                    <h3 className="text-[14px] font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <SectionImage src="/assets/images/gHdDnmGFpBHbwr5BV0xh0DHxW4I.png" alt="User interview synthesis" />
          </div>
        </section>

        <section className="py-10 md:py-14" id="analysis">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Analysis</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Making <span className="heading-italic">sense</span> of the behavior landscape
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Journey mapping, personas, systems thinking, and inductive coding helped frame where design could intervene.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
            <motion.div className="space-y-6 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {[
                {
                  phase: "Phase 1/4",
                  title: "College Life (18-23Y)",
                  desc: "Poor diet, long sitting, late nights, smoking or alcohol, and ignored self care dominate.",
                  image: "/assets/images/IgnkCq4U2ZO6KiRNsnFUJNTTQS0.jpg",
                },
                {
                  phase: "Phase 2/4",
                  title: "Professional life (24-27Y)",
                  desc: "Work disrupts meals, extends sitting, adds parties, increases alcohol or smoking, and neglects self care.",
                  image: "/assets/images/e4wzzmAPnQjECBs88VTnFreht10.jpg",
                },
                {
                  phase: "Phase 3/4",
                  title: "Family (28-32Y)",
                  desc: "Diet improves slightly, but sitting persists, stress rises, weight increases, BP and cholesterol emerge.",
                  image: "/assets/images/hhEPti9RdxDqITQaj0JAwaFKs.jpg",
                },
                {
                  phase: "Phase 4/4",
                  title: "CAD symptoms (35+Y)",
                  desc: "Better diet and walks start, less alcohol or smoking, chest pain leads to tests and treatment.",
                  image: "/assets/images/VM7wfvwutt2dHqExq6ycfPZXSsM.jpg",
                },
              ].map((item) => (
                <motion.div key={item.phase} variants={fadeUp}>
                  <div className="border-t border-border/55 pt-4 mb-3">
                    <p className="text-[12px] text-accent font-semibold mb-1">{item.phase}</p>
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

        <section className="py-10 md:py-14" id="define">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Define</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              Focused <span className="heading-italic">design</span> brief
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {DEFINE_CONTENT.desc}
            </motion.p>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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

        <section className="py-10 md:py-14" id="ideation">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Ideation</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              From SCAMPER to <span className="heading-italic">solution</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {IDEATION_CONTENT.desc}
            </motion.p>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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
            <motion.h4 className="text-[22px] font-bold tracking-tight mb-4" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>12 Concepts</motion.h4>
            <SectionImage src="/assets/images/uv5PQCkDMWXLPYZAYdtdEobSsSU.png" alt="12 concepts" className="mb-8" />
            <motion.h4 className="text-[22px] font-bold tracking-tight mb-4" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Final Solution</motion.h4>
            <SectionImage src="/assets/images/w1FtMWYv4E1BwI4OJTv0pSiw.png" alt="Final solution" />
          </div>
        </section>

        <section className="py-10 md:py-14" id="design">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.p className="text-[13px] font-semibold text-muted-foreground mb-2" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>Design</motion.p>
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The Cardiocare <span className="heading-italic">ecosystem</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-6" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              A heart-health system across devices, apps, and plain-language guidance.
            </motion.p>
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
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

            <div className="space-y-10 md:space-y-12">
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Ecosystem</h4>
                <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5 max-w-[680px]">
                  A central web app that brings connected devices, apps, and bite-sized insights into one clear view.
                </p>
                <SectionImage src="/assets/images/pMkuCCsKbGGqDInFMLwJ0NQNww.png" alt="Cardiocare ecosystem" />
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Learn</h4>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    Short videos, articles, and guides that explain coronary artery disease through trusted sources.
                  </p>
                  <SectionImage src="/assets/images/OVkn4oZlYIpXiWhU2SDQNkqkScA.png" alt="Learn feature" className="max-h-[520px] object-top" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Routine</h4>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    Tailored lifestyle suggestions that fit into everyday routines instead of asking for a complete reset.
                  </p>
                  <SectionImage src="/assets/images/838Ltuj9ErqvqFvc42m3CNWw.png" alt="Routine feature" className="max-h-[520px] object-top" />
                </motion.div>
              </motion.div>

              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Track</h4>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    Track health across connected apps and services with personalized insights and lifestyle tips.
                  </p>
                  <SectionImage src="/assets/images/prOHXP4zgbH8eaceY2oO6TShSk.png" alt="Track feature" className="max-h-[520px] object-top" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Health Wiz</h4>
                  <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5">
                    An AI health companion that explains medical language, health activity, and next steps in plain words.
                  </p>
                  <SectionImage src="/assets/images/GeDQDLqUkbz5f2uPhBkUXmjYI.png" alt="Health Wiz feature" className="max-h-[520px] object-top" />
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <h4 className="text-[20px] md:text-[24px] font-bold tracking-[-0.02em] mb-2">Lifestyle Change Suggestions</h4>
                <p className="text-[15px] text-muted-foreground leading-[1.58] mb-5 max-w-[680px]">
                  A WhatsApp prompt that turns health changes into clear next steps inside the central app.
                </p>
                <SectionImage src="/assets/images/SesFQCUIIDduKIA7xxJhrG1KKYM.png" alt="Lifestyle change feature" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14" id="learnings">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              What the work <span className="heading-italic">clarified</span>
            </motion.h2>
            <motion.p className="text-[15px] text-muted-foreground mb-8 max-w-[680px]" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              The value came from the sequence: evidence first, then concept choice, then interface craft.
            </motion.p>
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-7" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              {LEARNINGS.map((l) => (
                <motion.div key={l.title} variants={fadeUp} className="border-t border-border/55 pt-4">
                  {l.image && <img src={assetPath(l.image)} alt={l.title} className="w-full aspect-[4/3] object-cover rounded-2xl frost-media mb-4" loading="lazy" />}
                  <h3 className="text-[14px] font-semibold mb-1">{l.title}</h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{l.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
