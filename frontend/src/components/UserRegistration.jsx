import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/authorization';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import CreateUserForm from './Admin/AdminComponents/CreateUserForm';

const UserRegistration = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [rowHeight, setRowHeight] = useState(50); // Default row height
  const dragHandleRef = useRef(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/v1/register-employee/list/', {
        headers: getAuthHeaders(),
      })
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Set filtered employees initially as all employees
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  // Filter function
  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterQuery(query);

    // Filter employees by name and department
    const filtered = employees.filter((employee) =>
      `${employee.first_name} ${employee.middle_name} ${employee.last_name}`
        .toLowerCase()
        .includes(query) ||
      (employee.department ? employee.department.toLowerCase() : '').includes(query)
    );
    setFilteredEmployees(filtered);
  };

  // Drag functionality to resize rows
  const handleDragStart = (e, rowIndex) => {
    e.preventDefault();
    const startY = e.clientY;

    const onMouseMove = (moveEvent) => {
      const offset = moveEvent.clientY - startY;
      setRowHeight((prevHeight) => Math.max(prevHeight + offset, 30)); // Prevent shrinking too much
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center text-primary">Employee List</h2>

      {/* Search bar for filtering */}
      <div
        className="mb-4"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: 'white',
          padding: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          marginBottom: '20px', // Ensures spacing between search and table
          width: '100%', // Ensure the width matches the parent container
        }}
      >
        <MDBInput
          type="text"
          label="Search by Name or Department"
          value={filterQuery}
          onChange={handleFilter}
        />
      </div>

      <MDBTable
        align="middle"
        hover
        bordered
        responsive
        className="custom-table"
        style={{ minWidth: '1000px', tableLayout: 'fixed' }} // Fixed table layout
      >
        <MDBTableHead className="bg-primary text-white rounded-top">
          <tr>
            <th scope="col" style={{ width: '20%' }}>
              &nbsp; Name
            </th>
            <th scope="col" style={{ width: '15%' }}>
              Username
            </th>
            <th scope="col" style={{ width: '15%' }}>
              Department
            </th>
            <th scope="col" style={{ width: '20%' }}>
              Email
            </th>
            <th scope="col" style={{ width: '15%' }}>
              Contact
            </th>
            <th scope="col" style={{ width: '20%' }}>
              Address
            </th>
            <th scope="col" style={{ width: '15%' }}>
              Actions
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody style={{ minHeight: '200px' }}>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr
                key={index}
                style={{
                  height: rowHeight,
                  wordWrap: 'break-word', // Ensure text doesn't overflow
                  whiteSpace: 'normal', // Allow wrapping of text
                }}
              >
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1" style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                        {employee.first_name} {employee.middle_name} {employee.last_name}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{employee.user.username}</td>
                <td>{employee.department ? employee.department : 'Unassigned'}</td>
                <td>{employee.user.email}</td>
                <td>{employee.contact_number}</td>
                <td>{employee.address}</td>
                <td>
                  <button class="btn btn-primary" className="p-1">
                    Edit
                  </button>
                </td>
                <td
                  ref={dragHandleRef}
                  onMouseDown={(e) => handleDragStart(e, index)}
                  style={{
                    cursor: 'ns-resize', // Change the cursor to indicate resize action
                    width: '10px', // Set width for the resize handle
                    backgroundColor: '#ccc', // Background color for the drag handle
                  }}
                ></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No employees found
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      <div className="mt-5">
        <CreateUserForm />
      </div>
    </div>
  );
};

export default UserRegistration;
