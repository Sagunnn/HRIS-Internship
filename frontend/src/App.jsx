import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from './components/Login';
import UserRegistration from './components/UserRegistration.jsx';
import Users from './components/Users.jsx';
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
import { getHomePath, isAdmin } from './services/authorization';
import './main.css';

const App = () => (
  <Router>
    <MainContent />
  </Router>
);

const MainContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const fullName = localStorage.getItem('fullname');

  const admin = (element) => <ProtectedRoute adminOnly>{element}</ProtectedRoute>;
  const user = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

  return (
    <div>
      {!isLoginPage && isLoggedIn && (
        <>
          <header>
            <div className="header-content">
              <span>Welcome, {fullName || 'User'}</span>
            </div>
          </header>
          {isAdmin() ? <AdminNavbar /> : <SideNavbar />}
        </>
      )}

      <div className="main">
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? getHomePath() : '/login'} replace />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={admin(<AdminDashboard />)} />
          <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />
          <Route path="/admin/user_registration" element={admin(<UserRegistration />)} />
          <Route path="/admin/users" element={admin(<Users />)} />
          <Route path="/admin/departments" element={admin(<Departments />)} />
          <Route path="/admin/leave_approval" element={admin(<LeaveApproval />)} />

          {/* Employee */}
          <Route path="/employee" element={user(<EmployeeDashboard />)} />
          <Route path="/employee/profile" element={user(<UserProfile />)} />
          <Route path="/employee/employee_list" element={user(<EmployeesList />)} />
          <Route path="/employee/departments" element={user(<Departments />)} />
          <Route path="/employee/leave_requests" element={user(<Leaves />)} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
