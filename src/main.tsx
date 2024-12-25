import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BugetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BugetProvider>
      <App />
    </BugetProvider>  
  </StrictMode>,
)
