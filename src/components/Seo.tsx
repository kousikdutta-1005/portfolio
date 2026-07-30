import { useEffect } from "react"

const SITE_URL = "https://kousikdutta.com"
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/1GW8AENYNU5gayo8utt1YsKnfY.jpg`

type SeoProps = {
  title: string
  description: string
  path?: string
  image?: string
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)

  if (!element) {
    element = document.createElement("meta")
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.content = content
}

export function Seo({ title, description, path = "/", image = DEFAULT_IMAGE }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?? document.head.appendChild(document.createElement("link"))

    canonical.rel = "canonical"
    canonical.href = url

    document.title = title
    setMeta("name", "description", description)
    setMeta("property", "og:title", title)
    setMeta("property", "og:description", description)
    setMeta("property", "og:url", url)
    setMeta("property", "og:image", image)
    setMeta("name", "twitter:title", title)
    setMeta("name", "twitter:description", description)
    setMeta("name", "twitter:image", image)
  }, [description, image, path, title])

  return null
}
