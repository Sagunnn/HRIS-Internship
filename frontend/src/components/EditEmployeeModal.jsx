import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import axios from 'axios';
import { getAuthHeaders } from '../services/authorization';

const EmployeeEditModal = ({ employee }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [employeeData, setEmployeeData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    department: '',
    username: '',
    email: '',
    contact_number: '',
    address: '',
  });

  const [initialData, setInitialData] = useState({});

  // Populate the form with existing employee data
  useEffect(() => {
    if (employee) {
      const initialEmployeeData = {
        first_name: employee.first_name || '',
        middle_name: employee.middle_name || '',
        last_name: employee.last_name || '',
        department: employee.department || '',
        username: employee.user.username || '',
        email: employee.user.email || '',
        contact_number: employee.user.contact_number || '',
        address: employee.address || '',
      };
      setEmployeeData(initialEmployeeData);
      setInitialData(initialEmployeeData);  // Save initial data for comparison
    }
  }, [employee]);

  const toggleOpen = () => setBasicModal(!basicModal);

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with only the changed fields
    const updatedData = {};

    for (let key in employeeData) {
      if (employeeData[key] !== initialData[key]) {
        updatedData[key] = employeeData[key];
      }
    }

    // Send PATCH request with only changed data
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/v1/register-employee/list/${employee.id}/`,
        { ...updatedData },
        {
          headers: getAuthHeaders(),
        }
      );
      setBasicModal(false); // Close modal after saving
    } catch (error) {
      console.error('Error updating employee data:', error);
      alert('Failed to update employee data');
    }
  };

  return (
    <>
      <button onClick={toggleOpen} className="btn btn-primary">
        <span className="material-symbols-outlined">edit</span>
      </button>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%', marginLeft: '170px', marginTop: '50px' }}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Employee</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <div className="d-flex flex-column align-items-center w-100">
                {/* First Name */}
                <div className="mb-4 w-100">
                  <label htmlFor="first_name" className="fw-bold text-start d-block">First Name</label>
                  <MDBInput
                    id="first_name"
                    name="first_name"
                    value={employeeData.first_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Middle Name */}
                <div className="mb-4 w-100">
                  <label htmlFor="middle_name" className="fw-bold text-start d-block">Middle Name</label>
                  <MDBInput
                    id="middle_name"
                    name="middle_name"
                    value={employeeData.middle_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Last Name */}
                <div className="mb-4 w-100">
                  <label htmlFor="last_name" className="fw-bold text-start d-block">Last Name</label>
                  <MDBInput
                    id="last_name"
                    name="last_name"
                    value={employeeData.last_name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Department */}
                <div className="mb-4 w-100">
                  <label htmlFor="department" className="fw-bold text-start d-block">Department</label>
                  <MDBInput
                    id="department"
                    name="department"
                    value={employeeData.department}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Username */}
                <div className="mb-4 w-100">
                  <label htmlFor="username" className="fw-bold text-start d-block">Username</label>
                  <MDBInput
                    id="username"
                    name="username"
                    value={employeeData.username}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Email */}
                <div className="mb-4 w-100">
                  <label htmlFor="email" className="fw-bold text-start d-block">Email</label>
                  <MDBInput
                    id="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Contact Number */}
                <div className="mb-4 w-100">
                  <label htmlFor="contact_number" className="fw-bold text-start d-block">Contact Number</label>
                  <MDBInput
                    id="contact_number"
                    name="contact_number"
                    value={employeeData.contact_number}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Address */}
                <div className="mb-4 w-100">
                  <label htmlFor="address" className="fw-bold text-start d-block">Address</label>
                  <MDBInput
                    id="address"
                    name="address"
                    value={employeeData.address}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Save Button */}
                <MDBBtn color="primary" className="w-100 fw-bold" onClick={handleSubmit}>
                  Save Changes
                </MDBBtn>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setBasicModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EmployeeEditModal;
