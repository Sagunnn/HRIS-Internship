import React from 'react'
import { Navigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'; 
import AdminDashboard from './Admin/AdminDashboard';

const ProtectedRoute = ({children,allowedRole}) => {
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
    // const role=localStorage.getItem('role')
    // if (role === 'Admin'){
    //     return (
    //         <>
    //             <AdminDashboard/>
    //         </>
    //     )
       
        
    // }
    // else{
    //     <Navigate to='/employee'/>
    // }
  return children
}

export default ProtectedRoute
