import React, { useState } from 'react'

const UserRegistration = () => {
    const [formData,setFormData]=useState({
        'username':'',
        'email':'',
        'password1':'',
        'password2':''
    })
    const [error,setError]=useState()
    const handleChange=(e)=>{
        setFormData(...formData,[e.target.name]:[e.target.value])
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" name='username' onChange={handleChange} placeholder='Username'/>
        <input type="email" name="email" onChange={handleChange} placeholder='Email' />
        <input type="password" name="password1" onChange={handleChange} placeholder='Password' />
        <input type="password" name="password2" onChange={handleChange} placeholder='Password'/>
    </form>
  )
}

export default UserRegistration
