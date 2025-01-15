import React, { useState } from 'react'
import axios from 'axios'
import { createUser } from '../api/users'
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
      createUser(formData)
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
