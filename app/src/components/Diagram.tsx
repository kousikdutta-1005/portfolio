import { useEffect, useId, useRef, useState } from "react"
import { useTheme } from "./theme-context"

interface DiagramProps {
  chart: string
  caption?: string
}

let mermaidPromise: Promise<typeof import("mermaid").default> | null = null

function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import("mermaid").then((mod) => mod.default)
  }
  return mermaidPromise
}

export function Diagram({ chart, caption }: DiagramProps) {
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string>("")
  const [failed, setFailed] = useState(false)
  const rawId = useId()
  const idRef = useRef(`mmd-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`)

  useEffect(() => {
    let cancelled = false
    const isDark = resolvedTheme === "dark"

    loadMermaid()
      .then(async (mermaid) => {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          fontFamily:
            "'SF Pro Text', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          theme: "base",
          themeVariables: {
            background: "transparent",
            primaryColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.03)",
            primaryTextColor: isDark ? "#f5f5f7" : "#1d1d1f",
            primaryBorderColor: isDark
              ? "rgba(255,255,255,0.16)"
              : "rgba(0,0,0,0.12)",
            secondaryColor: isDark ? "rgba(41,151,255,0.14)" : "rgba(0,113,227,0.08)",
            tertiaryColor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            lineColor: isDark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.26)",
            textColor: isDark ? "#f5f5f7" : "#1d1d1f",
            fontSize: "14px",
            nodeBorder: isDark ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)",
            clusterBkg: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.015)",
            clusterBorder: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            edgeLabelBackground: isDark ? "#000000" : "#fbfbfd",
          },
          flowchart: { curve: "basis", padding: 18, useMaxWidth: true },
          sequence: { useMaxWidth: true },
        })

        const { svg: rendered } = await mermaid.render(idRef.current, chart)
        if (!cancelled) {
          setSvg(rendered)
          setFailed(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSvg("")
          setFailed(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [chart, resolvedTheme])

  return (
    <figure className="journal-diagram">
      {failed ? (
        <div className="journal-diagram-fallback">
          <pre>{chart}</pre>
        </div>
      ) : (
        <div className="journal-diagram-frame">
          {svg ? (
            <div
              className="journal-diagram-svg"
              // Mermaid output is generated locally from author-controlled source.
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="journal-diagram-skeleton" aria-hidden="true" />
          )}
        </div>
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
