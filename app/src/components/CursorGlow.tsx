import { useEffect, useRef } from "react"

export function CursorGlow() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const html = document.documentElement
    const cursor = cursorRef.current
    const label = labelRef.current
    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2

    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    if (!cursor || !label || !pointerQuery.matches || motionQuery.matches) {
      return
    }

    const isTextInput = (element: HTMLElement) =>
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element.isContentEditable

    const getDefaultLabel = (element: HTMLElement) => {
      if (element instanceof HTMLButtonElement) return element.getAttribute("aria-label") || "Select"
      if (element instanceof HTMLAnchorElement) return element.target === "_blank" ? "Open" : "Go"
      if (element.getAttribute("role") === "button") return "Select"
      return ""
    }

    const updateTarget = (target: EventTarget | null) => {
      const element = target instanceof Element
        ? target.closest<HTMLElement>("[data-cursor], a, button, [role='button']")
        : null
      const textInput = target instanceof Element
        ? target.closest<HTMLElement>("input, textarea, [contenteditable='true']")
        : null

      if (textInput && isTextInput(textInput)) {
        cursor.dataset.state = "text"
        label.dataset.label = ""
        return
      }

      const nextLabel = element?.dataset.cursor === "none"
        ? ""
        : element?.dataset.cursor || (element ? getDefaultLabel(element) : "")

      label.dataset.label = nextLabel
      cursor.dataset.state = nextLabel ? "action" : "default"
    }

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY

      if (raf) return
      raf = requestAnimationFrame(() => {
        html.style.setProperty("--cursor-x", `${x}px`)
        html.style.setProperty("--cursor-y", `${y}px`)
        html.style.setProperty("--cursor-opacity", "1")
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
        raf = 0
      })
    }

    const onPointerOver = (event: PointerEvent) => updateTarget(event.target)
    const onPointerDown = () => cursor.dataset.pressed = "true"
    const onPointerUp = () => cursor.dataset.pressed = "false"

    const onLeave = () => {
      html.style.setProperty("--cursor-opacity", "0")
      cursor.dataset.state = "hidden"
    }

    const onEnter = () => {
      cursor.dataset.state = "default"
      html.style.setProperty("--cursor-opacity", "1")
    }

    html.classList.add("has-custom-cursor")
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerover", onPointerOver, { passive: true })
    window.addEventListener("pointerdown", onPointerDown, { passive: true })
    window.addEventListener("pointerup", onPointerUp, { passive: true })
    window.addEventListener("pointerleave", onLeave)
    window.addEventListener("pointerenter", onEnter)

    return () => {
      html.classList.remove("has-custom-cursor")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerover", onPointerOver)
      window.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointerup", onPointerUp)
      window.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("pointerenter", onEnter)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <div ref={cursorRef} className="custom-cursor" data-state="hidden" data-pressed="false" aria-hidden="true">
        <span className="custom-cursor-ring" />
        <span className="custom-cursor-dot" />
        <span ref={labelRef} className="custom-cursor-label" aria-hidden="true" />
      </div>
    </>
  )
}
