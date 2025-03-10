import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation to get the current path
import logo from './logo.png';

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
        <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''}>Home</Link></li>
        
        <li><Link to="/admin/user_registration" className={isActive('/admin/user_registration') ? 'active' : ''}>Employees</Link></li>
        <li><Link to="/admin/users" className={isActive('/admin/users') ? 'active' : ''}>Users</Link></li>
        <li><Link to="/admin/departments" className={isActive('/admin/departments') ? 'active' : ''}>Departments</Link></li>
        <li><Link to="/admin/leave_approval" className={isActive('/admin/leave_approval') ? 'active' : ''}>Leave Requests</Link></li>
        <li><Link to="/login" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
  );
};

export default AdminNavbar;
