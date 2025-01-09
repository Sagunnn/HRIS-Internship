import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
    const [userData,setUserData]=useState([])
   useEffect(()=>{
    const fetchUser= async ()=>{
        const token=localStorage.getItem("access_token")
        try{
            const response= await axios.get('http://127.0.0.1:8000/api/v1/users/',{
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            console.log(response.data)
            setUserData(response.data)
        }
        catch(error){
            console.error(error.response)
        }
    }
    fetchUser()
   },[])
  return (
    <div>
      <h1>User Data</h1>
      {/* Check if data is loaded before rendering */}
      {userData.length > 0 ? (
        <ul>
          {userData.map((user) => (
            <li key={user.id}>{user.id}
              <strong>Username:</strong> {user.username} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>First Name:</strong> {user.first_name || "N/A"} <br />
              <strong>Last Name:</strong> {user.last_name || "N/A"} <br />
              <strong>Role:</strong> {user.role} <br />
              <strong>Profile Picture:</strong> {user.profile_picture ? (
                <img src={user.profile_picture} alt="Profile" width="50" height="50" />
              ) : (
                "No picture"
              )}
              <br />
              <strong>Status:</strong> {user.is_active ? "Active" : "Inactive"} <br />
              <strong>Staff:</strong> {user.is_staff ? "Yes" : "No"} <br />
              <strong>Superuser:</strong> {user.is_superuser ? "Yes" : "No"} <br />
              <strong>Date Joined:</strong> {new Date(user.date_joined).toLocaleString()} <br />
              <strong>Last Login:</strong> {new Date(user.last_login).toLocaleString()} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p> // Show loading text if data is not yet fetched
      )}
    </div>
  )
}

export default Users
