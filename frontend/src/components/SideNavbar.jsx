import React from 'react';
import logo from '../assets/user-logo.png';
import { Link, useNavigate } from 'react-router-dom'; // Fixed import
import '../main.css';

const SideNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    window.location.href = "/login";
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='employee_navbar'>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        <li>
          <Link to='/employee/' className={isActive('/employee') ? 'active' : ''}>
            <span className="material-symbols-outlined">dashboard</span> Dashboard
          </Link>
        </li>
        <li>
          <Link to='/employee/profile' className={isActive('/employee/profile') ? 'active' : ''}>
            <span className="material-symbols-outlined">person</span> Profile
          </Link>
        </li>
        <li>
          <Link to='/employee/departments' className={isActive('/employee/departments') ? 'active' : ''}>
            <span className="material-symbols-outlined">apartment</span> Departments
          </Link>
        </li>
        <li>
          <Link to='/employee/employee_list' className={isActive('/employee/employee_list') ? 'active' : ''}>
            <span className="material-symbols-outlined">group</span> Employee List
          </Link>
        </li>
        <li>
          <Link to="/employee/leave_requests" className={isActive('/employee/leave_requests') ? 'active' : ''}>
            <span className="material-symbols-outlined">mail</span> Leave Requests
          </Link>
        </li>
        <li>
          <Link to='/login' onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span> Logout
          </Link>
        </li> 
      </ul>
    </div>
  );
};

export default SideNavbar;
