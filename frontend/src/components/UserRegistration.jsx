import React, { useState } from 'react'
import axios from 'axios'
import { createUser } from '../services/users'
const UserRegistration = () => {
    const [formData,setFormData]=useState({
        'username':'',
        'email':'',
        'profile_picture':null,
        'is_staff':false,
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
      createUser(formData)
    }

    const handleFileChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.files[0]})
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='username' onChange={handleChange} placeholder='Username'/><br/>
        <input type="email" name="email" onChange={handleChange} placeholder='Email' /><br/>
        <input type="file" name="profile_picture" onChange={handleFileChange} placeholder='image'/><br/>
        <input type="checkbox" name="is_staff" /><label>Is Staff</label><br/>
        <input type="password" name="password" onChange={handleChange} placeholder='Password' /><br/>
        <input type="password" name="confirm_password" onChange={handleChange} placeholder='Confirm Password'/><br/>
        <button type='submit'>Create</button>
    </form>
  )
}

export default UserRegistration
