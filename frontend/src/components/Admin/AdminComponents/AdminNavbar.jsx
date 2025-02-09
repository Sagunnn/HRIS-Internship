import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './logo.png'

const AdminNavbar = (prop) => {
  const navigate=useNavigate()
  const [sideNavbar,setSideNavbar] =useState(true)
    const toggleSideNavbar=()=>{
      setSideNavbar(!sideNavbar)
    }
    const handleLogout = ()=>{
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('role')
      window.location.reload()
    }
  return (
    <div className={prop? 'side_navbar active' : 'side_navbar'}>
          <img src={logo} alt="Logo" className='logo' />
          <ul>
            <li><Link to='/admin'>Home</Link></li>
            <li><Link to='/admin/users'>Users</Link></li>
            <li><Link to='/admin/user_registration'>User Registration</Link></li>
            <li><Link to="/admin/departments">Departments</Link></li>
            <li><Link to='/logout'>Logout</Link></li>
          </ul>
        </div>
  )
}

export default AdminNavbar
