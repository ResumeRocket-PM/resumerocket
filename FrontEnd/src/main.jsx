import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { AuthProvider } from './context/AuthProvider.jsx';
import { ImageProvider } from './context/ImageProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ImageProvider>
        <App />
      </ImageProvider>
    </AuthProvider>
  </React.StrictMode>,
)
