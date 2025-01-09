import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import axios from 'axios'
import {toast, ToastContainer }from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.css';
const Login = () => {
    const [loginForm,setLoginForm]=useState({
        'username':'',
        'password':''
    })
    const handleChange=(e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value})
    }
    const notify=(err)=>{
      if (err == 'err')
        toast("Hello")
      else
        toast("Logged in successfully")
    }
    const token = localStorage.getItem('accessToken');
    console.log(token)
    const handleSubmit = (e) => {
        e.preventDefault() // Prevents page reload on form submit
        
        // Send a POST request to the backend (adjust the URL as needed)
        axios.post('http://127.0.0.1:8000/api/v1/token/', loginForm)
          .then(response => {
            console.log('Login successful:', response)
            const accessToken = response.data.access 
    
            localStorage.setItem('access_token', accessToken);

            console.log('access_token:', accessToken);
            notify()
          })
          .catch(error => {
            console.error('Login failed:', error)
            notify('err')
          })
      }
  return (
    <>
    <ToastContainer/>
    <div className="card">
      <h3>Login</h3>
    <div className="card-body">
    <form onSubmit={handleSubmit}>
        <input type="text" className='form-control' name='username' onChange={handleChange} placeholder='Username'/>
        <input type="password" className='form-control' name="password" onChange={handleChange} placeholder='Password' />
        <Button type='submit'>Login</Button>
    </form>
    </div>
    </div>
    </>
  )
}

export default Login
