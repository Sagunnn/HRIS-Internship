import React, { useState } from 'react'
import axios from 'axios'
const UserRegistration = () => {
    const [formData,setFormData]=useState({
        'username':'',
        'email':'',
        'password':'',
        'confirm_password':''
    })
    const [error,setError]=useState()
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log(formData)
      
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM2NDE0MTIwLCJpYXQiOjE3MzY0MTA1MjAsImp0aSI6ImFmNTJlM2JlN2RlYjQ3YWU5N2ZlNDgyNjIzMjU4OGE5IiwidXNlcl9pZCI6MX0.NaU_12Ko3P9LG4o7PB74uX-3feiNkt5ZBbTcye7f2cc"

      if (!token) {
        console.log("No access token found.");
        return;
      }
       axios.post('http://127.0.0.1:8000/api/v1/create_user/',formData,{
        headers:{
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
       })
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='username' onChange={handleChange} placeholder='Username'/>
        <input type="email" name="email" onChange={handleChange} placeholder='Email' />
        <input type="password" name="password" onChange={handleChange} placeholder='Password' />
        <input type="password" name="confirm_password" onChange={handleChange} placeholder='Password'/>
        <button type='submit'>Create</button>
    </form>
  )
}

export default UserRegistration
