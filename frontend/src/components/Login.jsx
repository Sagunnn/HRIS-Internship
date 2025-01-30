import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import { loginUser } from '../services/authorization'; // Import the login API function
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const notify = (message, isError = false) => {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit

    try {
      // Call the loginUser function
      const data = await loginUser(loginForm);
      notify("Logged in successfully");
      const role=localStorage.getItem('role')
      if (role==='Admin'){
        navigate('/admin')
      }
      else{
        navigate('/')
      }
      
        
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || "An error occurred during login.";
      notify(errorMsg, true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="card">
        <h3>Login</h3>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <select name="role">
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
            </select>
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
