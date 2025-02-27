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
  const isActive = (path) => location.pathname === path;
  return (
    <div className='employee_navbar'>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li><Link to='/employee/' className={isActive('/employee') ? 'active' : ''}>Dashboard</Link></li>
        <li><Link to='/employee/profile' className={isActive('/employee/profile') ? 'active' : ''}>Profile</Link></li>
        <li><Link to='/employee/attendance' className={isActive('/employee/attendance') ? 'active' : ''}>Attendance</Link></li>
        <li><Link to='/employee/employee_list' className={isActive('/employee/employee_list') ? 'active' : ''}>Employee List</Link></li>
        <li><Link to="/employee/leave_requests" className={isActive('/employee/leave_requests') ? 'active' : ''}>Leave Requests</Link></li>
        <li><Link to='/login' onClick={handleLogout}>Logout</Link></li> 
      </ul>
    </div>
  )
}

export default SideNavbar
