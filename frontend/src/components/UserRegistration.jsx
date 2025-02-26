import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/authorization';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const UserRegistration = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/v1/register-employee/list/', {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4">Employee List</h2>
      {employees.length > 0 ? (
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Department</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {employee.first_name} {employee.middle_name} {employee.last_name}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{employee.user.username}</td>
                <td>{employee.department}</td>
                <td>{employee.user.email}</td>
                <td>{employee.contact_number}</td>
                <td>{employee.address}</td>
                <td>
                  <MDBBtn color="link" rounded size="sm">
                    Edit
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      ) : (
        <p>Loading employees...</p>
      )}
    </div>
  );
};

export default UserRegistration;
