import { useEffect } from "react"

/**
 * Tracks cursor position and sets CSS custom properties on <html>.
 * Creates a subtle radial glow that follows the pointer.
 */
export function CursorGlow() {
  useEffect(() => {
    const html = document.documentElement
    let raf = 0

    const onMove = (e: PointerEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        html.style.setProperty("--cursor-x", `${e.clientX}px`)
        html.style.setProperty("--cursor-y", `${e.clientY}px`)
        html.style.setProperty("--cursor-opacity", "1")
        raf = 0
      })
    }

    const onLeave = () => {
      html.style.setProperty("--cursor-opacity", "0")
    }

    // Only enable on non-touch devices
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (mq.matches) {
      window.addEventListener("pointermove", onMove, { passive: true })
      window.addEventListener("pointerleave", onLeave)
    }

    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      className="cursor-glow"
      aria-hidden="true"
    />
  )
}
