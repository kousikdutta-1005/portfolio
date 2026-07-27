import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { CursorGlow } from "./CursorGlow"
import { ScrollProgress } from "./ScrollProgress"

export function Layout() {
  const { pathname } = useLocation()
  const hideFooter = pathname === "/"

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden relative">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  )
}
