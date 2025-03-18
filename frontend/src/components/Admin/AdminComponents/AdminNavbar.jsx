import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to get the current path
import logo from '../../../assets/user-logo.png';

const AdminNavbar = (prop) => {
  const location = useLocation(); // Get current location (path)
  const [sideNavbar, setSideNavbar] = useState(true);

  const toggleSideNavbar = () => {
    setSideNavbar(!sideNavbar);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
  };

  // Function to determine if the current link is active based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`side_navbar ${sideNavbar ? 'active' : ''}`}>
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''}><span className="material-symbols-outlined">dashboard</span> Dashboard</Link></li>
        
        <li><Link to="/admin/user_registration" className={isActive('/admin/user_registration') ? 'active' : ''}><span class="material-symbols-outlined">
        group
        </span>Employees</Link></li>
        <li><Link to="/admin/users" className={isActive('/admin/users') ? 'active' : ''}>
        <span class="material-symbols-outlined">
          manage_accounts
          </span>Users</Link></li>
        <li><Link to="/admin/departments" className={isActive('/admin/departments') ? 'active' : ''}><span class="material-symbols-outlined">
        meeting_room
        </span>Departments</Link></li>
        <li><Link to="/admin/leave_approval" className={isActive('/admin/leave_approval') ? 'active' : ''}>
        <span class="material-symbols-outlined">
        mail
        </span>Leave Requests</Link></li>
        <li><Link to="/login" onClick={handleLogout}><span class="material-symbols-outlined">
        logout
        </span>Logout</Link></li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
