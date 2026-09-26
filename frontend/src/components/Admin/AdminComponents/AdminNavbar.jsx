import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/user-logo.png';
import { logout } from '../../../services/authorization';
import './Navbar.css';

const links = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { to: '/admin/user_registration', icon: 'group', label: 'Employees' },
  { to: '/admin/users', icon: 'manage_accounts', label: 'Users' },
  { to: '/admin/departments', icon: 'meeting_room', label: 'Departments' },
  { to: '/admin/leave_approval', icon: 'mail', label: 'Leave Requests' },
];

const AdminNavbar = () => {
  const location = useLocation();

  return (
    <div className="side_navbar active">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        {links.map(({ to, icon, label }) => (
          <li key={to}>
            <Link to={to} className={location.pathname === to ? 'active' : ''}>
              <span className="material-symbols-outlined">{icon}</span>
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/login" onClick={logout}>
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
