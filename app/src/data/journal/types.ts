import type { ChartDatum } from "@/components/DataChart"

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "lede"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; author: string; source?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; text: string; language?: string; caption?: string }
  | { type: "diagram"; chart: string; caption?: string }
  | {
      type: "chart"
      data: ChartDatum[]
      caption?: string
      source?: string
      unit?: string
    }
  | { type: "callout"; title: string; text: string }
  | { type: "takeaway"; text: string }
  | {
      type: "table"
      head: string[]
      rows: string[][]
      caption?: string
      source?: string
      emphasiseColumn?: number
    }
  | {
      type: "stats"
      items: { value: string; label: string; source?: string }[]
      caption?: string
    }
  | {
      type: "scale"
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
  | {
      type: "compare"
      left: { title: string; items: string[] }
      right: { title: string; items: string[] }
      caption?: string
    }
  | {
      type: "figure"
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
  | {
      type: "sourcecard"
      title: string
      publisher: string
      description: string
      href: string
    }

export interface Reference {
  label: string
  detail: string
  href: string
}

export interface Article {
  id: string
  title: string
  subtitle: string
  readTime: string
  excerpt: string
  tags: string[]
  content: ArticleBlock[]
  references: Reference[]
}
