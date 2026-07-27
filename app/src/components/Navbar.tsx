import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useTheme } from "./ThemeProvider"
import { Sun, Moon, List } from "@phosphor-icons/react"
import { useState } from "react"

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/Mc2cHPK2FkFfFmWhv4umGYjMuw.png"
              alt="Kousik Dutta"
              className="h-6 w-auto opacity-90"
            />
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-[12px] font-medium transition-colors relative",
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] bg-accent rounded-full" />
                )}
              </Link>
            ))}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun weight="bold" className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Moon weight="bold" className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun weight="bold" className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Moon weight="bold" className="w-4 h-4 text-muted-foreground" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              <List weight="bold" className="w-4 h-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/50 px-6 py-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block text-[14px] py-1.5 transition-colors",
                location.pathname === link.to
                  ? "text-accent font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
