import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import Lenis from "lenis"

export function SmoothScroll() {
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches
    if (reduceMotion || coarsePointer) return

    const lenis = new Lenis({
      duration: 0.78,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
    })
    lenisRef.current = lenis
    let rafId = 0

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      if (lenisRef.current === lenis) {
        lenisRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const resetToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true, force: true })
        return
      }

      window.scrollTo(0, 0)
    }

    resetToTop()
  }, [pathname])

  return null
}
