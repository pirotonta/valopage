import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="video-fondo opacity-40">
      <video autoPlay muted loop playsInline className='fixed top-1/2 left-1/2 min-w-screen min-h-screen w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover -z-10 pointer-events-none'>
        <source src="/videos/wallpaper.mp4" type="video/mp4" />
      </video>
    </div>
    <App />
  </StrictMode>,
)
