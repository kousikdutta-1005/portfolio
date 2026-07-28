import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { useTheme } from "./ThemeProvider"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { MouseEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const homeClickRef = useRef({ count: 0, lastClick: 0 })
  const isDark = resolvedTheme === "dark"
  const nextThemeLabel = isDark ? "Switch to light mode" : "Switch to dark mode"

  const links = [
    { to: "/", label: "Work" },
    { to: "/about", label: "About" },
  ]

  const isActiveLink = (to: string) =>
    to === "/"
      ? location.pathname === "/" || location.pathname.startsWith("/case-study")
      : location.pathname === to

  const isCurrentPage = (to: string) => location.pathname === to

  const openDesignSystem = useCallback(() => {
    homeClickRef.current = { count: 0, lastClick: 0 }
    setMobileOpen(false)
    navigate("/design-system")
  }, [navigate])

  const handleHomeAccessClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const now = Date.now()
    const isContinuous = now - homeClickRef.current.lastClick < 1200
    const nextCount = isContinuous ? homeClickRef.current.count + 1 : 1

    homeClickRef.current = { count: nextCount, lastClick: now }

    if (nextCount >= 6) {
      event.preventDefault()
      openDesignSystem()
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        openDesignSystem()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [openDesignSystem])

  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass" aria-label="Primary">
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-11">
          <Link
            to="/"
            aria-label="Kousik Dutta home"
            className="brand-signature"
            data-cursor="Home"
            onClick={handleHomeAccessClick}
          >
            <span className="brand-signature-mark">
              <span className="brand-signature-image">
                <img
                  src={assetPath("/assets/images/Mc2cHPK2FkFfFmWhv4umGYjMuw.png")}
                  alt=""
                  className="h-5 w-auto dark:hidden"
                />
                <img
                  src={assetPath("/assets/images/QOXQB7tAox2fGvQW3EkxuXzBGLg.png")}
                  alt=""
                  className="h-5 w-auto hidden dark:block"
                />
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={link.to === "/" ? handleHomeAccessClick : undefined}
                data-cursor="none"
                className={cn(
                  "nav-link-interactive",
                  isActiveLink(link.to) && "is-active"
                )}
                aria-current={isCurrentPage(link.to) ? "page" : undefined}
              >
                <span className="nav-link-label">{link.label}</span>
              </Link>
            ))}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="icon-button-interactive"
              aria-label={nextThemeLabel}
              aria-pressed={isDark}
              data-cursor={isDark ? "Light" : "Dark"}
            >
              {isDark ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="icon-button-interactive"
              aria-label={nextThemeLabel}
              aria-pressed={isDark}
              data-cursor={isDark ? "Light" : "Dark"}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="icon-button-interactive"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              data-cursor={mobileOpen ? "Close" : "Menu"}
            >
              {mobileOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="mobile-nav-panel md:hidden"
          >
            <div className="max-w-[980px] mx-auto px-6 py-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(event) => {
                    if (link.to === "/") {
                      handleHomeAccessClick(event)
                    }

                    if (event.defaultPrevented) {
                      return
                    }

                    setMobileOpen(false)
                  }}
                  data-cursor="none"
                  className={cn(
                    "mobile-nav-link-interactive",
                    isActiveLink(link.to) && "is-active"
                  )}
                  aria-current={isCurrentPage(link.to) ? "page" : undefined}
                >
                  <span className="nav-link-label">{link.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
