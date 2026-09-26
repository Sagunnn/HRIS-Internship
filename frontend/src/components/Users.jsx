import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { fetchUsers, updateUser, deleteUserMain } from "../services/users";
import { getErrorMessage } from "../services/api";

const USERS_PER_PAGE = 10;
const ROLES = ["Admin", "Manager", "Employee"];

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [editForm, setEditForm] = useState(null); // form values for the row being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers()
      .then(setUserData)
      .catch(() => setError("Failed to load user data."))
      .finally(() => setLoading(false));
  }, []);

  const handleEditClick = (user) => {
    setEditForm({ id: user.id, username: user.username, email: user.email, role: user.role, password: "", confirm_password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveClick = async () => {
    const { id, password, confirm_password, ...fields } = editForm;
    if (password !== confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const payload = password ? { ...fields, password, confirm_password } : fields;
      const updatedUser = await updateUser(id, payload);
      setUserData((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setEditForm(null);
      toast.success("User updated.");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to update user."));
    }
  };

  const handleDeleteClick = async (user) => {
    if (!window.confirm(`Delete user "${user.username}"? This also removes their employee record.`)) return;
    try {
      await deleteUserMain(user.id);
      setUserData((prev) => prev.filter((u) => u.id !== user.id));
      toast.success("User deleted.");
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to delete user."));
    }
  };

  const query = filterQuery.toLowerCase();
  const filteredUsers = userData.filter((user) =>
    [user.username, user.email, user.role].join(" ").toLowerCase().includes(query)
  );
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const firstIndex = (currentPage - 1) * USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(firstIndex, firstIndex + USERS_PER_PAGE);

  return (
    <div className="p-4 w-100">
      <ToastContainer />
      <h1 className="text-center text-primary rounded p-3">User Accounts</h1>
      {error && <p className="text-danger">{error}</p>}

      <MDBInput
        label="Search by Username, Email, or Role"
        value={filterQuery}
        onChange={(e) => {
          setFilterQuery(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="table-container mt-3">
          <MDBTable align="middle" hover bordered responsive className="custom-table">
            <MDBTableHead className="bg-primary text-white rounded-top">
              <tr>
                <th>Profile Picture</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </MDBTableHead>

            <MDBTableBody>
              {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.profile_picture ? (
                      <img
                        src={user.profile_picture}
                        alt="Profile"
                        style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  {editForm?.id === user.id ? (
                    <>
                      <td><MDBInput onChange={handleInputChange} type="text" name="username" value={editForm.username} /></td>
                      <td>
                        <MDBInput onChange={handleInputChange} type="email" name="email" value={editForm.email} className="mb-2" />
                        <MDBInput onChange={handleInputChange} type="password" name="password" label="New password (optional)" value={editForm.password} className="mb-2" />
                        <MDBInput onChange={handleInputChange} type="password" name="confirm_password" label="Confirm password" value={editForm.confirm_password} />
                      </td>
                      <td>
                        <select name="role" value={editForm.role} onChange={handleInputChange} className="form-select">
                          {ROLES.map((role) => <option key={role} value={role}>{role}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <MDBBtn color="success" size="sm" onClick={handleSaveClick}>Save</MDBBtn>
                          <MDBBtn color="danger" size="sm" onClick={() => setEditForm(null)}>Cancel</MDBBtn>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn btn-primary" title="Edit user" onClick={() => handleEditClick(user)}>
                            <span className="material-symbols-outlined">edit</span>
                          </button>
                          <button className="btn btn-danger" title="Delete user" onClick={() => handleDeleteClick(user)}>
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mt-3">
        <MDBBtn disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          <span className="material-symbols-outlined">arrow_back</span>
        </MDBBtn>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <MDBBtn disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          <span className="material-symbols-outlined">arrow_forward</span>
        </MDBBtn>
      </div>
    </div>
  );
};

export default Users;
