import { motion } from "framer-motion"
import { Link, Navigate, useParams } from "react-router-dom"
import { PageTransition } from "@/components/PageTransition"
import { Seo } from "@/components/Seo"
import { JOURNAL_ARTICLES, PER_PAGE, getPageCount } from "@/data/journal"

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
  const { page: pageParam } = useParams()
  const pageCount = getPageCount()
  const page = pageParam ? Number(pageParam) : 1

  const isValid =
    Number.isInteger(page) && page >= 1 && page <= pageCount

  if (!isValid) return <Navigate to="/journal" replace />
  if (pageParam === "1") return <Navigate to="/journal" replace />

  const start = (page - 1) * PER_PAGE
  const articles = JOURNAL_ARTICLES.slice(start, start + PER_PAGE)
  const path = page === 1 ? "/journal" : `/journal/page/${page}`

  return (
    <PageTransition>
      <Seo
        title={
          page === 1
            ? "Journal - Kousik Dutta on AI interfaces, design engineering, and craft"
            : `Journal, page ${page} of ${pageCount} - Kousik Dutta`
        }
        description="Long-form notes on generative UI, agentic interfaces, evals, latency, design systems, and the craft of product design."
        path={path}
      />

      <div className="journal-page relative" data-particle-profile="reading">
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

        <section className="pb-24 md:pb-32" data-particle-fade>
          <div className="max-w-[980px] mx-auto px-6 md:px-10">
            <ol className="journal-index">
              {articles.map((article, index) => (
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
                      {String(start + index + 1).padStart(2, "0")}
                    </span>

                    <span className="journal-entry-body">
                      <span className="journal-entry-meta">
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

            {pageCount > 1 ? (
              <nav className="journal-pagination" aria-label="Journal pages">
                {page > 1 ? (
                  <Link
                    to={page === 2 ? "/journal" : `/journal/page/${page - 1}`}
                    className="journal-pagination-step"
                    rel="prev"
                    data-cursor="Previous"
                  >
                    <span aria-hidden="true">&larr;</span> Newer
                  </Link>
                ) : (
                  <span className="journal-pagination-step is-disabled" aria-hidden="true">
                    <span>&larr;</span> Newer
                  </span>
                )}

                <ol className="journal-pagination-pages">
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                    <li key={n}>
                      <Link
                        to={n === 1 ? "/journal" : `/journal/page/${n}`}
                        className={
                          n === page
                            ? "journal-pagination-page is-current"
                            : "journal-pagination-page"
                        }
                        aria-current={n === page ? "page" : undefined}
                        aria-label={`Page ${n}`}
                        data-cursor="none"
                      >
                        {n}
                      </Link>
                    </li>
                  ))}
                </ol>

                {page < pageCount ? (
                  <Link
                    to={`/journal/page/${page + 1}`}
                    className="journal-pagination-step"
                    rel="next"
                    data-cursor="Next"
                  >
                    Older <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : (
                  <span className="journal-pagination-step is-disabled" aria-hidden="true">
                    Older <span>&rarr;</span>
                  </span>
                )}
              </nav>
            ) : null}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
