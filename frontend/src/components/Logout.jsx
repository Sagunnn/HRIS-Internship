import React from 'react'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const navigate= useNavigate()
    const handleLogout =() =>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("role")
        window.location.href = "/login";
    }
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
