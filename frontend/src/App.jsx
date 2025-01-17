import React from 'react'
import Login from './components/Login'
import HomePage from './pages/homepage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserRegistration from './components/UserRegistration.jsx'
import Users from './components/Users.jsx'
import Logout from './components/Logout.jsx'
import Departments from './components/Departments.jsx'
// import SideNavbar from './components/SideNavbar.jsx'

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
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/departments',
    element: <Departments />
  }  

])
const App = () => {
  return (
    <div>
      {/* <SideNavbar/> */}
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
