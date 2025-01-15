import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import { loginUser } from '../api/authorization'; // Import the login API function
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // navigate = useNavigate()
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
      const { access, refresh } = data;

      // Store tokens in localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);

      console.log('Access Token:', access);
      notify("Logged in successfully");
      // navigate('homepage')
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
