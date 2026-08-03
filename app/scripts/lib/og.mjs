/**
 * Social card catalogue.
 *
 * Every route that gets meta tags also gets its own 1200x630 card. This file is
 * the single list of which cards exist and what they say, so postbuild (which
 * points og:image at them), the generator (which draws them) and check-og
 * (which refuses to ship a route without one) cannot disagree.
 *
 * Card filenames carry a content hash. Social platforms cache the copy they
 * derive from a given image URL and do not re-derive it when the bytes behind
 * that URL change, so a stable filename means a card can never be corrected
 * once it has been shared. The hash makes every edit a new URL.
 */

import { readFile } from "node:fs/promises"
import { readJournalArticles } from "./journal.mjs"

export const CARD_DIR = "assets/og"
export const MANIFEST = new URL(`../../public/${CARD_DIR}/manifest.json`, import.meta.url).pathname

/** Route path -> card slug. Paginated journal pages share the index card. */
export function cardSlug(path) {
  if (path === "/") return "home"
  if (path.startsWith("/journal/page/")) return "journal"
  return path.replace(/^\//u, "").replace(/\//gu, "-")
}

export async function loadManifest() {
  return JSON.parse(await readFile(MANIFEST, "utf8"))
}

export function cardUrl(siteUrl, path, manifest) {
  const slug = cardSlug(path)
  const file = manifest[slug]
  if (!file) throw new Error(`No social card for "${slug}". Run \`npm run og\`.`)
  return `${siteUrl}/${CARD_DIR}/${file}`
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

/**
 * Alt text describing what the card actually shows. Derived from the same spec
 * that draws it, so it cannot describe a card that is no longer there.
 */
export function cardAlt(spec) {
  if (spec.kind === "home") {
    return "Thinking becomes product. Kousik Dutta, product designer and UX engineer."
  }
  // Some titles are full sentences and already end in a stop.
  const title = spec.title.replace(/\.$/u, "")
  return `${spec.kicker}: ${title}. Kousik Dutta, product designer and UX engineer.`
}

/** Card slug to alt text, for the routes that need it at build time. */
export async function cardAltBySlug() {
  return new Map((await cardSpecs()).map((spec) => [spec.slug, cardAlt(spec)]))
}
