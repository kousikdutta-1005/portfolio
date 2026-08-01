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
  const [featured, ...rest] = JOURNAL_ARTICLES

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
            <motion.div custom={0} variants={fadeUp} className="max-w-2xl">
              <h1 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-semibold tracking-tight text-ink">
                Notes on Craft.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-ink/60 font-medium max-w-xl">
                Essays on design engineering, AI interfaces, and the business ROI of aesthetic perfection.
              </p>
            </motion.div>

            {/* Featured Article */}
            <motion.div custom={1} variants={fadeUp}>
              <Link 
                to={`/journal/${featured.id}`}
                className="group block relative overflow-hidden rounded-[2rem] bg-surface/50 border border-ink/5 frost hover:bg-surface/80 transition-colors duration-500 p-8 md:p-12"
                data-cursor="Read"
              >
                <div className="relative z-10 max-w-3xl">
                  <div className="flex items-center gap-3 text-sm font-medium text-ink/60 mb-6">
                    <span>{featured.date}</span>
                    <span className="w-1 h-1 rounded-full bg-ink/20" />
                    <span>{featured.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-ink mb-6 group-hover:text-accent transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-ink/70 leading-relaxed font-serif">
                    {featured.excerpt}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {featured.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-medium bg-ink/5 text-ink/70 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Grid Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {rest.map((article, index) => (
                <motion.div key={article.id} custom={index + 2} variants={fadeUp}>
                  <Link
                    to={`/journal/${article.id}`}
                    className="group flex flex-col h-full rounded-[1.5rem] p-8 hover:bg-surface/50 transition-colors duration-300"
                    data-cursor="Read"
                  >
                    <div className="flex items-center gap-3 text-sm font-medium text-ink/50 mb-4">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/20" />
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight text-ink mb-4 group-hover:text-accent transition-colors duration-300">
                      {article.title}
                    </h3>
                    <p className="text-ink/60 leading-relaxed flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-xs font-medium bg-ink/5 text-ink/60 rounded-full">
                          {tag}
                        </span>
                      ))}
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
