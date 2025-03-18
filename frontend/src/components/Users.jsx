import React, { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUserMain } from "../services/users"; // Import fetch and update API calls
import { toast, ToastContainer } from 'react-toastify';
import CreateUserForm from "./Admin/AdminComponents/CreateUserForm";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput, MDBContainer } from "mdb-react-ui-kit";

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentEditId, setCurrentEditId] = useState(null); // Track editing user
  const [editForm, setEditForm] = useState(null); // Track form values for editing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [usersPerPage] = useState(10); // Users per page

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUserData(data);
        setFilteredUsers(data); // Initially, set filteredUsers to all users
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
      setFilteredUsers((prev) =>
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
      setFilteredUsers((prevData) => prevData.filter((user) => user.id !== userId)); // Also remove from filtered users
      toast("User deleted successfully!"); // Optional: display success message
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast("Failed to delete user."); // Optional: display error message
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterQuery(query);

    // Filter users by username, email, or role
    const filtered = userData.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to page 1 when the filter changes
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
      <h1 className=" text-center text-primary rounded p-3">User Data</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {/* Search bar */}
      <MDBInput 
        label="Search by Username, Email, or Role" 
        value={filterQuery} 
        onChange={handleSearch} 
        className=""
      />

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div div className='table-container'>
        <MDBTable align="middle" hover bordered responsive className="custom-table">
          <MDBTableHead className="bg-primary text-white rounded-top">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Profile Picture</th>
              <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Actions</th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                {currentEditId === user.id ? (
                  // Editable form
                  <>
                    <td><MDBInput onChange={handleInputChange} type="text" name="username" value={editForm.username} /></td>
                    <td><MDBInput onChange={handleInputChange} type="email" name="email" value={editForm.email} /></td>
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
                    <td>{user.role}</td>
                    <td>
                      {user.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt="Profile"
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <button className="btn btn-primary" onClick={() => handleEditClick(user)}>
                        <span className="material-symbols-outlined">edit</span>
                      </button> &nbsp; 
                      <button className="btn btn-danger" onClick={() => handleDeleteClick(user.id)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <MDBBtn disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </MDBBtn>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <MDBBtn disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </MDBBtn>
      </div>

      <CreateUserForm />
      <ToastContainer />
    </div>
  );
};

export default Users;
