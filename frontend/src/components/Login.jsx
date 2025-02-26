import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authorization";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
// import "../styles/login.css"; // Optional: Add custom styles

const Login = () => {
  const navigate = useNavigate();
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

      const role = localStorage.getItem("role");
      role === "Admin"
        ? (window.location.href = "/admin")
        : (window.location.href = "/employee");
    } catch (error) {
      const errorMsg =
        error.response?.data?.detail || "An error occurred during login.";
      notify(errorMsg, true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card shadow-lg p-4" style={{ width: "350px" }}>
          <h3 className="text-center text-primary fw-bold">Login</h3>
          <p className="text-center text-muted">Enter your credentials</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select name="role" className="form-select">
                <option value="Admin">Admin</option>
                <option value="Employee">Employee</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Username</label>
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
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a href="#" className="text-primary fw-bold">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
