import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const backdropFilterFix = document.createElement('style')
backdropFilterFix.setAttribute('data-backdrop-filter-fix', 'true')
backdropFilterFix.textContent = `
  .nav-glass {
    backdrop-filter: blur(56px) saturate(210%) contrast(1.08) brightness(1.08) !important;
  }

  .dark .nav-glass {
    backdrop-filter: blur(60px) saturate(220%) contrast(1.12) brightness(1.06) !important;
  }

  .apple-card,
  .glass-card,
  .liquid-control,
  .envelope-card {
    backdrop-filter: blur(32px) saturate(190%) brightness(1.04) !important;
  }

  .dark .apple-card,
  .dark .glass-card,
  .dark .liquid-control,
  .dark .envelope-card {
    backdrop-filter: blur(34px) saturate(190%) brightness(1) !important;
  }

  .glass-panel {
    backdrop-filter: blur(24px) saturate(180%) !important;
  }

  .glass {
    backdrop-filter: saturate(180%) blur(20px) !important;
  }
`
document.head.appendChild(backdropFilterFix)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
