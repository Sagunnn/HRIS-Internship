import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUserMain } from "../services/users"; // Import fetch and update API calls
import { toast, ToastContainer } from 'react-toastify';
import CreateUserForm from "./Admin/AdminComponents/CreateUserForm";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput, MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null); // Track editing user
  const [editForm, setEditForm] = useState(null); // Track form values for editing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteUser,setDeleteUser]=useState(null);

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
  const BASE_URL="http://127.0.0.1:8000/api/v1"
  
  return (
    <MDBContainer className="my-0">
      <h1 className="mb-3 text-center text-primary rounded p-3">User Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <MDBTable
          align="middle"
          hover
          bordered
          responsive
          className="custom-table"
        >
          <MDBTableHead className="bg-primary text-white rounded-top">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Profile Picture</th>
              <th>Actions</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {userData.map((user) => (
              <tr key={user.id}>
                {currentEditId === user.id ? (
                  // Editable form
                  <>
                    <td><MDBInput onChange={handleInputChange} type="text" name="username" value={editForm.username} /></td>
                    <td><MDBInput onChange={handleInputChange} type="email" name="email" value={editForm.email} /></td>
                    <td><MDBInput onChange={handleInputChange} type="text" name="first_name" value={editForm.first_name} /></td>
                    <td><MDBInput onChange={handleInputChange} type="text" name="last_name" value={editForm.last_name} /></td>
                    <td>
                      <select name="role" value={editForm.role} onChange={handleInputChange} className="form-select">
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </td>
                    <td>
                      <MDBInput onChange={handleInputChange} type="password" name="password" value={editForm.password} />
                    </td>
                    <td>
                      <MDBInput onChange={handleInputChange} type="password" name="confirm_password" value={editForm.confirm_password} />
                    </td>
                    <td>
                      <MDBBtn color="success" size="sm" onClick={handleSaveClick}>Save</MDBBtn>
                      <MDBBtn color="danger" size="sm" onClick={handleCancelClick}>Cancel</MDBBtn>
                    </td>
                  </>
                ) : (
                  // Static data display
                  <>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name || "N/A"}</td>
                    <td>{user.last_name || "N/A"}</td>
                    <td>{user.role}</td>
                    <td>
                      {user.profile_picture ? (
                        <img
                          src={`${BASE_URL}${user.profile_picture}`}
                          alt="Profile"
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <MDBBtn color="info" size="sm" onClick={() => handleEditClick(user)}>Edit</MDBBtn> &nbsp; 
                      <MDBBtn color="danger" size="sm" onClick={() => handleDeleteClick(user.id)}>Delete</MDBBtn>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      )}

      <CreateUserForm />
      <ToastContainer />
    </MDBContainer>
  );
};

export default Users;
