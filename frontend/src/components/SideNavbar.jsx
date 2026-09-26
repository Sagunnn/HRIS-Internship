import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/user-logo.png';
import { logout } from '../services/authorization';
import '../main.css';

const links = [
  { to: '/employee', icon: 'dashboard', label: 'Dashboard' },
  { to: '/employee/profile', icon: 'person', label: 'Profile' },
  { to: '/employee/departments', icon: 'apartment', label: 'Departments' },
  { to: '/employee/employee_list', icon: 'group', label: 'Employee List' },
  { to: '/employee/leave_requests', icon: 'mail', label: 'Leave Requests' },
];

const SideNavbar = () => {
  const location = useLocation();

  return (
    <div className='employee_navbar'>
      <img src={logo} alt="Logo" className='logo' />
      <ul>
        {links.map(({ to, icon, label }) => (
          <li key={to}>
            <Link to={to} className={location.pathname === to ? 'active' : ''}>
              <span className="material-symbols-outlined">{icon}</span> {label}
            </Link>
          </li>
        ))}
        <li>
          <Link to='/login' onClick={logout}>
            <span className="material-symbols-outlined">logout</span> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
