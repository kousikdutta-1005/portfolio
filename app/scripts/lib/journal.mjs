/**
 * Journal article metadata, read straight from the article sources.
 *
 * Both postbuild (which writes the per-route meta tags) and the OG card
 * generator need the same list. Reading it in two places would let them drift,
 * so the parsing lives here once.
 */

import { readdir, readFile } from "node:fs/promises"

const articlesDir = new URL("../../src/data/journal/articles/", import.meta.url)
const indexFile = new URL("../../src/data/journal/index.ts", import.meta.url)

export async function readJournalArticles() {
  const order = (await readFile(indexFile, "utf8"))
    .match(/from "\.\/articles\/([^"]+)"/gu)
    .map((line) => line.replace(/.*articles\/|"/gu, ""))

  const available = new Set((await readdir(articlesDir)).map((name) => name.replace(/\.ts$/u, "")))
  const articles = []

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

    articles.push({ id, title, excerpt, readTime, tags })
  }

  return articles
}

export async function readPerPage() {
  return Number((await readFile(indexFile, "utf8")).match(/PER_PAGE\s*=\s*(\d+)/u)?.[1] ?? 5)
}
