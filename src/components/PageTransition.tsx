import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
}

const EASE_ENTER: [number, number, number, number] = [0.16, 1, 0.3, 1]
const EASE_EXIT: [number, number, number, number] = [0.25, 0.1, 0.25, 1]

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 14,
    filter: "blur(8px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      ease: EASE_ENTER,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(6px)",
    transition: {
      duration: 0.26,
      ease: EASE_EXIT,
    },
  },
}

/**
 * Wraps page content with a smooth lift-into-focus animation.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      className="page-transition-content"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
