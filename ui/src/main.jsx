import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalTheme } from './components/layout/GlobalTheme/GlobalTheme.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalTheme>
      <App />
    </GlobalTheme>
  </StrictMode>,
)
