import { useEffect, useState } from "react"
import { ThemeContext, type Theme } from "./theme-context"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system"
    return (localStorage.getItem("theme") as Theme) || "system"
  })

  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const root = document.documentElement

    const resolve = () => {
      if (theme === "system") {
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        setResolvedTheme(systemDark ? "dark" : "light")
        root.classList.toggle("dark", systemDark)
      } else {
        setResolvedTheme(theme)
        root.classList.toggle("dark", theme === "dark")
      }
    }

    resolve()
    localStorage.setItem("theme", theme)

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    mq.addEventListener("change", resolve)
    return () => mq.removeEventListener("change", resolve)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
