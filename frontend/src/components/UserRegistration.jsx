import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/authorization';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import CreateUserForm from './Admin/AdminComponents/CreateUserForm';
import EditEmployeeModal from './EditEmployeeModal';
import { EditDepartmentModal } from './EditDepartmentModal';

const UserRegistration = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [employeesPerPage] = useState(5); // Employees per page
  const [rowHeight, setRowHeight] = useState(50); // Default row height

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
    setCurrentPage(1); // Reset to page 1 when the filter changes
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  return (
    <div >
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
          marginBottom: '20px',
          width: '100%',
        }}
      >
        <MDBInput type="text" label="Search by Name or Department" value={filterQuery} onChange={handleFilter} />
      </div>

      {/* Table container to ensure sticky header stays on scroll */}
      <div className='table-container'>
        <MDBTable align="middle" hover bordered responsive className="custom-table">
          <MDBTableHead
            className="bg-primary text-white rounded-top"
            style={{
              position: 'sticky',
              top: 0,
              backgroundColor: '#007bff',
              zIndex: 2,
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}
          >
            <tr>
              <th scope="col" style={{ width: '10%' }}>Profile</th>
              <th scope="col" style={{ width: '20%' }}>Name</th>
              <th scope="col" style={{ width: '15%' }}>Username</th>
              <th scope="col" style={{ width: '15%' }}>Department</th>
              <th scope="col" style={{ width: '20%' }}>Email</th>
              <th scope="col" style={{ width: '15%' }}>Contact</th>
              <th scope="col" style={{ width: '20%' }}>Address</th>
              <th scope="col" style={{ width: '15%' }}>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody style={{ minHeight: '200px' }}>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={index} style={{ height: rowHeight }}>
                  {/* Profile Image Column */}
                  <td className="text-center">
                    <img
                      src={employee.user.profile_picture || 'https://static.thenounproject.com/png/1095867-512.png'}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  </td>

                  {/* Name Column */}
                  <td>
                    <p className="fw-bold mb-1">
                      {employee.first_name} {employee.middle_name} {employee.last_name}
                    </p>
                  </td>

                  <td>{employee.user.username}</td>
                  <td>{employee.department ? employee.department : 'Unassigned'}</td>
                  <td>{employee.user.email}</td>
                  <td>{employee.contact_number}</td>
                  <td>{employee.address}</td>
                  <td>
                    {/* Pass employee directly to EditEmployeeModal */}
                    <EditEmployeeModal employee={employee} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No employees found
                </td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-3">
        <MDBBtn
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </MDBBtn>
        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>
        <MDBBtn
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </MDBBtn>
      </div>

      <div className="mt-5">
        <CreateUserForm />
      </div>
    </div>
  );
};

export default UserRegistration;
