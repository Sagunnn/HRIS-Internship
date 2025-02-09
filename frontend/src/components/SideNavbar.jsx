import React from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router'
import '../main.css'
const SideNavbar = ({prop}) => {
  const navigate=useNavigate()
  const handleLogout= () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('role')
    window.location.href = "/login";
  }
  return (
    <div className='employee_navbar'>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li><Link to='/employee/'>Dashboard</Link></li>
        <li><Link to='/employee/profile'>Profile</Link></li>
        <li><Link to='/employee/attendance'>Attendance</Link></li>
        <li><Link to="/employee/leave_requests">Leave Requests</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li> 
      </ul>
    </div>
  )
}

export default SideNavbar
