import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserState from './Context/User/UserState'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserState>
          <RouterProvider router={router}></RouterProvider>

    </UserState>
  </StrictMode>,
)
