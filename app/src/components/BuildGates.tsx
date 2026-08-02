import { motion } from "framer-motion"
import { BUILD_REPORT } from "@/data/build-report"

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

/**
 * Renders the quality gates from data the build generates about itself.
 *
 * Everything here comes from scripts/build-report.mjs, which reads the actual
 * build chain and the actual thresholds. If a gate is removed from the build,
 * it disappears from this page on the next deploy.
 */
export function BuildGates() {
  const { chain, gates, assets, generatedAt } = BUILD_REPORT

  return (
    <div className="build-gates">
      <motion.ol
        className="build-chain"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        aria-label="Build pipeline steps in order"
      >
        {chain.map((step) => (
          <motion.li
            key={step}
            variants={fadeUp}
            className="build-chain-step"
            data-gate={gates.some((g) => g.id === step) ? "true" : undefined}
          >
            <code>{step}</code>
          </motion.li>
        ))}
      </motion.ol>

      <motion.div
        className="build-gate-list"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {gates.map((gate) => (
          <motion.div key={gate.id} variants={fadeUp} className="build-gate">
            <div className="build-gate-head">
              <h4 className="build-gate-label">{gate.label}</h4>
              <span className="build-gate-metric">{gate.metric}</span>
            </div>
            <p className="build-gate-summary">{gate.summary}</p>
            <code className="build-gate-file">scripts/{gate.id}.mjs</code>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        className="build-gates-note"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Generated on {generatedAt} by the same build that produced this page, from{" "}
        {assets.imageCount} images totalling {assets.imageMb}MB. I used to describe these
        checks in prose here, and the prose drifted: it credited a linter that does not run
        in the build and omitted two gates added later. This list cannot drift, because a
        gate that is not wired up cannot appear in it.
      </motion.p>
    </div>
  )
}
