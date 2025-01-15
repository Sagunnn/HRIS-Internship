import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUserMain } from "../api/users"; // Import fetch and update API calls
import { toast, ToastContainer } from 'react-toastify';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null); // Track editing user
  const [editForm, setEditForm] = useState(null); // Track form values for editing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteUser,setDeleteUser]=useState(null)

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data);
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // Handle "Edit" button click
  const handleEditClick = (user) => {
    setCurrentEditId(user.id);
    setEditForm({ ...user }); // Populate form with user's data
  };

  // Handle form field change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Handle "Save" button click
  const handleSaveClick = async () => {
    try {
      const updatedUser = await updateUser(editForm.id, editForm); // API call
      setUserData((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setCurrentEditId(null); // Exit edit mode
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  // Handle "Cancel" button click
  const handleCancelClick = () => {
    setCurrentEditId(null); // Exit edit mode without saving
  };

  const handleDeleteClick = async (userId) => {
    try {
      await deleteUserMain(userId); // Delete user via API
      setUserData((prevData) => prevData.filter((user) => user.id !== userId)); // Remove user from UI
      toast("User deleted successfully!"); // Optional: display success message
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast("Failed to delete user."); // Optional: display error message
    }
  };
  
  return (
    <div>
      <h1>User Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ul>
          {userData.map((user) => (
            <li key={user.id}>
              {currentEditId === user.id ? (
                // Editable form
                <div>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleInputChange}
                  />
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                  />
                  <input type='text' name='first_name' value={editForm.first_name} onChange={handleInputChange}/>
                  <input
                    type="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="confirm_password"
                    value={editForm.confirm_password}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSaveClick}>Save</button>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              ) : (
                // Static data display
                <div>
                  <strong>Username:</strong> {user.username} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>First Name:</strong> {user.first_name || "N/A"} <br />
                  <strong>Last Name:</strong> {user.last_name || "N/A"} <br />
                  <button onClick={() => handleEditClick(user)}>Edit</button>
                  <button onClick={()=>handleDeleteClick(user.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
