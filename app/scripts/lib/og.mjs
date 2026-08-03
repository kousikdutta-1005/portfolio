/**
 * Social card catalogue.
 *
 * Every route that gets meta tags also gets its own 1200x630 card. This file is
 * the single list of which cards exist and what they say, so postbuild (which
 * points og:image at them), the generator (which draws them) and check-og
 * (which refuses to ship a route without one) cannot disagree.
 */

import { readJournalArticles } from "./journal.mjs"

export const CARD_DIR = "assets/og"

/** Route path -> card slug. Paginated journal pages share the index card. */
export function cardSlug(path) {
  if (path === "/") return "home"
  if (path.startsWith("/journal/page/")) return "journal"
  return path.replace(/^\//u, "").replace(/\//gu, "-")
}

export function cardUrl(siteUrl, path) {
  return `${siteUrl}/${CARD_DIR}/${cardSlug(path)}.jpg`
}

const STATIC_CARDS = [
  { slug: "home", kind: "home" },
  {
    slug: "about",
    kicker: "About",
    title: "I design the interface, then build the front-end that ships it.",
  },
  { slug: "case-study-thoughtspot", kicker: "Case Study", title: "ThoughtSpot Mobile" },
  { slug: "case-study-philips", kicker: "Case Study", title: "Philips Cardiocare" },
  { slug: "case-study-precisely-devportal", kicker: "Case Study", title: "Precisely Developer Portal" },
  { slug: "case-study-portfolio", kicker: "Case Study", title: "Building This Portfolio" },
  {
    slug: "journal",
    kicker: "Journal",
    title: "Writing on design engineering, AI interfaces, and craft",
  },
]

/** Every card the site needs, in generation order. */
export async function cardSpecs() {
  const articles = await readJournalArticles()
  return [
    ...STATIC_CARDS,
    ...articles.map(({ id, title }) => ({
      slug: `journal-${id}`,
      kicker: "Journal",
      title,
    })),
  ]
}
