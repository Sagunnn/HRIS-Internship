import React from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

// Leave Requests Table Component
export const LeaveRequests = ({ leaves }) => {
  return (
    <MDBTable align="middle">
      <MDBTableHead>
        <tr>
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
