import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [loginForm,setLoginForm]=useState({
        'username':'',
        'password':''
    })
    const handleChange=(e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault() // Prevents page reload on form submit
        
        // Send a POST request to the backend (adjust the URL as needed)
        axios.post('http://127.0.0.1:8000/api/v1/token/', loginForm)
          .then(response => {
            console.log('Login successful:', response)
            const accessToken = response.data.access 
    
            localStorage.setItem('access_token', accessToken);

            console.log('access_token:', accessToken);
          })
          .catch(error => {
            console.error('Login failed:', error)
          })
      }
  return (
    <>
    <form onSubmit={handleSubmit}>
        <input type="text" name='username' onChange={handleChange} placeholder='Username'/>
        <input type="password" name="password" onChange={handleChange} placeholder='Password' />
        <button type='submit'>Login</button>
    </form>
    <form>
      <div className="form-group">
        <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Username"/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Password" />
      </div>
      <div className='form-group'>
        <Button>Submit</Button>
      </div>
    </form>
    </>
  )
}

export default Login
