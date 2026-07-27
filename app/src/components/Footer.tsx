import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="py-8">
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-muted-foreground">
          <p className="opacity-60">© {new Date().getFullYear()} Kousik Dutta</p>
          <nav className="flex items-center gap-6">
            <Link to="/" className="opacity-60 hover:opacity-100 transition-opacity">
              Home
            </Link>
            <Link to="/about" className="opacity-60 hover:opacity-100 transition-opacity">
              About
            </Link>
            <a
              href="https://www.linkedin.com/in/kousikdutta/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              LinkedIn
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
