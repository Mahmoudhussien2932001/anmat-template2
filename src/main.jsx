import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { SessionProvider } from './state/SessionProvider.jsx'
import { router } from './router.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './styles/light-folio.css'
import './styles/folio-layout.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)
