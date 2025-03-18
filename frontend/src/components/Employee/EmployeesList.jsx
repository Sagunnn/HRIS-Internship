import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../../services/authorization';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdb-react-ui-kit';


const UserRegistration = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
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
          marginBottom: '20px',
          width:'100%'
        }}
      >
        <MDBInput type="text" label="Search by Name or Department" value={filterQuery} onChange={handleFilter} />
      </div>

      <MDBTable align="middle" hover bordered responsive className="custom-table" >
  <MDBTableHead className="bg-primary text-white rounded-top">
    <tr>
      <th scope="col" style={{ width: '10%' }}>Profile</th>
      <th scope="col" style={{ width: '20%' }}>Name</th>
      <th scope="col" style={{ width: '15%' }}>Username</th>
      <th scope="col" style={{ width: '15%' }}>Department</th>
      <th scope="col" style={{ width: '20%' }}>Email</th>
      <th scope="col" style={{ width: '15%' }}>Contact</th>
      <th scope="col" style={{ width: '20%' }}>Address</th>
    </tr>
  </MDBTableHead>
  <MDBTableBody style={{ minHeight: '200px' }}>
    {filteredEmployees.length > 0 ? (
      filteredEmployees.map((employee, index) => (
        <tr key={index} style={{ height: rowHeight }}>
          {/* Profile Image Column */}
          <td className="text-center">
            <img
              src={employee.user.profile_picture || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALEAAACUCAMAAADrljhyAAAAMFBMVEXk5ueutLfp6uu/xMarsbSyuLvh4+TR1Na5vsGorrLIzM7e4OHLz9HY2928wcS1u767X01QAAAEMklEQVR4nO2c25bqIAxAIeXS0lL+/28PqOM4VSsQmuBZ3S8zj3tlxQRDUIiTk5OTk5OTk5OTk5OTk/8MADF7m/Dp/74BYbwb1XRHjos3olttMHbQSsk/TCo426czCBfkRveKksH1mB5ueql7k1YLt98Wq6f3vpfsCJbb8QEQ605872F2hlv0B/D6s3ByDjO36o3lQ0L8Kk99ZIbLCvDNeemgZpQIR/iVC4Uld5mDpVA4ljnPGWXwxcKRmVHZ6AphNTLW5bEmxFINbMLlSXyFLZVNnW+CxxiGyhDHvHAsyia3Ob+C44QBI0JYOQZjjxCWUjMEuT6LExN9s55rmsdjkMmNLSrEqSZTG+OSIjU+6gKHFI5BJjb2mGJ8NaZNCyg9yD9D3PcAWSkSK60xOimkDJTCYkYnBXXbs3hhqSk/erA0MJaWMJHBfZ3x0ECYdHLRxpjyjAzr1xl/X4y/z7hFrSCdzFYMCF9AWt2w30DIjUXVTHMDaZcWosXZjXTECQ1iPNKejzEDoRvEX00tPi2Ib8pQY8ILE62wEAFrHKjnFdgeMpFf7OFGm7FHE/tGMq7794Tpb2+QX/UU+aAwghmyqJXhTg93fiM9Bd2VEcK086C7cX3fox9336ideivaIeEDlXchiv4O5IfaDx/jthDUXP7T34D8US7PC0V7kn9iDqV7QjyF7QFfFuUOtvSgaFzfgbBIy0LZzjEl2NfdEia3kzAuCG3J29zkXs57BObPmRE7XRcZcWfZd1aBf2FzA8xOvs2NSS+mN+GEsfrVLr2atO1mu3sDxECPWit1fWKR/mo9urnHhwp3orRd3LCOkXVwi+1b90pUNGaOGNH/K6HENziKW1y9vyRECPqSwzGTdRgH56z389xTuNNbMZtMY1X4+dD9FooLUqec9qYH6/RJW7WWW9PnGhe1Y93wzNLGrmrvOdOL2jyFZeapzikVBlmke2NSMdTkLRCEHcKnRNiJNHVfAePk66d4+dJSjnS76X6tSYZXkV4IMjqmw1qdDc/S8WN4cKDBv3mZWe2s3aFdsng6keN83FArHiXb5cMjUzhmOAv2gABfUdK1r88gGtxE79H8mqHBPfQ+09Cy0kHxu8EKVMOOAuKwDP6j3CwzwLctwTvOjfbJWmzu5iq3GMy1WRTLVl6/TLiBcoM3CaXKI06YMIfvypgoA3bto065/vYMZg5hzNsWg95eqqX2/Il9HlZP3VORNvuvdVTeqx59WtujZresxWYmhuK84MyJC8UnDMMc4vL1suxfgznMuLRbN3gxiKTsBxgQa1bt0EXG3LaJohUz/EvdFhTsmDV5BISnoFdX/SDMAWR/t+Y4x78i/3sq/VelN2QvFRnc+nY7svvezHaS35D942otnlk1IXtG1EPDu5J7tujlg5f/0yfDpDoh9yXRMvRC9osG6IZM4b75B+okOfVjzocqAAAAAElFTkSuQmCC'}
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
  );
};

export default UserRegistration;
