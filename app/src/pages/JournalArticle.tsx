import { motion } from "framer-motion"
import { Link, useParams, Navigate } from "react-router-dom"
import { Seo } from "@/components/Seo"
import { JOURNAL_ARTICLES, type ArticleBlock } from "@/data/journal"
import { ArrowLeft } from "lucide-react"

const EASE_ENTER = [0.25, 0.1, 0.25, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_ENTER, delay: i * 0.08 },
  }),
}

function renderBlock(block: ArticleBlock, idx: number) {
  switch (block.type) {
    case 'p':
      return <p key={idx} className="mb-6 text-[1.125rem] leading-[1.75] text-ink/80">{block.text}</p>
    case 'h2':
      return <h2 key={idx} className="text-2xl md:text-3xl font-semibold tracking-tight text-ink mt-12 mb-6">{block.text}</h2>
    case 'quote':
      return (
        <blockquote key={idx} className="my-10 pl-6 border-l-2 border-accent">
          <p className="text-xl md:text-2xl font-serif italic text-ink/90 leading-relaxed mb-4">"{block.text}"</p>
          {(block.author || block.source) && (
            <footer className="text-sm font-medium text-ink/60 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-ink/30" />
              <span>{block.author}</span>
              {block.source && <span className="opacity-60">— {block.source}</span>}
            </footer>
          )}
        </blockquote>
      )
    case 'ul':
      return (
        <ul key={idx} className="my-6 space-y-4">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-4 text-[1.125rem] leading-[1.75] text-ink/80">
              <span className="text-accent mt-1.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'code':
      return (
        <div key={idx} className="my-10 rounded-2xl overflow-hidden border border-ink/10 bg-[#0A0A0A] shadow-xl">
          {block.language && (
            <div className="px-4 py-2 border-b border-white/10 text-xs font-mono text-white/50 bg-[#111]">
              {block.language}
            </div>
          )}
          <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-blue-300">
            <code>{block.text}</code>
          </pre>
        </div>
      )
    case 'ascii':
      return (
        <div key={idx} className="my-12 py-8 rounded-2xl bg-ink/[0.02] border border-ink/5 overflow-x-auto">
          <pre className="px-8 text-[11px] md:text-xs font-mono leading-loose text-ink/70">
            <code>{block.text}</code>
          </pre>
        </div>
      )
    default:
      return null
  }
}

export default function JournalArticle() {
  const { id } = useParams()
  const article = JOURNAL_ARTICLES.find(a => a.id === id)

  if (!article) {
    return <Navigate to="/journal" replace />
  }

  return (
    <>
      <Seo 
        title={`${article.title} | Kousik Dutta Journal`}
        description={article.excerpt}
      />
      
      <main className="relative z-10 pt-[120px] pb-32">
        <article className="max-w-[720px] mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <motion.div custom={0} variants={fadeUp} className="mb-8">
              <Link 
                to="/journal" 
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/50 hover:text-ink transition-colors"
                data-cursor="none"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Journal</span>
              </Link>
            </motion.div>
            
            <motion.div custom={1} variants={fadeUp} className="flex items-center gap-3 text-sm font-medium text-ink/60 mb-6">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-ink/20" />
              <span>{article.readTime}</span>
            </motion.div>
            
            <motion.h1 custom={2} variants={fadeUp} className="text-[2.5rem] md:text-[4rem] leading-[1.1] font-semibold tracking-tight text-ink mb-8">
              {article.title}
            </motion.h1>
            
            <motion.div custom={3} variants={fadeUp} className="flex flex-wrap gap-2 pb-8 border-b border-ink/10">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-xs font-medium bg-ink/5 text-ink/60 rounded-full">
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
            className="prose prose-lg prose-ink dark:prose-invert max-w-none"
          >
            {article.content.map((block, idx) => renderBlock(block, idx))}
          </motion.div>
        </article>
      </main>
    </>
  )
}
