import { motion, useScroll, useSpring } from "framer-motion"
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { PageTransition } from "@/components/PageTransition"
import { Seo } from "@/components/Seo"
import { Diagram } from "@/components/Diagram"
import { DataChart } from "@/components/DataChart"
import {
  ArticleFigure,
  ComparePanels,
  DataTable,
  SourceCard,
  StatBand,
  ThresholdScale,
} from "@/components/journal-figures"
import { getAdjacent, getArticle, type ArticleBlock } from "@/data/journal"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const

const WIDE_BLOCKS = new Set<ArticleBlock["type"]>([
  "diagram",
  "chart",
  "table",
  "stats",
  "scale",
  "compare",
  "figure",
  "sourcecard",
])

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_ENTER, delay: i * 0.06 },
  }),
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "lede":
      return <p className="journal-lede">{block.text}</p>
    case "p":
      return <p className="journal-p">{block.text}</p>
    case "h2":
      return <h2 className="journal-h2">{block.text}</h2>
    case "quote":
      return (
        <blockquote className="journal-quote">
          <p>{block.text}</p>
          <footer>
            <span className="journal-quote-author">{block.author}</span>
            {block.source ? (
              <span className="journal-quote-source">{block.source}</span>
            ) : null}
          </footer>
        </blockquote>
      )
    case "ul":
      return (
        <ul className="journal-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="journal-list is-ordered">
          {block.items.map((item, index) => (
            <li key={item}>
              <span className="journal-list-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case "code":
      return (
        <figure className="journal-code">
          <div className="journal-code-frame">
            {block.language ? (
              <div className="journal-code-lang">{block.language}</div>
            ) : null}
            <pre>
              <code>{block.text}</code>
            </pre>
          </div>
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      )
    case "diagram":
      return <Diagram chart={block.chart} caption={block.caption} />
    case "chart":
      return (
        <DataChart
          data={block.data}
          caption={block.caption}
          source={block.source}
          unit={block.unit}
        />
      )
    case "callout":
      return (
        <aside className="journal-callout">
          <p className="journal-callout-title">{block.title}</p>
          <p className="journal-callout-text">{block.text}</p>
        </aside>
      )
    case "takeaway":
      return (
        <aside className="journal-takeaway">
          <p className="journal-takeaway-label">The takeaway</p>
          <p className="journal-takeaway-text">{block.text}</p>
        </aside>
      )
    case "table":
      return (
        <DataTable
          head={block.head}
          rows={block.rows}
          caption={block.caption}
          source={block.source}
          emphasiseColumn={block.emphasiseColumn}
        />
      )
    case "stats":
      return <StatBand items={block.items} caption={block.caption} />
    case "scale":
      return (
        <ThresholdScale
          min={block.min}
          max={block.max}
          unit={block.unit}
          points={block.points}
          caption={block.caption}
          source={block.source}
        />
      )
    case "compare":
      return (
        <ComparePanels
          left={block.left}
          right={block.right}
          caption={block.caption}
        />
      )
    case "figure":
      return (
        <ArticleFigure
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          credit={block.credit}
          creditHref={block.creditHref}
          licence={block.licence}
          licenceHref={block.licenceHref}
          aspect={block.aspect}
        />
      )
    case "sourcecard":
      return (
        <SourceCard
          title={block.title}
          publisher={block.publisher}
          description={block.description}
          href={block.href}
        />
      )
    default:
      return null
  }
}

export default function JournalArticlePage() {
  const { id } = useParams()
  const article = getArticle(id)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  })

  if (!article) {
    return <Navigate to="/journal" replace />
  }

  const { previous, next } = getAdjacent(article.id)

  return (
    <PageTransition>
      <Seo
        title={`${article.title} - Journal - Kousik Dutta`}
        description={article.excerpt}
        path={`/journal/${article.id}`}
      />

      <motion.div
        className="journal-reading-progress"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <article className="journal-article">
        <header className="journal-article-header">
          <div className="journal-measure">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <Link to="/journal" className="journal-back" data-cursor="none">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Journal</span>
              </Link>
            </motion.div>

            <motion.p
              className="journal-article-meta"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </motion.p>

            <motion.h1
              className="journal-article-title"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              {article.title}
            </motion.h1>

            <motion.p
              className="journal-article-subtitle"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
            >
              {article.subtitle}
            </motion.p>

            <motion.div
              className="journal-entry-tags is-header"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={4}
            >
              {article.tags.map((tag) => (
                <span key={tag} className="journal-tag">
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </header>

        <div className="journal-body">
          {article.content.map((block, index) => {
            const wide = WIDE_BLOCKS.has(block.type)
            return (
              <motion.div
                key={index}
                className={wide ? "journal-measure is-wide" : "journal-measure"}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, ease: EASE_ENTER }}
              >
                <Block block={block} />
              </motion.div>
            )
          })}
        </div>

        <footer className="journal-article-footer">
          <div className="journal-measure">
            <h2 className="journal-references-title">Sources &amp; further reading</h2>
            <ul className="journal-references">
              {article.references.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href} target="_blank" rel="noreferrer noopener">
                    <span className="journal-reference-label">
                      {reference.label}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="journal-reference-detail">{reference.detail}</span>
                  </a>
                </li>
              ))}
            </ul>

            <nav className="journal-pager" aria-label="More articles">
              {previous ? (
                <Link to={`/journal/${previous.id}`} className="journal-pager-link">
                  <span className="journal-pager-label">
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </span>
                  <span className="journal-pager-title">{previous.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  to={`/journal/${next.id}`}
                  className="journal-pager-link is-next"
                >
                  <span className="journal-pager-label">
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="journal-pager-title">{next.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </div>
        </footer>
      </article>
    </PageTransition>
  )
}
