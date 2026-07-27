import { useEffect, useRef, useState, useMemo } from "react"

interface PerspectiveGridProps {
  className?: string
  gridSize?: number
  fadeRadius?: number
}

/**
 * Interactive 3D grid that tiles light up on hover.
 * Inspired by Apple's spatial aesthetic — subtle, ambient, responsive.
 */
export function PerspectiveGrid({ className = "", gridSize = 32, fadeRadius = 75 }: PerspectiveGridProps) {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const tiles = useMemo(() => Array.from({ length: gridSize * gridSize }), [gridSize])

  return (
    <div
      ref={containerRef}
      className={`perspective-grid-wrapper ${className}`}
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
      aria-hidden="true"
    >
      <div
        className="perspective-grid-tiles"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {mounted && tiles.map((_, i) => (
          <div key={i} className="perspective-grid-tile" />
        ))}
      </div>
      <div
        className="perspective-grid-fade"
        style={{
          background: `radial-gradient(circle, transparent 25%, var(--grid-fade, #000) ${fadeRadius}%)`,
        }}
      />
    </div>
  )
}
