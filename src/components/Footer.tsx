import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-6 md:px-10">
        <motion.div
          className="envelope-scene"
          initial="closed"
          whileInView="open"
          viewport={{ amount: 0.3 }}
        >
          {/* Back flap */}
          <div className="envelope-back-flap" />

          {/* Card */}
          <motion.div
            className="envelope-card"
            variants={{
              closed: {
                y: 550,
                scale: 0.96,
                transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
              },
              open: {
                y: 38,
                scale: 1,
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
              },
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.02em] uppercase text-muted-foreground mb-2">
                  Get in touch
                </p>
                <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold tracking-[-0.03em] leading-[1.1]">
                  Let's build your<br />next big idea.
                </h2>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-[15px] leading-[1.6] text-muted-foreground">
                  Available for full-time roles, freelance projects, and design consulting.
                </p>
                <a
                  href="https://calendly.com/design-kousik/intro-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "default", size: "default" }), "mt-4 w-fit")}
                >
                  Schedule a call
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 text-[11px] text-muted-foreground/40">
              <Link to="/" className="hover:text-muted-foreground/70 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-muted-foreground/70 transition-colors">About</Link>
              <a href="https://www.linkedin.com/in/kousikdutta/" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground/70 transition-colors">LinkedIn</a>
              <span>© {new Date().getFullYear()} Kousik Dutta</span>
            </div>
          </motion.div>

          {/* Envelope pocket */}
          <div className="envelope-liner" />
          <div className="envelope-pocket-wrap">
            <div className="envelope-pocket" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
