import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

export function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/images/Mc2cHPK2FkFfFmWhv4umGYjMuw.png"
              alt="Kousik Dutta"
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                "text-[13px] font-medium transition-colors relative pb-0.5",
                location.pathname === "/"
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Work
            </Link>
            <Link
              to="/about"
              className={cn(
                "text-[13px] font-medium transition-colors relative pb-0.5",
                location.pathname === "/about"
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              About
            </Link>
            <a
              href="https://drive.google.com/file/d/1L27SS5uGNk5nGmCkft9myUSf5woNHooB/view"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
