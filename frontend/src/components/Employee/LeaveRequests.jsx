import React from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

// Leave Requests Table Component
export const LeaveRequests = ({ leaves }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Leave Type</th>
          <th scope="col">Start Date</th>
          <th scope="col">End Date</th>
          <th scope="col">Reason</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {(leaves?.length > 0) ? (
          leaves.map((leave) => (
            <tr key={leave.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={leave.userImage || 'https://mdbootstrap.com/img/new/avatars/8.jpg'} // Default image if none provided
                    alt=""
                    style={{ width: '45px', height: '45px' }}
                    className="rounded-circle"
                  />
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{leave.userName}</p>
                  </div>
                </div>
              </td>
              <td>{leave.userEmail}</td>
              <td>{leave.leave_type}</td>
              <td>{new Date(leave.start_date).toLocaleDateString()}</td>
              <td>{new Date(leave.end_date).toLocaleDateString()}</td>
              <td>{leave.reason}</td>
              <td>
                <MDBBadge color={leave.status === "Approved" ? 'success' : leave.status === "Pending" ? 'warning' : 'danger'} pill>
                  {leave.status}
                </MDBBadge>
              </td>
              <td>
                <MDBBtn color="link" rounded size="sm">
                  Edit
                </MDBBtn>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center">
              No leave requests available
            </td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
};
