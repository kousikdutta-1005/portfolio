import { motion } from "framer-motion"

export interface ChartDatum {
  label: string
  value: number
  display?: string
  highlight?: boolean
}

interface DataChartProps {
  data: ChartDatum[]
  caption?: string
  source?: string
  unit?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

export function DataChart({ data, caption, source, unit }: DataChartProps) {
  const max = Math.max(...data.map((d) => d.value)) || 1

  return (
    <figure className="journal-chart">
      <div className="journal-chart-rows">
        {data.map((datum, index) => (
          <div key={datum.label} className="journal-chart-row">
            <span className="journal-chart-label">{datum.label}</span>
            <div className="journal-chart-track">
              <motion.span
                className={
                  datum.highlight
                    ? "journal-chart-fill is-highlight"
                    : "journal-chart-fill"
                }
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: Math.max(datum.value / max, 0.02) }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: EASE, delay: index * 0.07 }}
              />
            </div>
            <span className="journal-chart-value">
              {datum.display ?? `${datum.value}${unit ?? ""}`}
            </span>
          </div>
        ))}
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
