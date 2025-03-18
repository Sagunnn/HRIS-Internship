import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import LeaveApproval from './components/Admin/AdminComponents/LeaveApproval.jsx';
import './main.css';
import {LeaveRequests} from './components/Employee/LeaveRequests.jsx';

const App = () => {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [fullName, setFullName] = useState(localStorage.getItem('full_name') || '');

  const toggleSideNavbar = () => {
    setSideNavbar(!sideNavbar);
  };

  useEffect(() => {
    console.log("hello123",localStorage.getItem('fullname'),"123")
    const roleFromStorage = localStorage.getItem('role');
    const fullNameFromStorage = localStorage.getItem('fullname');
    setRole(roleFromStorage);
    setFullName(fullNameFromStorage);

    console.log("here", roleFromStorage);
    console.log("here", fullNameFromStorage);
  }, []);

  return (
    <Router>
      <MainContent role={role} fullName={fullName} sideNavbar={sideNavbar} toggleSideNavbar={toggleSideNavbar} />
    </Router>
  );
};

const MainContent = ({ role, fullName, sideNavbar, toggleSideNavbar }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && (
        <>
          <header onClick={toggleSideNavbar}>
            <div className="header-content">
              {fullName ? (
                <span>Welcome, {fullName}</span>
              ) : (
                <span>Welcome, User</span> // Fallback text if no full name
              )}
            </div>
          </header>
          
          {role ? (
            role.toLowerCase() === "admin" ? (
              <AdminNavbar />
            ) : (
              <SideNavbar key={sideNavbar} prop={sideNavbar} />
            )
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
          <Route path='/admin/leave_approval' element={<LeaveApproval/>}></Route>
          <Route
            path="/employee"
            element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>}
          />
          <Route path='/employee/profile' element={<UserProfile />} />
          <Route path='/employee/employee_list' element={<EmployeesList />} />
          <Route path='/employee/departments' element={<Departments />} />
          <Route path='/employee/leave_requests' element={<Leaves />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
