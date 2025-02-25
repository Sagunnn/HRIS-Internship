import { useState } from "react";
import axios from "axios";
import { getAuthHeaders } from "./authorization";
const API_BASE_URL = "http://127.0.0.1:8000/api/v1";
function useLeaves() {
  const [leaves, setLeaves] = useState([]);

  // Add a leave request
  const requestLeave = (leaveRequest) => {
    setLeaves((prevLeaves) => [...prevLeaves, leaveRequest]);
  };

  // Approve or Reject a leave request
  const updateLeaveStatus = (id, status) => {
    setLeaves((prevLeaves) =>
      prevLeaves.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  // Fetch all leave requests (you can replace this with an API call if needed)
  const getAllLeaves = () => {
    return leaves;
  };

  return {
    requestLeave,
    updateLeaveStatus,
    getAllLeaves,
  };
}

export default useLeaves;
