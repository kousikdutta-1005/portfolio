import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_ENTER } },
}

export type CaseRetroItem = {
  claim: string
  shipped: string
  better: string
  article: { title: string; to: string }
}

type CaseRetroProps = {
  id?: string
  lead: string
  items: CaseRetroItem[]
}

export function CaseRetro({ id = "retro", lead, items }: CaseRetroProps) {
  return (
    <section className="py-10 md:py-14" id={id}>
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <motion.p
          className="text-[13px] font-semibold text-muted-foreground mb-2"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          In hindsight
        </motion.p>
        <motion.h2
          className="text-[28px] md:text-[32px] font-bold tracking-[-0.02em] mb-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          What I would do <span className="heading-italic">differently</span>
        </motion.h2>
        <motion.p
          className="text-[15px] text-muted-foreground mb-8 max-w-[680px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {lead}
        </motion.p>

        <ol className="case-retro">
          {items.map((item, index) => (
            <motion.li
              key={item.claim}
              className="case-retro-item"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              <div className="case-retro-head">
                <span className="case-retro-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="case-retro-claim">{item.claim}</h3>
                <Link to={item.article.to} className="case-retro-link">
                  {item.article.title}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="case-retro-pair">
                <div className="case-retro-cell">
                  <span className="case-retro-label">What I shipped</span>
                  <p>{item.shipped}</p>
                </div>
                <div className="case-retro-cell is-better">
                  <span className="case-retro-label">What I would do now</span>
                  <p>{item.better}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
