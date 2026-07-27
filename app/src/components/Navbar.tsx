import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useTheme } from "./ThemeProvider"
import { Sun, Moon } from "lucide-react"

export function Navbar() {
  const location = useLocation()
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="max-w-[980px] mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/Mc2cHPK2FkFfFmWhv4umGYjMuw.png"
              alt="Kousik Dutta"
              className="h-6 w-auto opacity-90"
            />
          </Link>
          <div className="flex items-center gap-7">
            <Link
              to="/"
              className={cn(
                "text-[12px] font-normal transition-colors",
                location.pathname === "/"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Work
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-[12px] font-normal transition-colors",
                location.pathname === "/about"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              About
            </Link>
            <Link
              to="/design-system"
              className={cn(
                "text-[12px] font-normal transition-colors",
                location.pathname === "/design-system"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Design System
            </Link>
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-1.5 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
