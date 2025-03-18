import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
} from 'mdb-react-ui-kit';

import { fetchEmployees } from '../services/employeeServices';
import { editDepartmentMain } from '../services/departments';

export function EditDepartmentModal({ departmentData }) {
  const [basicModal, setBasicModal] = useState(false);
  const [managers, setManagers] = useState([]);
  const toggleOpen = () => setBasicModal(!basicModal);

  const [formData, setFormData] = useState({
    department_id: '',
    department_name: '',
    manager: '',
  });

  // Set the formData whenever departmentData changes
  useEffect(() => {
    if (departmentData) {
      setFormData({
        department_id: departmentData.department_id || '',
        department_name: departmentData.department_name || '',
        manager: departmentData.manager ? departmentData.manager.id : '', // Set manager's ID or empty
      });
    }
  }, [departmentData]);

  useEffect(() => {
    const getManagers = async () => {
      try {
        const data = await fetchEmployees();
        const filteredManagers = data.filter(
          (employee) => employee.user.role === 'Manager'
        );
        setManagers(filteredManagers);
      } catch (err) {
        console.log(err);
      }
    };
    getManagers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(formData); // Check if formData contains department_id
  
    const departmentId = formData.department_id; // Ensure you are extracting the department_id properly
  
    if (departmentId) {
      // Call the editDepartmentMain with departmentId and formData
      editDepartmentMain(departmentId, formData);
      
      setBasicModal(false); // Close the modal after successful submission
      setFormData({ department_id: '', department_name: '', manager: '' }); // Clear formData
    } else {
      console.log("Department ID is missing");
    }
  };
  

  return (
    <>
      <button onClick={toggleOpen} className="btn btn-primary">
      <span class="material-symbols-outlined">
      edit
      </span>
      </button>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' ,marginLeft: '170px',marginTop:'100px'}}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Department</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                {/* Manager Dropdown */}
                <div className="mb-4 w-100">
                  <label htmlFor="manager">Select Manager</label>
                  <select
                    id="manager"
                    name="manager"
                    value={formData.manager || ''} // Ensure default value is empty if no manager
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Manager</option>
                    {managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.first_name} {manager.last_name}: <b>{manager.department}</b>
                      </option>
                    ))}
                  </select>
                </div>

                {/* Department Name */}
                <div className="mb-4 w-100">
                  <label htmlFor="department_name">Department Name</label>
                  <MDBInput
                    type="text"
                    name="department_name"
                    value={formData.department_name} // Ensure previous department name is shown
                    onChange={handleChange}
                    className="mb-4"
                    required
                  />
                </div>

                {/* Department ID */}
                <div className="mb-4 w-100">
                  <label htmlFor="department_id">Department ID</label>
                  <MDBInput
                    type="text"
                    name="department_id"
                    value={formData.department_id} // Ensure previous department ID is shown
                    onChange={handleChange}
                    className="mb-4"
                    required
                    disabled // Disable the department ID field because it's not editable
                  />
                </div>

                {/* Submit Button */}
                <MDBBtn type="submit" color="secondary" className="w-100">
                  Update Department
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
