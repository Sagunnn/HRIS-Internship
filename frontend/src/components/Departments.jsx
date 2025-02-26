import React, { useEffect, useState } from 'react';
import { fetchDepartments, createDepartment, deleteDepartmentMain, editDepartmentMain } from '../services/departments';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput, MDBContainer } from 'mdb-react-ui-kit';

const Departments = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    department_name: '',
    department_id: '',
    manager: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editDepartmentForm, setEditDepartmentForm] = useState(null);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const data = await fetchDepartments();
      setDepartmentData(data);
    } catch (err) {
      console.error('Error fetching department data:', err.response ? err.response.data : err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDept = await createDepartment(newDepartment);
    setDepartmentData([...departmentData, newDept]); // Update UI immediately
    setShowForm(false);
    setNewDepartment({ department_name: '', department_id: '', manager: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDepartment({ ...newDepartment, [name]: value });
  };

  const editDepartment = (department) => {
    setEditDepartmentForm({ ...department });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDepartmentForm({ ...editDepartmentForm, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const updatedDepartment = await editDepartmentMain(editDepartmentForm.id, editDepartmentForm);
      setDepartmentData(departmentData.map(dept => (dept.id === updatedDepartment.id ? updatedDepartment : dept))); // Update UI
      setEditDepartmentForm(null);
    } catch {
      console.error('Failed to update department');
    }
  };

  const deleteDepartment = async (deptId) => {
    try {
      await deleteDepartmentMain(deptId);
      setDepartmentData(departmentData.filter(dept => dept.id !== deptId)); // Remove deleted department from UI
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setEditDepartmentForm(null);
  };

  return (
    <MDBContainer>
      <h2 className="mb-4">Departments</h2>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th>Department Name</th>
            <th>Department ID</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
  {departmentData.map((department) => (
    <tr key={department.id}>
      {editDepartmentForm && editDepartmentForm.id === department.id ? (
        // 🛠 Edit Mode
        <>
          <td><MDBInput onChange={handleInputChange} type="text" name="department_name" value={editDepartmentForm.department_name} /></td>
          <td><MDBInput onChange={handleInputChange} type="text" name="department_id" value={editDepartmentForm.department_id} /></td>
          <td><MDBInput onChange={handleInputChange} type="text" name="manager" value={editDepartmentForm.manager || ''} /></td>
          <td>
            <MDBBtn color="success" size="sm" onClick={handleSaveClick}>Save</MDBBtn>
            <MDBBtn color="danger" size="sm" onClick={handleCancelClick}>Cancel</MDBBtn>
          </td>
        </>
      ) : (
        // 🛠 Normal View Mode
        <>
          <td>{department.department_name}</td>
          <td>{department.department_id}</td>
          <td>{department.manager || 'NULL'}</td>
          <td>
            <MDBBtn color="info" size="sm" onClick={() => editDepartment(department)}>Edit</MDBBtn>
            <MDBBtn color="danger" size="sm" onClick={() => deleteDepartment(department.id)}>Delete</MDBBtn>
          </td>
        </>
      )}
    </tr>
  ))}
</MDBTableBody>


      </MDBTable>

      <MDBBtn className="mt-3" color="primary" onClick={() => setShowForm(!showForm)}>
        {!showForm ? 'Create Department' : 'Cancel'}
      </MDBBtn>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-3">
          <MDBInput label="Department Name" type="text" name="department_name" value={newDepartment.department_name} onChange={handleChange} className="mb-2" />
          <MDBInput label="Department ID" type="text" name="department_id" value={newDepartment.department_id} onChange={handleChange} className="mb-2" />
          <MDBInput label="Manager Name" type="text" name="manager" value={newDepartment.manager} onChange={handleChange} className="mb-2" />
          <MDBBtn type="submit" color="success">
            Create
          </MDBBtn>
        </form>
      )}
    </MDBContainer>
  );
};

export default Departments;
