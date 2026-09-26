import React, { useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBInput } from "mdb-react-ui-kit";
import LeaveRequestModal from "./LeaveRequestModal";
import UpdateLeaveModal from "./UpdateLeaveModal";
import LeaveStatusBadge from "./LeaveStatusBadge";
import { leaveTypeLabel } from "../../services/leaveServices";

export const LeaveRequests = ({ leaves, onChange }) => {
  const [filterQuery, setFilterQuery] = useState("");

  const query = filterQuery.toLowerCase();
  const filteredLeaves = leaves.filter((leave) =>
    [leave.leave_type, leaveTypeLabel(leave.leave_type), leave.reason, leave.status]
      .join(" ")
      .toLowerCase()
      .includes(query)
  );

  return (
    <div className="p-4 w-100">
      <h2 className="mb-4 text-center text-primary">Leave Requests</h2>

      <div className="mb-4 p-2 bg-white shadow-sm">
        <MDBInput
          type="text"
          label="Search by Leave Type, Reason or Status"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
        />
      </div>

      <MDBTable align="middle" hover bordered responsive className="custom-table">
        <MDBTableHead className="bg-primary text-white rounded-top">
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
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leaveTypeLabel(leave.leave_type)}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>
                  <LeaveStatusBadge status={leave.status} />
                </td>
                <td>
                  <UpdateLeaveModal leave={leave} onSaved={onChange} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No leave requests found
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      <LeaveRequestModal onCreated={onChange} />
    </div>
  );
};
