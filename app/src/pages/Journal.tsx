import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { PageTransition } from "@/components/PageTransition"
import { Seo } from "@/components/Seo"
import { JOURNAL_ARTICLES } from "@/data/journal"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const
const DURATION_REVEAL = 0.6
const STAGGER = 0.06

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_REVEAL, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

export default function JournalPage() {
  return (
    <PageTransition>
      <Seo
        title="Journal - Kousik Dutta on AI interfaces, design engineering, and craft"
        description="Long-form notes on generative UI, agentic interfaces, evals, latency, design systems, and the craft of product design."
        path="/journal"
      />

      <div className="journal-page relative">
        <section className="pt-28 pb-10 md:pt-36 md:pb-14">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
              className="journal-masthead"
            >
              <p className="section-kicker mb-3">Journal</p>
              <h1 className="journal-title">
                Notes from the edge of{" "}
                <span className="heading-italic">interface and intelligence</span>.
              </h1>
              <p className="journal-standfirst">
                Long-form pieces on how AI is changing what an interface is, and
                what stays true regardless. Researched, referenced, and written
                from the work.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <ol className="journal-index">
              {JOURNAL_ARTICLES.map((article, index) => (
                <motion.li
                  key={article.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  custom={Math.min(index, 6)}
                >
                  <Link
                    to={`/journal/${article.id}`}
                    className="journal-entry"
                    data-cursor="Read"
                  >
                    <span className="journal-entry-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="journal-entry-body">
                      <span className="journal-entry-meta">
                        <span>{article.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{article.readTime}</span>
                      </span>
                      <h2 className="journal-entry-title">{article.title}</h2>
                      <p className="journal-entry-subtitle">{article.subtitle}</p>
                      <p className="journal-entry-excerpt">{article.excerpt}</p>
                      <span className="journal-entry-tags">
                        {article.tags.map((tag) => (
                          <span key={tag} className="journal-tag">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
