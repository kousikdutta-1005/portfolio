import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const

interface DataTableProps {
  head: string[]
  rows: string[][]
  caption?: string
  source?: string
  emphasiseColumn?: number
}

export function DataTable({
  head,
  rows,
  caption,
  source,
  emphasiseColumn,
}: DataTableProps) {
  return (
    <figure className="journal-table">
      <div className="journal-table-scroll">
        <table>
          <thead>
            <tr>
              {head.map((cell, index) => (
                <th
                  key={cell}
                  scope="col"
                  className={index === emphasiseColumn ? "is-emphasised" : undefined}
                >
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, index) =>
                  index === 0 ? (
                    <th key={cell} scope="row">
                      {cell}
                    </th>
                  ) : (
                    <td
                      key={`${row[0]}-${index}`}
                      className={
                        index === emphasiseColumn ? "is-emphasised" : undefined
                      }
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(caption || source) && (
        <figcaption>
          {caption}
          {source ? <cite>{source}</cite> : null}
        </figcaption>
      )}
    </figure>
  )
}

interface StatBandProps {
  items: { value: string; label: string; source?: string }[]
  caption?: string
}

export function StatBand({ items, caption }: StatBandProps) {
  return (
    <figure className="journal-stats">
      <div className="journal-stats-grid" data-count={items.length}>
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            className="journal-stat"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
          >
            <div className="journal-stat-value">{item.value}</div>
            <div className="journal-stat-label">{item.label}</div>
            {item.source ? (
              <div className="journal-stat-source">{item.source}</div>
            ) : null}
          </motion.div>
        ))}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

interface ThresholdScaleProps {
  min: number
  max: number
  unit?: string
  points: {
    at: number
    label: string
    note?: string
    tone?: "good" | "warn" | "bad"
  }[]
  caption?: string
  source?: string
}

export function ThresholdScale({
  min,
  max,
  unit,
  points,
  caption,
  source,
}: ThresholdScaleProps) {
  const lo = Math.log10(Math.max(min, Number.MIN_VALUE))
  const hi = Math.log10(Math.max(max, min * 10))
  const position = (value: number) =>
    Math.min(
      100,
      Math.max(2, ((Math.log10(Math.max(value, min)) - lo) / (hi - lo)) * 100),
    )

  const format = (value: number) => {
    if (unit === "ms") {
      if (value < 0.001) return `${Math.round(value * 1e6)} ns`
      if (value < 1) return `${Math.round(value * 1000)} µs`
      if (value >= 1000) return `${value / 1000} s`
      return `${value} ms`
    }
    return `${value}${unit ?? ""}`
  }

  return (
    <figure className="journal-scale">
      <ol className="journal-scale-rows">
        {points.map((point, index) => (
          <li
            key={point.label}
            className={`journal-scale-row tone-${point.tone ?? "good"}`}
          >
            <div className="journal-scale-head">
              <span className="journal-scale-label">{point.label}</span>
              <span className="journal-scale-value">{format(point.at)}</span>
            </div>
            <div className="journal-scale-track">
              <motion.span
                className="journal-scale-fill"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: position(point.at) / 100 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.85, ease: EASE, delay: index * 0.09 }}
              />
            </div>
            {point.note ? (
              <span className="journal-scale-note">{point.note}</span>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="journal-scale-axis" aria-hidden="true">
        <span>{format(min)}</span>
        <span>log scale</span>
        <span>{format(max)}</span>
      </div>
      {(caption || source) && (
        <figcaption>
          {caption}
          {source ? <cite>{source}</cite> : null}
        </figcaption>
      )}
    </figure>
  )
}

interface CompareProps {
  left: { title: string; items: string[] }
  right: { title: string; items: string[] }
  caption?: string
}

export function ComparePanels({ left, right, caption }: CompareProps) {
  return (
    <figure className="journal-compare">
      <div className="journal-compare-grid">
        {[left, right].map((panel, index) => (
          <motion.div
            key={panel.title}
            className={index === 1 ? "journal-compare-panel is-after" : "journal-compare-panel"}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
          >
            <div className="journal-compare-title">{panel.title}</div>
            <ul>
              {panel.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

interface ArticleFigureProps {
  src: string
  alt: string
  caption?: string
  credit: string
  creditHref: string
  licence: string
  licenceHref?: string
  width: number
  height: number
}

export function ArticleFigure({
  src,
  alt,
  caption,
  credit,
  creditHref,
  licence,
  licenceHref,
  width,
  height,
}: ArticleFigureProps) {
  const isPortrait = height > width

  return (
    <figure className="journal-figure">
      <motion.div
        className={cn(
          "journal-figure-frame",
          isPortrait && "is-portrait",
        )}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={{ aspectRatio: `${width} / ${height}` }}
          loading="lazy"
          decoding="async"
        />
      </motion.div>
      <figcaption>
        {caption ? <span className="journal-figure-caption">{caption}</span> : null}
        <span className="journal-figure-credit">
          <a href={creditHref} target="_blank" rel="noopener noreferrer">
            {credit}
          </a>
          <span className="journal-figure-licence">
            {licenceHref ? (
              <a href={licenceHref} target="_blank" rel="noopener noreferrer">
                {licence}
              </a>
            ) : (
              licence
            )}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}

interface SourceCardProps {
  title: string
  publisher: string
  description: string
  href: string
}

export function SourceCard({ title, publisher, description, href }: SourceCardProps) {
  return (
    <motion.a
      className="journal-sourcecard"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <span className="journal-sourcecard-kicker">See the original figure</span>
      <span className="journal-sourcecard-title">{title}</span>
      <span className="journal-sourcecard-desc">{description}</span>
      <span className="journal-sourcecard-foot">
        <span className="journal-sourcecard-publisher">{publisher}</span>
        <span className="journal-sourcecard-arrow" aria-hidden="true">
          &#8599;
        </span>
      </span>
    </motion.a>
  )
}
