import React from 'react'
import { Navigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'; 
const ProtectedRoute = ({children}) => {
    const token= localStorage.getItem('access_token')
    if (!token){
        console.log('No token found, redirecting to login');
        return <Navigate to='/login'/>
    }

    try{
        const decode=jwtDecode(token)
        const currentTime=Date.now()/1000

        if (decode.exp< currentTime){
            localStorage.removeItem("access")
            return <Navigate to='/login'/>
        }
    }
    catch(error){
        localStorage.removeItem("access")
        return <Navigate to= '/login'/>
    }
  return children
}

export default ProtectedRoute
