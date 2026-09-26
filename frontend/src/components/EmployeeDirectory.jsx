import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';
import { fetchEmployees } from '../services/employeeServices';
import EditEmployeeModal from './EditEmployeeModal';
import defaultAvatar from '../assets/default-avatar.svg';

const EMPLOYEES_PER_PAGE = 10;

// Searchable, paginated employee table. Admins get an edit action per row.
const EmployeeDirectory = ({ editable = false, reloadKey = 0 }) => {
  const [employees, setEmployees] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const loadEmployees = () => {
    fetchEmployees()
      .then(setEmployees)
      .catch(() => setError('Failed to load employees.'));
  };

  useEffect(loadEmployees, [reloadKey]);

  const query = filterQuery.toLowerCase();
  const filteredEmployees = employees.filter((employee) =>
    [employee.first_name, employee.middle_name, employee.last_name, employee.department, employee.user.username]
      .join(' ')
      .toLowerCase()
      .includes(query)
  );

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE));
  const firstIndex = (currentPage - 1) * EMPLOYEES_PER_PAGE;
  const currentEmployees = filteredEmployees.slice(firstIndex, firstIndex + EMPLOYEES_PER_PAGE);
  const columnCount = editable ? 8 : 7;

  return (
    <div className="p-4 w-100">
      <h2 className="mb-4 text-center text-primary">Employee List</h2>
      {error && <p className="text-danger text-center">{error}</p>}

      <div className="mb-4 p-2 bg-white shadow-sm">
        <MDBInput
          type="text"
          label="Search by name, username or department"
          value={filterQuery}
          onChange={(e) => {
            setFilterQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="table-container">
        <MDBTable align="middle" hover bordered responsive className="custom-table">
          <MDBTableHead className="bg-primary text-white rounded-top">
            <tr>
              <th scope="col">Profile</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Department</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Address</th>
              {editable && <th scope="col">Actions</th>}
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td className="text-center">
                    <img
                      src={employee.user.profile_picture || defaultAvatar}
                      alt={`${employee.first_name}'s profile`}
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  </td>
                  <td className="fw-bold">
                    {[employee.first_name, employee.middle_name, employee.last_name].filter(Boolean).join(' ')}
                  </td>
                  <td>{employee.user.username}</td>
                  <td>{employee.department || 'Unassigned'}</td>
                  <td>{employee.user.email}</td>
                  <td>{employee.contact_number}</td>
                  <td>{employee.address}</td>
                  {editable && (
                    <td>
                      <EditEmployeeModal employee={employee} onSaved={loadEmployees} />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnCount} className="text-center text-muted">
                  No employees found
                </td>
              </tr>
            )}
          </MDBTableBody>
        </MDBTable>
      </div>

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

export default EmployeeDirectory;
