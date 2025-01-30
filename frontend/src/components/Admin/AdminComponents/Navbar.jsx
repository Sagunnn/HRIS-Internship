import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='side_navbar'>
      <ul>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/Employees'>Employees</Link></li>
        <li><Link to='/user_registration'>User Registration</Link></li>
        <li><Link to="/departments">Departments</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
