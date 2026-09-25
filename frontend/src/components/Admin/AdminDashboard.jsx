import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { pendingApprovals } from '../../services/leaveServices';
import { toISODate } from '../../services/dates';
import LeaveStatusBadge from '../Employee/LeaveStatusBadge';
import { leaveTypeLabel } from '../../services/leaveServices';

const AdminDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);

  useEffect(() => {
    pendingApprovals()
      .then(setLeaves)
      .catch(() => setError('Failed to load leave data.'));
  }, []);

  const day = toISODate(selectedDate);
  const isToday = day === toISODate(new Date());
  const employeesOnLeave = leaves.filter(
    (leave) => leave.status === 'APPROVED' && leave.start_date <= day && leave.end_date >= day
  );
  const pendingCount = leaves.filter((leave) => leave.status === 'PENDING').length;

  return (
    <div className="container mt-4">
      <h1>Admin Dashboard</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-4">
        {pendingCount > 0 ? (
          <div className="alert alert-warning d-flex justify-content-between align-items-center" role="alert">
            <span>{pendingCount} leave request{pendingCount === 1 ? '' : 's'} awaiting approval.</span>
            <Link to="/admin/leave_approval" className="btn btn-sm btn-warning">Review</Link>
          </div>
        ) : (
          <div className="alert alert-info" role="alert">No leave approvals pending.</div>
        )}
      </div>

      <div className="d-flex flex-row gap-4">
        <div className="calendar-container mb-4">
          <h3>Calendar</h3>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

        <div className="mb-4 flex-grow-1">
          <h3>Employees on Leave {isToday ? 'Today' : `on ${day}`}</h3>
          <MDBTable bordered hover responsive>
            <MDBTableHead className="bg-primary text-white">
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {employeesOnLeave.length > 0 ? (
                employeesOnLeave.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.employee.first_name} {leave.employee.last_name}</td>
                    <td>{leave.employee.department || 'Unassigned'}</td>
                    <td>{leaveTypeLabel(leave.leave_type)}</td>
                    <td>{leave.start_date}</td>
                    <td>{leave.end_date}</td>
                    <td><LeaveStatusBadge status={leave.status} /></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No employees are on approved leave.</td>
                </tr>
              )}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
