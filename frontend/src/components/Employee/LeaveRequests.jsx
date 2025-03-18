import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInput,
  MDBBadge,
} from "mdb-react-ui-kit";
import LeaveRequestModal from "./LeaveRequestModal";
import UpdateLeaveModal from "./UpdateLeaveModal";

export const LeaveRequests = ({ leaves }) => {
  const [filterQuery, setFilterQuery] = useState("");
  const [filteredLeaves, setFilteredLeaves] = useState(leaves);

  // Update filteredLeaves whenever the leaves prop changes
  useEffect(() => {
    setFilteredLeaves(leaves);
  }, [leaves]);

  // Filter function
  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    setFilterQuery(query);

    const filtered = leaves.filter(
      (leave) =>
        leave.leave_type.toLowerCase().includes(query) ||
        leave.reason.toLowerCase().includes(query) ||
        leave.status.toLowerCase().includes(query)
    );

    setFilteredLeaves(filtered);
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        minHeight: "100vh",
        width:"180%",
        
      }}
    >
      <div
        
      >
        <h2 className="mb-4 text-center text-primary">Leave Requests</h2>

        {/* Search bar for filtering */}
        <div
          className="mb-4"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
            padding: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            marginBottom: "20px",
           
          }}
        >
          <MDBInput
            type="text"
            label="Search by Leave Type, Reason or Status"
            value={filterQuery}
            onChange={handleFilter}
          />
        </div>

        <MDBTable
          align="middle"
          hover
          bordered
          responsive
          className="custom-table" // Apply custom class for more control
          style={{ width: '100%'}}
        >
          <MDBTableHead className="bg-primary text-white rounded-top">
            <tr>
              {/* Adjusted the width of "Leave Type" to 30% */}
              <th scope="col" style={{ width: "30%" }}>Leave Type</th>
              <th scope="col" style={{ width: "25%" }}>Start Date</th>
              <th scope="col" style={{ width: "15%" }}>End Date</th>
              <th scope="col" style={{ width: "15%" }}>Reason</th>
              <th scope="col" style={{ width: "15%" }}>Status</th>
              <th scope="col" style={{ width: "10%" }}>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody style={{ minHeight: "200px"}}>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.leave_type}</td>
                  <td>{new Date(leave.start_date).toLocaleDateString()}</td>
                  <td>{new Date(leave.end_date).toLocaleDateString()}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <MDBBadge
                      color={
                        leave.status === "APPROVED"
                          ? "success" // Green for Approved
                          : leave.status === "PENDING"
                          ? "secondary" // Grey for Pending
                          : leave.status === "REJECTED"
                          ? "danger" // Red for Rejected
                          : "primary"
                      }
                      pill
                    >
                      {leave.status}
                    </MDBBadge>
                  </td>
                  <td>
                    <UpdateLeaveModal leave={leave}/>
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
        <br/>
        <LeaveRequestModal />
      </div>
    </div>
  );
};
