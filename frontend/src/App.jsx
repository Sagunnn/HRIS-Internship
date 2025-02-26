import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TbBurger } from "react-icons/tb";

import Login from './components/Login';
import HomePage from './pages/HomePage.jsx';
import UserRegistration from './components/UserRegistration.jsx';
import Users from './components/Users.jsx';
import Logout from './components/Logout.jsx';
import Departments from './components/Departments.jsx';
import SideNavbar from './components/SideNavbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import EmployeeDashboard from './components/Employee/EmployeeDashboard.jsx';
import AdminNavbar from './components/Admin/AdminComponents/AdminNavbar.jsx';
import UserProfile from './components/Employee/UserProfile.jsx';
import EmployeesList from './components/Employee/EmployeesList.jsx';
import Leaves from './components/Employee/Leaves.jsx';

import './main.css';

const App = () => {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  
  const toggleSideNavbar = () => {
    setSideNavbar(!sideNavbar);
  };

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <Router>
      <MainContent role={role} sideNavbar={sideNavbar} toggleSideNavbar={toggleSideNavbar} />
    </Router>
  );
};

const MainContent = ({ role, sideNavbar, toggleSideNavbar }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && (
        <>
          <header onClick={toggleSideNavbar}>
            <TbBurger size={35} />
          </header>
          {role ? (
            role.toLowerCase() === "admin" ? <AdminNavbar /> : <SideNavbar prop={sideNavbar} />
          ) : null}
        </>
      )}

      <div className="main">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* Protected Routes */}
          <Route
            path="/admin/user_registration"
            element={<ProtectedRoute><UserRegistration /></ProtectedRoute>}
          />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route
            path="/admin/users"
            element={<ProtectedRoute><Users /></ProtectedRoute>}
          />
          <Route
            path="/admin/departments"
            element={<ProtectedRoute><Departments /></ProtectedRoute>}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
          />
          <Route
            path="/employee"
            element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>}
          />
          <Route path='/employee/profile' element={<UserProfile />} />
          <Route path='/employee/employee_list' element={<EmployeesList />} />
          <Route path='/employee/leave_requests' element={<Leaves />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
