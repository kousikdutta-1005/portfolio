import { Link, useLocation } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"
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
                    className="footer-note-action"
                    aria-label="Send an email"
                    data-cursor="none"
                  >
                    Email
                  </a>
                  <a
                    href="https://calendly.com/design-kousik/intro-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-note-action"
                    aria-label="Schedule a call in a new tab"
                    data-cursor="none"
                  >
                    Schedule a call
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kousikdutta/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-note-action"
                    aria-label="Open LinkedIn profile in a new tab"
                    data-cursor="none"
                  >
                    LinkedIn
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
