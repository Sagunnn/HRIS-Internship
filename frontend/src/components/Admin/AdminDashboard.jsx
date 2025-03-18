import React, { useState, useEffect } from 'react';
import { TbBurger } from 'react-icons/tb';
import Navbar from './AdminComponents/AdminNavbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import styles for the calendar
import { pendingApprovals } from '../../services/leaveServices'; // Assuming this is where you fetch leave data
import { MDBTable, MDBTableHead, MDBTableBody, MDBBadge } from 'mdb-react-ui-kit'; // For table display
import './AdminComponents/Navbar.css';

const AdminDashboard = () => {
  const [employeesOnLeaveToday, setEmployeesOnLeaveToday] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);

  // Fetch all employees who are on leave today
  const fetchEmployeesOnLeaveToday = async () => {
    try {
      const data = await pendingApprovals(); // Fetch all leave data

      // Get today's date in YYYY-MM-DD format
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format

      // Filter only employees who have approved leave today
      const employeesOnLeave = data.filter(leave => {
        const leaveStartDate = new Date(leave.start_date);
        const leaveEndDate = new Date(leave.end_date);

        // Compare only date parts of start and end date with today
        return (
          leave.status === 'APPROVED' &&
          leaveStartDate.toISOString().split('T')[0] <= todayStr &&
          leaveEndDate.toISOString().split('T')[0] >= todayStr
        );
      });

      // Filter pending leaves (if any)
      const pendingLeavesData = data.filter(leave => leave.status === 'PENDING');

      setEmployeesOnLeaveToday(employeesOnLeave);
      setPendingLeaves(pendingLeavesData);
    } catch (error) {
      console.error('Error fetching employees on leave:', error);
    }
  };

  // Fetch employees on leave today when the component mounts
  useEffect(() => {
    fetchEmployeesOnLeaveToday();
  }, []); // Only fetch once when the component mounts

  return (
    <div>
      <Navbar /> {/* Include Navbar */}
      <div className="container mt-4">
        <h1>Admin Dashboard</h1>

        <div className="d-flex flex-row">
          {/* Calendar Section */}
          <div className="calendar-container mb-4 flex-grow-1">
            <h3>Calendar</h3>
            <Calendar />
          </div>

          {/* Employees on Leave Section */}
          <div className="table-container mb-4 ms-4 flex-grow-2" style={{ width: '70%' }}>
            <h3>Employees on Leave Today</h3>

            {/* Approved Leaves Table */}
            <div className="mb-4">
              <MDBTable bordered hover responsive>
                <MDBTableHead className="bg-primary text-white">
                  <tr>
                    <th>ID</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {employeesOnLeaveToday.length > 0 ? (
                    employeesOnLeaveToday.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.id}</td>
                        <td>{leave.employee.first_name} {leave.employee.last_name}</td>
                        <td>{leave.employee.department}</td>
                        <td>{leave.leave_type}</td>
                        <td>{leave.start_date}</td>
                        <td>{leave.end_date}</td>
                        <td>{leave.reason}</td>
                        <td><MDBBadge color="success">Approved</MDBBadge></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center">No employees are on approved leave today.</td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            </div>

            {/* Pending Leave Approval Message */}
            <div className="mb-4">
              {pendingLeaves.length > 0 ? (
                <div className="alert alert-warning" role="alert">
                  There are pending leave approval requests.
                </div>
              ) : (
                <div className="alert alert-info" role="alert">
                  No leave approvals pending.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
