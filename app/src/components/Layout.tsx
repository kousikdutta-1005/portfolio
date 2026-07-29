import { useLocation, useOutlet } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { CursorGlow } from "./CursorGlow"
import { ScrollProgress } from "./ScrollProgress"
import { AmbientOrbs } from "./AmbientOrbs"
import { cn } from "@/lib/utils"

function RouteLoadingState({ routeKey }: { routeKey: string }) {
  const [visible, setVisible] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setVisible(true)
    const timeout = window.setTimeout(() => setVisible(false), 620)
    return () => window.clearTimeout(timeout)
  }, [routeKey])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="route-loading-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          aria-hidden="true"
        >
          <motion.div
            className="route-loading-fill"
            initial={{ scaleX: 0, opacity: 0.75 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.54, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const routeAccentClass =
    location.pathname === "/case-study/precisely-devportal"
      ? "route-accent-precisely"
      : location.pathname === "/case-study/thoughtspot"
        ? "route-accent-thoughtspot"
        : location.pathname === "/case-study/philips"
          ? "route-accent-philips"
          : undefined

  useEffect(() => {
    const routeRootClasses = [
      "route-accent-precisely-root",
      "route-accent-thoughtspot-root",
      "route-accent-philips-root",
    ]
    const rootClass = routeAccentClass ? `${routeAccentClass}-root` : undefined
    document.documentElement.classList.remove(...routeRootClasses)
    if (rootClass) document.documentElement.classList.add(rootClass)

    return () => {
      document.documentElement.classList.remove(...routeRootClasses)
    }
  }, [routeAccentClass])

  return (
    <div className={cn("min-h-screen flex flex-col relative", routeAccentClass)} style={{ overflowX: "clip" }}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <ScrollProgress />
      <AmbientOrbs />
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="flex-1 relative" tabIndex={-1}>
        <RouteLoadingState routeKey={location.pathname} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className="page-route-shell"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
