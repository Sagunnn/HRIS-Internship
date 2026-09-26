import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { fetchLeaves } from "../../services/leaveServices";
import { getErrorMessage } from "../../services/api";
import { LeaveRequests } from "./LeaveRequests";

function Leaves() {
  const [leaves, setLeaves] = useState([]);

  const getLeaves = async () => {
    try {
      setLeaves(await fetchLeaves());
    } catch (err) {
      toast.error(getErrorMessage(err, "Failed to load leave requests."));
    }
  };

  useEffect(() => {
    getLeaves();
  }, []);

  return (
    <>
      <ToastContainer />
      <LeaveRequests leaves={leaves} onChange={getLeaves} />
    </>
  );
}

export default Leaves;
