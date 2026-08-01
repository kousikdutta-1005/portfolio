import type { Article } from "./types"

import { generativeUi } from "./articles/generative-ui"
import { tasteAsMoat } from "./articles/taste-is-the-moat"
import { provenance } from "./articles/provenance"
import { motion } from "./articles/motion-is-physics"
import { componentApi } from "./articles/component-api-design"

import { agenticCanvas } from "./articles/agentic-canvas"
import { typography } from "./articles/typography-as-engineering"
import { designSystemAdoption } from "./articles/why-design-systems-die"
import { latency } from "./articles/latency-is-a-feeling"
import { metrics } from "./articles/when-the-metric-lies"

import { evals } from "./articles/evals-for-designers"
import { color } from "./articles/color-that-survives"
import { complexity } from "./articles/conservation-of-complexity"
import { forms } from "./articles/forms-deserve-better"
import { localFirst } from "./articles/local-first-intelligence"

import { designEngineering } from "./articles/design-engineering"
import { dataviz } from "./articles/charts-that-tell-truth"
import { experimentation } from "./articles/when-the-test-lies"
import { material } from "./articles/material-and-depth"
import { onboarding } from "./articles/the-first-five-minutes"

import { layout } from "./articles/layout-without-breakpoints"
import { informationArchitecture } from "./articles/naming-is-the-architecture"
import { multimodal } from "./articles/interfaces-without-screens"
import { consent } from "./articles/consent-is-a-design-problem"
import { accessibility } from "./articles/solve-for-one"

export type { Article, ArticleBlock, Reference } from "./types"

export const JOURNAL_ARTICLES: Article[] = [
  generativeUi,
  tasteAsMoat,
  provenance,
  motion,
  componentApi,

  agenticCanvas,
  typography,
  designSystemAdoption,
  latency,
  metrics,

  evals,
  color,
  complexity,
  forms,
  localFirst,

  designEngineering,
  dataviz,
  experimentation,
  material,
  onboarding,

  layout,
  informationArchitecture,
  multimodal,
  consent,
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

export const PER_PAGE = 5

export function getPageCount() {
  return Math.max(1, Math.ceil(JOURNAL_ARTICLES.length / PER_PAGE))
}
