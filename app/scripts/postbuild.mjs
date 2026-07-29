import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

const dist = new URL("../dist/", import.meta.url)
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
]

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function replaceTag(html, selector, content) {
  return html.replace(new RegExp(`(${escapeRegExp(selector)} content=")[^"]*(")`, "u"), `$1${content}$2`)
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
  ].reduce((value, transform) => transform(value), html)
}

const source = await readFile(new URL("index.html", dist), "utf8")

for (const route of routes) {
  const outputPath = new URL(route.file, dist)
  await mkdir(dirname(outputPath.pathname), { recursive: true })
  await writeFile(outputPath, applyMetadata(source, route))
}

await writeFile(new URL("404.html", dist), source)
