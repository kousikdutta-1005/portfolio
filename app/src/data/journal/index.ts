import type { Article } from "./types"
import { generativeUi } from "./articles/generative-ui"
import { provenance } from "./articles/provenance"
import { agenticCanvas } from "./articles/agentic-canvas"
import { evals } from "./articles/evals-for-designers"
import { latency } from "./articles/latency-is-a-feeling"
import { designEngineering } from "./articles/design-engineering"
import { tasteAsMoat } from "./articles/taste-is-the-moat"
import { localFirst } from "./articles/local-first-intelligence"
import { material } from "./articles/material-and-depth"
import { complexity } from "./articles/conservation-of-complexity"
import { motion } from "./articles/motion-is-physics"
import { accessibility } from "./articles/solve-for-one"

export type { Article, ArticleBlock, Reference } from "./types"

export const JOURNAL_ARTICLES: Article[] = [
  generativeUi,
  provenance,
  agenticCanvas,
  evals,
  latency,
  designEngineering,
  tasteAsMoat,
  localFirst,
  material,
  complexity,
  motion,
  accessibility,
]

export function getArticle(id: string | undefined) {
  if (!id) return undefined
  return JOURNAL_ARTICLES.find((article) => article.id === id)
}

export function getAdjacent(id: string) {
  const index = JOURNAL_ARTICLES.findIndex((article) => article.id === id)
  if (index === -1) return { previous: undefined, next: undefined }
  return {
    previous: index > 0 ? JOURNAL_ARTICLES[index - 1] : undefined,
    next:
      index < JOURNAL_ARTICLES.length - 1
        ? JOURNAL_ARTICLES[index + 1]
        : undefined,
  }
}
