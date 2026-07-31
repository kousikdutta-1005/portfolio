import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { PageTransition } from "@/components/PageTransition"
import { Seo } from "@/components/Seo"
import { AboutGallery } from "@/components/AboutGallery"

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

const ABOUT_PROOF_POINTS = [
  {
    label: "Now",
    value: "Precisely",
    desc: "Data-integrity workflows, developer tools, and product systems that need trust.",
  },
  {
    label: "Before",
    value: "ThoughtSpot, Philips, OLX, Airtel, Vedantu",
    desc: "Analytics, healthcare, service systems, telecom, commerce, and learning.",
  },
  {
    label: "Mode",
    value: "Frame, shape, prototype",
    desc: "Strategy, interaction design, visual craft, and AI-assisted code in one loop.",
  },
]

const WORKING_PRINCIPLES = [
  {
    title: "Frame the real decision.",
    desc: "I separate the product question from the surrounding noise so the team knows what needs to become obvious.",
  },
  {
    title: "Shape the calmest flow.",
    desc: "I turn complexity into hierarchy, states, motion, and copy that help people trust the product faster.",
  },
  {
    title: "Build the riskiest part.",
    desc: "I prototype the interaction or edge case that will teach the team the most before the product hardens.",
  },
]

const EXPERIENCE = [
  {
    period: "2024 to present",
    role: "Senior Product Designer",
    company: "Precisely",
    desc: "Building B2B Spatial Analytics & Enrichment Software via scalable patterns for the Precisely Design System and GitHub Copilot.",
  },
  {
    period: "2023 to 2024",
    role: "Product Designer",
    company: "ThoughtSpot",
    desc: "Increased ThoughtSpot mobile app downloads by 3x through responsive app redesign & user-centric product improvements.",
  },
  {
    period: "2022 to 2024",
    role: "UX Design Consultant",
    company: "Freelance",
    desc: "Partnered with teams like UN WFP and Devasthana on MVP development, responsive websites, and relief delivery UI.",
  },
  {
    period: "2021 to 2023",
    role: "UX Design Intern",
    company: "Philips, OLX, Airtel, Vedantu",
    desc: "Applied systems thinking across healthcare, auto tech, telecom, and ed-tech, improving user engagement and project alignment.",
  },
]

const AWARDS = [
  { title: "2x University Gold Medal", sub: "Best Overall Student 2023 & Best Design Student 2023" },
  { title: "Winner", sub: "D'source Design Challenge & CII Young Designer Awards 2022" },
  { title: "Publication", sub: "Paper on AI Ayurvedic Nutrition App at HCII 2022" },
  { title: "Honorable Mention", sub: "Student Service Design Challenge 2022" },
  { title: "Excellence Award", sub: "Dean's List 2021" },
]


function WorkingMethodSection() {
  return (
    <section className="py-14 md:py-20 relative">
      <div className="waypoint-3d" data-model="macbook_pro_m3_16_inch_2024" data-x-desktop="0.25" data-y-desktop="0.5" data-x-mobile="0.5" data-y-mobile="0.3" data-z-depth="100" />
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <div className="method-panel">
          <div className="method-copy">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <p className="method-kicker">How I work</p>
              <h2 className="method-title">
                I turn ambiguity into direction a team can <span className="heading-italic">feel</span>.
              </h2>
            </motion.div>
            <motion.div
              className="method-list"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {WORKING_PRINCIPLES.map((item, index) => (
                <motion.div key={item.title} variants={fadeUp} className="method-row">
                  <span className="method-index">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <PageTransition>
      <Seo
        title="About Kousik Dutta - Product Design, Systems Thinking, AI Prototyping"
        description="Learn how Kousik Dutta frames product problems, designs calm systems, and uses AI-assisted code to make product direction testable."
        path="/about"
      />
      <div className="about-page relative">
        <section className="about-hero pt-28 pb-14 md:pt-36 md:pb-20">
          <div className="waypoint-3d" data-model="apple_vision_pro" data-x-desktop="0.8" data-y-desktop="0.3" data-x-mobile="0.5" data-y-mobile="0.15" data-z-depth="-200" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <div className="about-hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE_ENTER }}
              >
                <h1 className="about-hero-title">
                  <span className="block">Fast.</span>
                  <span className="block heading-italic">Precise.</span>
                  <span className="block text-foreground/80">Human.</span>
                </h1>
              </motion.div>

              <motion.div
                className="about-hero-copy"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_ENTER, delay: 0.12 }}
              >
                <p className="about-role">I'm Kousik Dutta, a senior product designer.</p>
                <p>
                  I turn messy product systems into clear decisions and buildable interfaces.
                </p>
                <p>
                  My work moves through strategy, interaction design, visual craft, and AI-assisted prototyping. The tools help me move faster. The judgment stays human.
                </p>
                <div className="about-actions">
                  <a
                    href="/Kousik_Dutta_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonVariants({ variant: "default", size: "default" })}
                    aria-label="Download resume in a new tab"
                    data-cursor="none"
                  >
                    Download resume
                  </a>
                  <a
                    href="https://calendly.com/design-kousik/intro-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link text-[15px]"
                    aria-label="Book a call in a new tab"
                    data-cursor="none"
                  >
                    Book a call
                  </a>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="about-proof-strip"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {ABOUT_PROOF_POINTS.map((proof, index) => (
                <motion.div key={proof.label} className="about-proof-item" variants={fadeUp} custom={index}>
                  <p>{proof.label}</p>
                  <h2>{proof.value}</h2>
                  <span>{proof.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <WorkingMethodSection />

        <section className="py-14 md:py-20 relative">
          <div className="waypoint-3d" data-model="iphone_17_pro" data-x-desktop="0.85" data-y-desktop="0.6" data-x-mobile="0.5" data-y-mobile="0.6" data-z-depth="-50" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="section-kicker mb-1.5">Experience</p>
              <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
                Built inside <span className="heading-italic">real</span> product teams.
              </h2>
              <p className="mt-2.5 text-[15px] leading-[1.58] text-muted-foreground max-w-[620px]">
                Enterprise data, analytics, healthcare, service systems, telecom, commerce, and learning.
              </p>
            </motion.div>

            <motion.ol
              className="experience-list"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {EXPERIENCE.map((item, index) => (
                <motion.li
                  key={`${item.company}-${item.role}`}
                  variants={fadeUp}
                  className={`experience-row${index < EXPERIENCE.length - 1 ? " experience-row-bordered" : ""}`}
                >
                  <p className="text-[12px] text-muted-foreground font-semibold">{item.period}</p>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                      <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{item.role}</h3>
                      <p className="text-[14px] text-foreground/70">{item.company}</p>
                    </div>
                    <p className="mt-1.5 text-[14px] leading-[1.58] text-muted-foreground max-w-[620px]">
                      {item.desc}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </section>

        <section className="py-14 md:py-20 relative">
          <div className="waypoint-3d" data-model="apple_watch_ultra_2" data-x-desktop="0.25" data-y-desktop="0.8" data-x-mobile="0.5" data-y-mobile="0.8" data-z-depth="250" />
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <p className="section-kicker mb-1.5">Recognition</p>
              <h2 className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em]">
                Awards and recognition from the <span className="heading-italic">work</span>.
              </h2>
            </motion.div>
            <motion.div
              className="recognition-list"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              {AWARDS.map((award) => (
                <motion.div key={award.title} variants={fadeUp} className="recognition-row">
                  <h3>{award.title}</h3>
                  <p>{award.sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        <AboutGallery />
      </div>
    </PageTransition>
  )
}
