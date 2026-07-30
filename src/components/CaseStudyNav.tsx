import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export type CaseStudyNavSection = {
  id: string
  num: number
  label: string
}

type CaseStudyNavProps = {
  sections: CaseStudyNavSection[]
}

export function CaseStudyNav({ sections }: CaseStudyNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const stickyStateRef = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: 0 }
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    let frameId: number | null = null

    const updateStickyState = () => {
      const sentinel = sentinelRef.current
      if (!sentinel) return

      const dockTop = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--case-nav-dock-top")
      )
      const nextSticky = sentinel.getBoundingClientRect().top <= (Number.isFinite(dockTop) ? dockTop : 55)
      if (stickyStateRef.current !== nextSticky) {
        stickyStateRef.current = nextSticky
        setIsSticky(nextSticky)
      }
    }

    const scheduleStickyUpdate = () => {
      if (frameId !== null) return
      frameId = window.requestAnimationFrame(() => {
        frameId = null
        updateStickyState()
      })
    }

    updateStickyState()
    window.addEventListener("scroll", scheduleStickyUpdate, { passive: true })
    window.addEventListener("resize", scheduleStickyUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", scheduleStickyUpdate)
      window.removeEventListener("resize", scheduleStickyUpdate)

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    const anchorOffset = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--case-anchor-offset")
    )
    const offset = Number.isFinite(anchorOffset) ? anchorOffset : 118
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <>
      <div ref={sentinelRef} className="h-0" aria-hidden="true" />
      <nav
        className={cn("case-study-nav", isSticky && "case-study-nav-stuck")}
        aria-label="Case study sections"
      >
        <div className="case-study-nav-inner">
          {sections.map((section) => {
            const active = activeId === section.id
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => scrollTo(section.id)}
                className={cn("case-study-nav-item", active && "is-active")}
                aria-current={active ? "location" : undefined}
                data-cursor="none"
              >
                <span className="case-study-nav-index" aria-hidden="true">
                  {section.num}
                </span>
                <span>{section.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
