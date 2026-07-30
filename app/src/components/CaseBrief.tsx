import { motion } from "framer-motion"
import { useId } from "react"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const

export type CaseBriefItem = {
  label: string
  text: string
}

type CaseBriefProps = {
  eyebrow?: string
  title: string
  insight: string
  proof: string
  items: CaseBriefItem[]
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_ENTER },
  },
}

export function CaseBrief({ eyebrow = "Case brief", title, insight, proof, items }: CaseBriefProps) {
  const titleId = useId()

  return (
    <motion.section
      className="case-brief-section pb-8"
      variants={container}
      initial="hidden"
      animate="visible"
      aria-labelledby={titleId}
    >
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <motion.div className="case-brief glass-card rounded-2xl md:rounded-[1.5rem] p-5 md:p-6" variants={item}>
          <div className="case-brief-copy">
            <p className="case-brief-eyebrow">{eyebrow}</p>
            <h2 id={titleId} className="case-brief-title">
              {title}
            </h2>
            <p className="case-brief-insight">{insight}</p>
            <div className="case-brief-proof" aria-label={`Proof point: ${proof}`}>
              <span>Proof</span>
              <strong>{proof}</strong>
            </div>
          </div>

          <div className="case-brief-grid" aria-label="Case summary">
            {items.map((summaryItem, index) => (
              <motion.article key={summaryItem.label} className="case-brief-item" variants={item}>
                <span className="case-brief-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{summaryItem.label}</h3>
                  <p>{summaryItem.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
