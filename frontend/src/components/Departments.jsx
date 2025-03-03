import React, { useEffect, useState } from 'react';
import { fetchDepartments, createDepartment, deleteDepartmentMain, editDepartmentMain } from '../services/departments';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBInput, MDBContainer, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter } from 'mdb-react-ui-kit';
import { CreateDepartmentModal } from './CreateDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';

const Departments = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    department_name: '',
    department_id: '',
    manager: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [editDepartmentForm, setEditDepartmentForm] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = async () => {
    try {
      const data = await fetchDepartments();
      setDepartmentData(data);
      console.log(data)
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
    setShowEditModal(true); // Show the edit modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDepartmentForm({ ...editDepartmentForm, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const updatedDepartment = await editDepartmentMain(editDepartmentForm.department_id, editDepartmentForm);
      setDepartmentData(departmentData.map(dept => (dept.department_id === updatedDepartment.department_id ? updatedDepartment : dept))); // Update UI
      setShowEditModal(false); // Close modal after saving
      setEditDepartmentForm(null);
    } catch {
      console.error('Failed to update department');
    }
  };

  const deleteDepartment = async (deptId) => {
    try {
      await deleteDepartmentMain(deptId);
      setDepartmentData(departmentData.filter(dept => dept.department_id !== deptId)); // Remove deleted department from UI
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setShowEditModal(false); // Close the modal without saving
    setEditDepartmentForm(null);
  };

  return (
    <MDBContainer>
      <h2 className="mb-4 text-center text-primary rounded p-3">Departments</h2>
      
      <MDBTable
        align="middle"
        hover
        bordered
        responsive
        className="custom-table"
      >
        <MDBTableHead className="bg-primary text-white rounded-top">
          <tr>
            <th>Department Name</th>
            <th>Department ID</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {departmentData.map((department) => (
            <tr key={department.department_id}>
              {editDepartmentForm && editDepartmentForm.department_id === department.department_id ? (
                // 🛠 Edit Mode
                <>
                  <td><MDBInput onChange={handleInputChange} type="text" name="department_name" value={editDepartmentForm.department_name} /></td>
                  <td><MDBInput onChange={handleInputChange} type="text" name="department_id" value={editDepartmentForm.department_id} /></td>
                  <td><MDBInput onChange={handleInputChange} type="text" name="manager" value={editDepartmentForm.manager || ''} /></td>
                  <td>
                    <button className="btn btn-primary"  size="sm" onClick={handleSaveClick}>Save</button>
                    <button className="btn btn-danger"  onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                // 🛠 Normal View Mode
                <>
                  <td>{department.department_name}</td>
                  <td>{department.department_id}</td>
                  <td>{department.manager || 'NULL'}</td>
                  <td>
                    {/* <button className="btn btn-primary" onClick={() => editDepartment(department)}>Edit</button> */}
                    <EditDepartmentModal departmentData={department}/>
                    <button className="btn btn-danger" onClick={() => deleteDepartment(department.department_id)}>Delete</button>
                    
                  </td>
                </>
              )}
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>

      {/* Edit Department Modal */}
      <MDBModal show={showEditModal} setShow={setShowEditModal}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Department</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={handleCancelClick}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="Department Name"
                type="text"
                name="department_name"
                value={editDepartmentForm?.department_name || ''}
                onChange={handleInputChange}
              />
              <MDBInput
                label="Department ID"
                type="text"
                name="department_id"
                value={editDepartmentForm?.department_id || ''}
                onChange={handleInputChange}
              />
              <MDBInput
                label="Manager"
                type="text"
                name="manager"
                value={editDepartmentForm?.manager || ''}
                onChange={handleInputChange}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <button className="btn btn-primary"  onClick={handleCancelClick}>Cancel</button>
              <button className="btn btn-danger"  onClick={handleSaveClick}>Save Changes</button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      <CreateDepartmentModal />
    </MDBContainer>
  );
};

export default Departments;
