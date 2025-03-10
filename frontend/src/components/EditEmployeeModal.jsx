import React, { useState, useEffect } from 'react';
import { MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import { getAuthHeaders } from '../services/authorization';

const EditEmployeeModal = ({ showModal, closeModal, employeeId, refreshEmployees }) => {
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

  useEffect(() => {
    if (employeeId) {
      // Fetch the employee data from the server using the ID
      axios
        .get(`http://127.0.0.1:8000/api/v1/register-employee/${employeeId}/`, {
          headers: getAuthHeaders(),
        })
        .then((response) => {
          setEmployeeData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching employee data:', error);
        });
    }
  }, [employeeId]);

  const handleChange = (e) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/register-employee/${employeeId}/`,
        employeeData,
        {
          headers: getAuthHeaders(),
        }
      )
      .then((response) => {
        refreshEmployees();
        closeModal();
      })
      .catch((error) => {
        console.error('Error updating employee data:', error);
      });
  };

  return (
    <MDBModal isOpen={showModal} toggle={closeModal}>
      <MDBModalHeader toggle={closeModal}>Edit Employee</MDBModalHeader>
      <MDBModalBody>
        <MDBInput
          label="First Name"
          name="first_name"
          value={employeeData.first_name}
          onChange={handleChange}
        />
        <MDBInput
          label="Middle Name"
          name="middle_name"
          value={employeeData.middle_name}
          onChange={handleChange}
        />
        <MDBInput
          label="Last Name"
          name="last_name"
          value={employeeData.last_name}
          onChange={handleChange}
        />
        <MDBInput
          label="Department"
          name="department"
          value={employeeData.department}
          onChange={handleChange}
        />
        <MDBInput
          label="Username"
          name="username"
          value={employeeData.username}
          onChange={handleChange}
        />
        <MDBInput
          label="Email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
        />
        <MDBInput
          label="Contact Number"
          name="contact_number"
          value={employeeData.contact_number}
          onChange={handleChange}
        />
        <MDBInput
          label="Address"
          name="address"
          value={employeeData.address}
          onChange={handleChange}
        />
      </MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={closeModal}>
          Close
        </MDBBtn>
        <MDBBtn color="primary" onClick={handleSubmit}>
          Save Changes
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default EditEmployeeModal;
