import { useEffect } from "react"

/**
 * Deterrents against casual copying: right click, image dragging, and the
 * one-keystroke save and view-source paths.
 *
 * These stop a casual visitor. They do not stop anyone who opens devtools, and
 * nothing on the web can stop a screenshot. Selection is disabled in CSS
 * rather than here; elements that opt back in carry data-allow-select.
 */

const INTERACTIVE = "input, textarea, select, [contenteditable], [data-allow-select]"

export function ContentProtection() {
  useEffect(() => {
    const isExempt = (target: EventTarget | null) =>
      target instanceof Element && target.closest(INTERACTIVE) !== null

    const onContextMenu = (event: MouseEvent) => {
      if (isExempt(event.target)) return
      event.preventDefault()
    }

    const onDragStart = (event: DragEvent) => {
      if (event.target instanceof Element && event.target.closest("img, video, picture, svg")) {
        event.preventDefault()
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) return
      if (isExempt(event.target)) return
      const key = event.key.toLowerCase()
      // Save page and view source. Deliberately not blocking the devtools
      // shortcuts: it cannot work, and it punishes the wrong people.
      if (key === "s" || key === "u") event.preventDefault()
    }

    document.addEventListener("contextmenu", onContextMenu)
    document.addEventListener("dragstart", onDragStart)
    document.addEventListener("keydown", onKeyDown)

    return () => {
      document.removeEventListener("contextmenu", onContextMenu)
      document.removeEventListener("dragstart", onDragStart)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return null
}
