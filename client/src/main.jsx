import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth0WithNavigate from './auth/Auth0WithNavigate'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import "semantic-ui-css/semantic.min.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <Auth0WithNavigate>
        <App />
      </Auth0WithNavigate>
    </BrowserRouter>

)
