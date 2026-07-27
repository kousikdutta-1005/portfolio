import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import { Layout } from "./components/Layout"
import { SmoothScroll } from "./components/SmoothScroll"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import DesignSystem from "./pages/DesignSystem"

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
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
