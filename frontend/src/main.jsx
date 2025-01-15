import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/homepage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login.jsx'
import UserRegistration from './components/UserRegistration.jsx'
import Users from './components/Users.jsx'
// import Logout from './components/Logout.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
  {
    path:'/homepage',
    element:<HomePage/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/user_registration',
    element:<UserRegistration />
  },
  {
    path:'/users',
    element:<Users/>
  },
  // {
  //   path: '/logout',
  //   element: <Logout/>
  // }  

])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
