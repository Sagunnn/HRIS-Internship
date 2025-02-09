import React, { useEffect, useState } from 'react'
import Login from './components/Login'
import HomePage from './pages/HomePage.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegistration from './components/UserRegistration.jsx'
import Users from './components/Users.jsx'
import Logout from './components/Logout.jsx'
import Departments from './components/Departments.jsx'
import SideNavbar from './components/SideNavbar.jsx'
import './main.css'
import { TbBurger } from "react-icons/tb";
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminDashboard from './components/Admin/AdminDashboard.jsx'
import EmployeeDashboard from './components/Employee/EmployeeDashboard.jsx'
import AdminNavbar from './components/Admin/AdminComponents/AdminNavbar.jsx'

const App = () => {
  const [sideNavbar,setSideNavbar] =useState(true)
  const toggleSideNavbar=()=>{
    setSideNavbar(!sideNavbar)
  }
  useEffect(()=>{
    setRole(localStorage.getItem('role'))
  },[])
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  return (
    <div>
      <Router>
      <header onClick={toggleSideNavbar}>
        <TbBurger size={35}/>
      </header>
      {/* <SideNavbar prop={sideNavbar} /> */}
      {role ? (
          role.toLowerCase() === "admin" ? (
            <AdminNavbar />
          ) : (
            <SideNavbar prop={sideNavbar} />
          )
        ) : null}
      <div className="main">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Protected Routes */}
        <Route
          path="/admin/user_registration"
          element={
            <ProtectedRoute>
              <UserRegistration />
            </ProtectedRoute>
          }
        />
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <EmployeeDashboard/>
            </ProtectedRoute>
          }
        />
        <Route path='/employee' element={<Users/>}/>
        <Route path='' element=''/>
        <Route path='' element=''/>
        <Route path='' element=''/>
      </Routes>
      </div>
    </Router>
      
      
      
    </div>
  )
}

export default App
