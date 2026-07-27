import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import HomePage from "./pages/Home"
import AboutPage from "./pages/About"
import DesignSystem from "./pages/DesignSystem"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/design-system" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
