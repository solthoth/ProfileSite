import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CareerGraphSpike } from './redesign-spike/CareerGraphSpike.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {import.meta.env.DEV && new URLSearchParams(location.search).has('spike') ? (
      <div style={{ height: '100vh' }}>
        <CareerGraphSpike />
      </div>
    ) : (
      <App />
    )}
  </StrictMode>,
)
