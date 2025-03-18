import axios from "axios";
import {jwtDecode} from "jwt-decode"
// Base URL for API
const BASE_URL = "http://127.0.0.1:8000/api/v1";

// Login function
export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/token/`, loginData);
     // Extract tokens from the response
     const { access, refresh } = response.data;
    const deCodedToken=jwtDecode(access)
    
    localStorage.setItem("role",deCodedToken.role)
    localStorage.setItem("fullname",deCodedToken.full_name)
    console.log("hello",deCodedToken.full_name)
     // Store tokens in localStorage
     localStorage.setItem("access_token", access);
     localStorage.setItem("refresh_token", refresh);
     console.log(deCodedToken.role)
     console.log("Tokens stored successfully:");
     console.log("Access Token:", access);
     console.log("Refresh Token:", refresh);
     
    return response.data; // Return tokens if login is successful
  } catch (error) {
    console.error("Login failed:", error.response || error.message);
    throw error; // Throw error to be caught in the component
  }
};

// Get the access token from localStorage
export const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const getRegistrationAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    // "Content-Type": "multipart/form-data",
  };
};


