import { Link, useLocation } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
import { Mail, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const EASE_ENVELOPE = [0.16, 1, 0.3, 1] as const
const EASE_ENVELOPE_CLOSE = [0.4, 0, 0.2, 1] as const

export function Footer() {
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()
  const isCurrentPage = (to: string) => location.pathname === to
  const cardVariants: Variants = prefersReducedMotion
    ? {
        closed: { y: 28, scale: 1 },
        open: { y: 28, scale: 1 },
      }
    : {
        closed: {
          y: 420,
          scale: 0.96,
          transition: { duration: 0.6, ease: EASE_ENVELOPE_CLOSE },
        },
        open: {
          y: 28,
          scale: 1,
          transition: { duration: 1.2, ease: EASE_ENVELOPE, delay: 0.1 },
        },
      }

  return (
    <footer className="py-14 md:py-18">
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <motion.div
          className="envelope-scene"
          initial={prefersReducedMotion ? "open" : "closed"}
          whileInView="open"
          viewport={{ amount: 0.3 }}
        >
          <div className="envelope-back-flap" aria-hidden="true" />

          <motion.div className="envelope-card" variants={cardVariants}>
            <div className="footer-note">
              <div className="footer-note-main">
                <p className="footer-note-kicker">A note from Kousik</p>
                <h2 className="footer-note-title">
                  If the problem is <span className="heading-italic">messy</span>, I want to hear it.
                </h2>
              </div>
              <div className="footer-note-body">
                <p>
                  I am looking for senior product design work where clear thinking, precise craft, and AI-assisted building can move the product forward.
                </p>
                <div className="footer-note-actions">
                  <a
                    href="mailto:design.kousik@gmail.com"
                    className="footer-note-action icon-only"
                    aria-label="Email"
                    title="Email"
                    data-cursor="none"
                  >
                    <Mail className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href="https://calendly.com/design-kousik/intro-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-note-action icon-only"
                    aria-label="Schedule a call"
                    title="Schedule a call"
                    data-cursor="none"
                  >
                    <Calendar className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kousikdutta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-note-action icon-only"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    data-cursor="none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-note-meta">
              <nav className="flex flex-wrap items-center gap-3.5" aria-label="Footer">
                <Link
                  to="/"
                  className={cn("text-link footer-link", isCurrentPage("/") && "is-active")}
                  aria-current={isCurrentPage("/") ? "page" : undefined}
                  data-cursor="none"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={cn("text-link footer-link", isCurrentPage("/about") && "is-active")}
                  aria-current={isCurrentPage("/about") ? "page" : undefined}
                  data-cursor="none"
                >
                  About
                </Link>
              </nav>
              <span>© {new Date().getFullYear()} Kousik Dutta</span>
            </div>
          </motion.div>

          <div className="envelope-liner" aria-hidden="true" />
          <div className="envelope-pocket-wrap" aria-hidden="true">
            <div className="envelope-pocket" />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
