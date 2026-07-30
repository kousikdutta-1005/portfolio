import { useEffect, useRef } from "react"

/**
 * Thin accent-colored scroll progress bar at the very top of viewport.
 */
export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const scrollTop = window.scrollY
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`
        }
        raf = 0
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={progressRef}
      className="scroll-progress-bar"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  )
}
