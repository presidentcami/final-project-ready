import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App'
import Profile from './components/Profile'
import './index.css'
const DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN
const CLIENTID = import.meta.env.VITE_AUTH0_CLIENT_ID

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* <Route path='user-profile' element={<Profile />} /> */}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
    domain={DOMAIN}
    clientId={CLIENTID}
    authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      {/* <App /> */}
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>,
)
