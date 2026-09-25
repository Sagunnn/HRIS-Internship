import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getHomePath, loginUser } from "../services/authorization";
import { getErrorMessage } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import grafiLogo from "../assets/grafiLogo.png"
const Login = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const notify = (message, isError = false) => {
    isError ? toast.error(message) : toast.success(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(loginForm);
      notify("Logged in successfully");
      // Full reload so the header and navbar pick up the new session
      window.location.href = getHomePath();
    } catch (error) {
      notify(getErrorMessage(error, "An error occurred during login."), true);
    }
  };

  return (
    <>
      <ToastContainer />
      
      
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4" style={{ width: "450px",  marginRight:"200px", marginTop:"150px"}}>
        <img src={grafiLogo} alt="Grafi Offshore" style={{ width: "140px", height: "auto" }}/><br></br>
          <h3 className="text-center text-danger fw-bold">HRIS Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label bold fw-bold">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button className="btn btn-danger w-100" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
