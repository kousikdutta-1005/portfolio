import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Seo } from "@/components/Seo"
import { GlobalParticleEngine } from "@/components/GlobalParticleEngine"
import { JOURNAL_ARTICLES } from "@/data/journal"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const
const STAGGER = 0.08

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_ENTER, delay: i * STAGGER },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
}

export default function Journal() {
  return (
    <>
      <Seo 
        title="Journal | Kousik Dutta" 
        description="Thoughts on design engineering, AI interfaces, and the business of craft."
      />
      <GlobalParticleEngine />
      
      <main className="relative z-10 pt-[120px] pb-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-16"
          >
            <motion.div custom={0} variants={fadeUp} className="max-w-2xl mb-12">
              <h1 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-semibold tracking-tight text-ink">
                Notes on Craft.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-ink/60 font-medium max-w-xl">
                Essays on design engineering, AI interfaces, and the business ROI of aesthetic perfection.
              </p>
            </motion.div>

            {/* Strict Editorial List */}
            <div className="flex flex-col">
              {JOURNAL_ARTICLES.map((article, index) => (
                <motion.div key={article.id} custom={index + 1} variants={fadeUp}>
                  <Link
                    to={`/journal/${article.id}`}
                    className="group flex flex-col md:flex-row gap-4 md:gap-12 py-10 border-t border-ink/10 hover:bg-surface/50 transition-colors duration-500 rounded-2xl md:rounded-none md:hover:bg-transparent -mx-6 px-6 md:mx-0 md:px-0"
                    data-cursor="Read"
                  >
                    <div className="w-full md:w-48 shrink-0 flex md:flex-col justify-between md:justify-start items-center md:items-start text-sm font-medium text-ink/40 mt-1">
                      <span>{article.date}</span>
                      <span className="md:mt-2 text-ink/30">{article.readTime}</span>
                    </div>
                    
                    <div className="flex-1 max-w-3xl">
                      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-ink group-hover:text-accent transition-colors duration-300">
                        {article.title}
                      </h2>
                      <p className="mt-4 text-lg text-ink/70 leading-relaxed font-serif">
                        {article.excerpt}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {article.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold bg-ink/5 text-ink/60 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </main>
    </>
  )
}
