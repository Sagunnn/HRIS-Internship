import React from 'react'
import logo from '../assets/logo.png'
const SideNavbar = ({prop}) => {
  return (
    <div className={prop? 'side_navbar active' : 'side_navbar'}>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li><a href='/' active>Home</a></li>
        <li><a href='/users'>Users</a></li>
        <li><a href='/user_registration'>User Registration</a></li>
        <li><a href='/login'>Login</a></li>
      </ul>
    </div>
  )
}

export default SideNavbar
