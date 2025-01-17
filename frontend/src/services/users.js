import axios from "axios";
import { getAuthHeaders } from "./authorization";
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";



// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`, {
      headers: getAuthHeaders(),
      "Content-Type": "multipart/form-data",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.response);
    throw error;
  }
};
// Update user data
export const updateUser = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.put(`${API_BASE_URL}/users/${id}/`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const deleteUserMain= async (id) =>{
    const token=localStorage.getItem('access_token');
    const response = await axios.delete(`${API_BASE_URL}/users/${id}/`,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json",
        },
    })
    console.log("Successfully Deleted")
    return response.data
}

export const createUser= async(newUserData)=>{
    try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(`${API_BASE_URL}/create_user/`,newUserData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        return response.data
    }
    catch (err) {
        throw err;
    }
}

export const getProfilePicture= async (URL)=>{
    
}