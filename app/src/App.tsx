import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignSystem from "./pages/DesignSystem"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/" element={<DesignSystem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
