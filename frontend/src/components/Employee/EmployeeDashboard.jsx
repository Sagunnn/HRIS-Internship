import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { fetchLeaves } from '../../services/leaveServices'
import { toISODate } from '../../services/dates'
import LeaveStatusBadge from './LeaveStatusBadge'
import { leaveTypeLabel } from '../../services/leaveServices'

const STATUSES = [
  { status: 'PENDING', label: 'Pending', className: 'text-warning' },
  { status: 'APPROVED', label: 'Approved', className: 'text-success' },
  { status: 'REJECTED', label: 'Rejected', className: 'text-danger' },
]

const EmployeeDashboard = () => {
  const [leaves, setLeaves] = useState([])
  const [error, setError] = useState(null)
  const fullName = localStorage.getItem('fullname')

  useEffect(() => {
    fetchLeaves()
      .then(setLeaves)
      .catch(() => setError('Failed to load your leave requests.'))
  }, [])

  const today = toISODate(new Date())
  const upcoming = leaves
    .filter((leave) => leave.end_date >= today && leave.status !== 'REJECTED' && leave.status !== 'CANCELLED')
    .sort((a, b) => a.start_date.localeCompare(b.start_date))

  return (
    <div className="container mt-4">
      <h1>Hello, {fullName || 'there'}</h1>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row my-4">
        {STATUSES.map(({ status, label, className }) => (
          <div className="col-md-4 mb-3" key={status}>
            <MDBCard className="shadow-sm">
              <MDBCardBody className="text-center">
                <div className={`display-6 fw-bold ${className}`}>
                  {leaves.filter((leave) => leave.status === status).length}
                </div>
                <div>{label} leave requests</div>
              </MDBCardBody>
            </MDBCard>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 className="mb-0">Upcoming Leave</h3>
        <Link to="/employee/leave_requests" className="btn btn-primary btn-sm">Manage leave requests</Link>
      </div>
      <ul className="list-group">
        {upcoming.length > 0 ? (
          upcoming.map((leave) => (
            <li key={leave.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>
                <strong>{leaveTypeLabel(leave.leave_type)}</strong>: {leave.start_date} to {leave.end_date}
              </span>
              <LeaveStatusBadge status={leave.status} />
            </li>
          ))
        ) : (
          <li className="list-group-item text-muted">No upcoming leave.</li>
        )}
      </ul>
    </div>
  )
}

export default EmployeeDashboard
