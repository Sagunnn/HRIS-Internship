import React from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import { isAdmin, logout } from '../services/authorization';

const isTokenValid = (token) => {
  try {
    return jwtDecode(token).exp > Date.now() / 1000
  } catch {
    return false
  }
}

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('access_token')

  if (!token || !isTokenValid(token)) {
    logout()
    return <Navigate to='/login' replace />
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to='/employee' replace />
  }

  return children
}

export default ProtectedRoute
