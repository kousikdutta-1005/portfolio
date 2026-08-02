import { motion } from "framer-motion"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const
const STAGGER = 0.08

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
}

export type CaseStoryItem = {
  label: string
  text: string
}

export type CaseEvidenceItem = {
  value: string
  label: string
  desc: string
}

export function CaseStory({ title, lead, items }: { title: string; lead: string; items: CaseStoryItem[] }) {
  return (
    <motion.section
      className="precisely-story-section pb-10"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <div className="precisely-story-layout">
          <motion.div variants={fadeUp} className="precisely-story-lead">
            <h2>{title}</h2>
            <p>{lead}</p>
          </motion.div>
          <motion.div variants={staggerContainer} className="precisely-story-points" aria-label="Case summary">
            {items.map((summaryItem) => (
              <motion.article key={summaryItem.label} variants={fadeUp} className="precisely-story-point">
                <h3>{summaryItem.label}</h3>
                <p>{summaryItem.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export function CaseEvidenceStrip({
  items,
  caveat,
}: {
  items: CaseEvidenceItem[]
  /**
   * What these numbers do not establish. The retrospective further down each
   * case study already interrogates them, but it sits hundreds of lines below
   * the claim, so a reader scanning the top never reaches it. This puts the
   * limit next to the number and links to the longer argument.
   */
  caveat?: { text: string; to?: string }
}) {
  return (
    <>
      <motion.div
        className="precisely-evidence-strip"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label="Evidence from the case study"
      >
        {items.map((item) => (
          <motion.div key={item.label} variants={fadeUp} className="precisely-evidence-item">
            <span>{item.value}</span>
            <h3>{item.label}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
      {caveat ? (
        <motion.p
          className="case-evidence-caveat"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="case-evidence-caveat-label">What this does not prove</span>
          {caveat.text}{" "}
          <a className="case-evidence-caveat-link" href={caveat.to ?? "#retro"}>
            Read the full retrospective
          </a>
        </motion.p>
      ) : null}
    </>
  )
}
