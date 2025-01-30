import React, { useState } from 'react'
import Login from './components/Login'
import HomePage from './pages/homepage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserRegistration from './components/UserRegistration.jsx'
import Users from './components/Users.jsx'
import Logout from './components/Logout.jsx'
import Departments from './components/Departments.jsx'
import SideNavbar from './components/SideNavbar.jsx'
import './main.css'
import { TbBurger } from "react-icons/tb";
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
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
    element:<ProtectedRoute><UserRegistration /></ProtectedRoute>
  },
  {
    path:'/users',
    element:<ProtectedRoute><Users/></ProtectedRoute>
  },
  {
    path: '/logout',
    element: <Logout/>
  },
  {
    path: '/departments',
    element: <ProtectedRoute>
      <Departments />
      </ProtectedRoute>
  } ,
  {path:'/admin',
  element:<ProtectedRoute>
    <AdminDashboard/>
  </ProtectedRoute>
}

])
const App = () => {
  const [sideNavbar,setSideNavbar] =useState(true)
  const toggleSideNavbar=()=>{
    setSideNavbar(!sideNavbar)
  }
  return (
    <div>
      {/* <header onClick={toggleSideNavbar}>
        <TbBurger size={35}/>
      </header>
      <SideNavbar prop={sideNavbar} /> */}
      <div className="main">
        <RouterProvider router={router}/>
      </div>
      
    </div>
  )
}

export default App
