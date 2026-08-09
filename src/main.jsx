import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import Star from './Star' 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Star />
  </StrictMode>,
)
