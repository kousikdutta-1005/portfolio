import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { Layout } from "./components/Layout"
import { SmoothScroll } from "./components/SmoothScroll"
import { AnimatePresence, motion } from "framer-motion"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import DesignSystem from "./pages/DesignSystem"

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Routes location={location}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/design-system" element={<DesignSystem />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll />
        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
