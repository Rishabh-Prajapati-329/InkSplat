import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CanvasProvider } from './context/CanvasContext';


createRoot(document.getElementById('root')).render(
  <CanvasProvider>
    <App />
  </CanvasProvider>,
)
