import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import Lenis from "lenis"

export function SmoothScroll() {
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
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
      lenisRef.current?.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    resetToTop()
    const rafId = requestAnimationFrame(resetToTop)

    return () => cancelAnimationFrame(rafId)
  }, [pathname])

  return null
}
