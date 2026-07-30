import { BrowserRouter, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import { ThemeProvider } from "./components/ThemeProvider"
import { Layout } from "./components/Layout"
import { SmoothScroll } from "./components/SmoothScroll"

const HomePage = lazy(() => import("./pages/Home"))
const AboutPage = lazy(() => import("./pages/About"))
const ThoughtSpotPage = lazy(() => import("./pages/ThoughtSpot"))
const PhilipsPage = lazy(() => import("./pages/Philips"))
const PreciselyDevPortalPage = lazy(() => import("./pages/PreciselyDevPortal"))
const PortfolioCaseStudyPage = lazy(() => import("./pages/PortfolioCaseStudy"))

const routerBasename =
  import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL.replace(/\/$/, "")

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename={routerBasename}>
        <SmoothScroll />
        <Suspense fallback={null}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/case-study/thoughtspot" element={<ThoughtSpotPage />} />
              <Route path="/case-study/philips" element={<PhilipsPage />} />
              <Route path="/case-study/precisely-devportal" element={<PreciselyDevPortalPage />} />
              <Route path="/case-study/portfolio" element={<PortfolioCaseStudyPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
