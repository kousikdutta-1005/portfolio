import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { Layout } from "./components/Layout"
import { SmoothScroll } from "./components/SmoothScroll"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import DesignSystem from "./pages/DesignSystem"
import ThoughtSpotPage from "./pages/ThoughtSpot"
import PhilipsPage from "./pages/Philips"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/design-system" element={<DesignSystem />} />
            <Route path="/case-study/thoughtspot" element={<ThoughtSpotPage />} />
            <Route path="/case-study/philips" element={<PhilipsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
