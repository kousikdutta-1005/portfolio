import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { assetPath } from "@/lib/assets"
import { useTheme } from "./ThemeProvider"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const location = useLocation()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { to: "/", label: "Work" },
    { to: "/about", label: "About" },
    { to: "/design-system", label: "Design System" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass">
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-11">
          {/* Logo — adapts to theme */}
          <Link to="/" className="flex items-center">
            <img
              src={assetPath("/assets/images/Mc2cHPK2FkFfFmWhv4umGYjMuw.png")}
              alt="Kousik Dutta"
              className="h-5 w-auto dark:hidden"
            />
            <img
              src={assetPath("/assets/images/QOXQB7tAox2fGvQW3EkxuXzBGLg.png")}
              alt="Kousik Dutta"
              className="h-5 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop nav — Apple's 12px nav links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-[12px] font-normal transition-opacity duration-200 relative py-1",
                  location.pathname === link.to
                    ? "text-foreground opacity-100"
                    : "text-foreground/80 opacity-60 hover:opacity-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-1 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1 opacity-80 hover:opacity-100 transition-opacity"
              aria-label="Menu"
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden nav-glass overflow-hidden"
          >
            <div className="max-w-[980px] mx-auto px-6 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block text-[15px] py-2 transition-opacity",
                    location.pathname === link.to
                      ? "text-foreground font-medium"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
