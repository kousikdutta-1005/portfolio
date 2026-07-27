import { useEffect, useRef, useCallback } from "react"

interface PerspectiveGridProps {
  className?: string
  gridSize?: number
}

/**
 * Interactive 3D perspective grid with cursor-proximity lighting.
 * Tiles near the cursor glow — creating an ambient, reactive background.
 */
export function PerspectiveGrid({ className = "", gridSize = 30 }: PerspectiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const tilesRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  const handlePointer = useCallback((e: PointerEvent) => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) { rafRef.current = 0; return }

      const rect = container.getBoundingClientRect()
      // Set CSS vars for the radial cursor highlight
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      container.style.setProperty("--glow-x", `${x}%`)
      container.style.setProperty("--glow-y", `${y}%`)
      container.style.setProperty("--glow-opacity", "1")
      rafRef.current = 0
    })
  }, [])

  const handleLeave = useCallback(() => {
    containerRef.current?.style.setProperty("--glow-opacity", "0")
  }, [])

  useEffect(() => {
    const container = containerRef.current
    const tilesEl = tilesRef.current
    if (!container || !tilesEl) return

    // Render tiles via DOM for performance (avoid 900 React elements)
    const fragment = document.createDocumentFragment()
    const total = gridSize * gridSize
    for (let i = 0; i < total; i++) {
      const tile = document.createElement("div")
      tile.className = "pg-tile"
      fragment.appendChild(tile)
    }
    tilesEl.appendChild(fragment)

    // Pointer events
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (mq.matches) {
      container.addEventListener("pointermove", handlePointer, { passive: true })
      container.addEventListener("pointerleave", handleLeave)
    }

    return () => {
      container.removeEventListener("pointermove", handlePointer)
      container.removeEventListener("pointerleave", handleLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      tilesEl.innerHTML = ""
    }
  }, [gridSize, handlePointer, handleLeave])

  return (
    <div
      ref={containerRef}
      className={`pg-container ${className}`}
      aria-hidden="true"
    >
      <div
        ref={tilesRef}
        className="pg-grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      />
      {/* Cursor-following radial glow */}
      <div className="pg-cursor-glow" />
      {/* Edge fade — blends grid into page background */}
      <div className="pg-fade" />
    </div>
  )
}
