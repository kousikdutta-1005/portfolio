export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/kousikdutta/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/kousikdutta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Behance
            </a>
          </div>
          <p className="text-[11px] text-muted-foreground">© 2025 Kousik Dutta</p>
        </div>
      </div>
    </footer>
  )
}
