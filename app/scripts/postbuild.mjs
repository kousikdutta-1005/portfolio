import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

const dist = new URL("../dist/", import.meta.url)
const articlesDir = new URL("../src/data/journal/articles/", import.meta.url)
const siteUrl = "https://kousikdutta.com"
const defaultImage = `${siteUrl}/assets/images/1GW8AENYNU5gayo8utt1YsKnfY.jpg`

const routes = [
  {
    path: "/",
    file: "index.html",
    title: "Kousik Dutta - Senior Product Designer",
    description:
      "Senior product designer shaping AI, analytics, healthcare, and systems-led product work with clear thinking, refined craft, and buildable prototypes.",
    image: defaultImage,
  },
  {
    path: "/about",
    file: "about/index.html",
    title: "About Kousik Dutta - Product Design, Systems Thinking, AI Prototyping",
    description:
      "Learn how Kousik Dutta frames product problems, designs calm systems, and uses AI-assisted code to make product direction testable.",
    image: defaultImage,
  },
  {
    path: "/case-study/thoughtspot",
    file: "case-study/thoughtspot/index.html",
    title: "ThoughtSpot Mobile Case Study - Kousik Dutta",
    description:
      "A product design case study on mobile analytics, AI input states, KPI watchlists, and decision-making workflows that helped ThoughtSpot mobile grow.",
    image: defaultImage,
  },
  {
    path: "/case-study/philips",
    file: "case-study/philips/index.html",
    title: "Philips Cardiocare Case Study - Kousik Dutta",
    description:
      "A healthcare product design case study on preventive heart care, research synthesis, service systems, and action-oriented patient support.",
    image: defaultImage,
  },
  {
    path: "/case-study/precisely-devportal",
    file: "case-study/precisely-devportal/index.html",
    title: "Precisely Developer Portal Case Study - Kousik Dutta",
    description:
      "A product design case study draft on developer experience, API discovery, interactive demos, and map-first workflows for Precisely.",
    image: `${siteUrl}/assets/images/precisely-devportal/api-catalog.png`,
  },
  {
    path: "/case-study/portfolio",
    file: "case-study/portfolio/index.html",
    title: "Portfolio Website Case Study - Kousik Dutta",
    description:
      "A product design case study on designing and building Kousik Dutta's portfolio as a clear, evidence-led, AI-assisted product experience.",
    image: `${siteUrl}/assets/images/portfolio-case-study/card-placeholder.svg`,
  },
]

async function readJournalRoutes() {
  const order = (await readFile(new URL("../src/data/journal/index.ts", import.meta.url), "utf8"))
    .match(/from "\.\/articles\/([^"]+)"/gu)
    .map((line) => line.replace(/.*articles\/|"/gu, ""))

  const available = new Set((await readdir(articlesDir)).map((name) => name.replace(/\.ts$/u, "")))
  const journal = []

  for (const name of order) {
    if (!available.has(name)) continue

    const source = await readFile(new URL(`${name}.ts`, articlesDir), "utf8")
    const id = source.match(/\n {2}id: "([^"]+)"/u)?.[1]
    const title = source.match(/\n {2}title: "([^"]+)"/u)?.[1]
    const excerpt = source
      .match(/\n {2}excerpt:\s*\n?\s*"((?:[^"\\]|\\.)*)"/u)?.[1]
      ?.replace(/\\"/gu, "&quot;")

    if (!id || !title || !excerpt) {
      throw new Error(`Could not read journal metadata from ${name}.ts`)
    }

    const readTime = source.match(/\n {2}readTime: "(\d+)[^"]*"/u)?.[1]
    const tags = (source.match(/\n {2}tags: \[([^\]]*)\]/u)?.[1] ?? "")
      .split(",")
      .map((tag) => tag.trim().replace(/^"|"$/gu, ""))
      .filter(Boolean)

    journal.push({
      path: `/journal/${id}`,
      file: `journal/${id}/index.html`,
      title: `${title} - Journal - Kousik Dutta`,
      description: excerpt,
      image: defaultImage,
      priority: "0.6",
      article: { id, title, excerpt, readTime, tags },
    })
  }

  return journal
}

const journalRoutes = await readJournalRoutes()

const perPage = Number(
  (await readFile(new URL("../src/data/journal/index.ts", import.meta.url), "utf8")).match(
    /PER_PAGE\s*=\s*(\d+)/u,
  )?.[1] ?? 5,
)

const journalPageCount = Math.max(1, Math.ceil(journalRoutes.length / perPage))

const journalIndexDescription =
  "Long-form, referenced writing on generative interfaces, AI trust and provenance, design engineering, performance, motion, and accessibility as a design method."

const journalPageRoutes = []
for (let page = 2; page <= journalPageCount; page += 1) {
  journalPageRoutes.push({
    path: `/journal/page/${page}`,
    file: `journal/page/${page}/index.html`,
    title: `Journal, page ${page} - Kousik Dutta`,
    description: journalIndexDescription,
    image: defaultImage,
    priority: "0.5",
  })
}

routes.push(
  {
    path: "/journal",
    file: "journal/index.html",
    title: "Journal - Kousik Dutta on AI interfaces, design engineering, and craft",
    description: journalIndexDescription,
    image: defaultImage,
    priority: "0.7",
  },
  ...journalPageRoutes,
  ...journalRoutes,
)

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function replaceTag(html, selector, content) {
  return html.replace(new RegExp(`(${escapeRegExp(selector)} content=")[^"]*(")`, "u"), `$1${content}$2`)
}

function xmlEscape(value) {
  return value
    .replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+);)/gu, "&amp;")
    .replace(/</gu, "&lt;")
    .replace(/>/gu, "&gt;")
}

/**
 * BlogPosting schema for a journal article.
 *
 * There is deliberately no datePublished. The articles carry no publication
 * date anywhere on the site, and the only date available is the commit that
 * added the file, which would tell search engines that twenty five long-form
 * pieces were published within the same hour. An absent date is more honest
 * and less damaging than a misleading one. readTime is real, so it ships as
 * timeRequired instead.
 */
function articleJsonLd(route) {
  const { title, excerpt, readTime, tags } = route.article
  const url = `${siteUrl}${route.path}`

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: excerpt.replace(/&quot;/gu, '"'),
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: route.image,
    author: {
      "@type": "Person",
      name: "Kousik Dutta",
      url: `${siteUrl}/`,
      jobTitle: "Senior Product Designer",
    },
    publisher: { "@type": "Person", name: "Kousik Dutta", url: `${siteUrl}/` },
    isPartOf: { "@type": "Blog", name: "Journal", url: `${siteUrl}/journal` },
    inLanguage: "en",
  }

  if (readTime) schema.timeRequired = `PT${readTime}M`
  if (tags.length > 0) {
    schema.keywords = tags.join(", ")
    schema.articleSection = tags[0]
  }

  return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
}

function applyMetadata(html, route) {
  const url = `${siteUrl}${route.path}`

  return [
    (value) => value.replace(/<title>.*?<\/title>/u, `<title>${route.title}</title>`),
    (value) => value.replace(/(<link rel="canonical" href=")[^"]*(" \/>)/u, `$1${url}$2`),
    (value) => replaceTag(value, '<meta name="description"', route.description),
    (value) => replaceTag(value, '<meta property="og:title"', route.title),
    (value) => replaceTag(value, '<meta property="og:description"', route.description),
    (value) => replaceTag(value, '<meta property="og:url"', url),
    (value) => replaceTag(value, '<meta property="og:image"', route.image),
    (value) => replaceTag(value, '<meta name="twitter:title"', route.title),
    (value) => replaceTag(value, '<meta name="twitter:description"', route.description),
    (value) => replaceTag(value, '<meta name="twitter:image"', route.image),
    (value) =>
      route.article ? value.replace("</head>", `  ${articleJsonLd(route)}\n  </head>`) : value,
    (value) =>
      value.replace(
        "</head>",
        `  <link rel="alternate" type="application/rss+xml" title="Kousik Dutta - Journal" href="${siteUrl}/rss.xml" />\n  </head>`,
      ),
  ].reduce((value, transform) => transform(value), html)
}

const source = await readFile(new URL("index.html", dist), "utf8")

for (const route of routes) {
  const outputPath = new URL(route.file, dist)
  await mkdir(dirname(outputPath.pathname), { recursive: true })
  await writeFile(outputPath, applyMetadata(source, route))
}

const lastmod = new Date().toISOString().slice(0, 10)
const priorities = {
  "/": "1.0",
  "/about": "0.8",
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) =>
    [
      "  <url>",
      `    <loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      "    <changefreq>monthly</changefreq>",
      `    <priority>${route.priority ?? priorities[route.path] ?? "0.9"}</priority>`,
      "  </url>",
    ].join("\n"),
  ),
  "</urlset>",
  "",
].join("\n")

await writeFile(new URL("sitemap.xml", dist), sitemap)

/**
 * RSS 2.0 feed for the journal.
 *
 * Items carry no pubDate for the same reason the pages carry no
 * datePublished. Readers fall back to feed order, which is the curated
 * journal order rather than an arbitrary one.
 */
const rss = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
  "  <channel>",
  "    <title>Kousik Dutta - Journal</title>",
  `    <link>${siteUrl}/journal</link>`,
  `    <description>${xmlEscape(journalIndexDescription)}</description>`,
  "    <language>en</language>",
  `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  `    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />`,
  ...journalRoutes.map((route) =>
    [
      "    <item>",
      `      <title>${xmlEscape(route.article.title)}</title>`,
      `      <link>${siteUrl}${route.path}</link>`,
      `      <guid isPermaLink="true">${siteUrl}${route.path}</guid>`,
      `      <description>${xmlEscape(route.article.excerpt.replace(/&quot;/gu, '"'))}</description>`,
      ...route.article.tags.map((tag) => `      <category>${xmlEscape(tag)}</category>`),
      "    </item>",
    ].join("\n"),
  ),
  "  </channel>",
  "</rss>",
  "",
].join("\n")

await writeFile(new URL("rss.xml", dist), rss)

await writeFile(new URL("404.html", dist), source)
