import React, { useState } from "react";
import useLeaves from "../../services/useLeaves";
import {applyLeave} from "../../services/leaveServices";
function Leaves() {
  const leaveTypes=[
    'SICK',
    'CASUAL',
  ]
  const { requestLeave, updateLeaveStatus, getAllLeaves } = useLeaves();
  const [formData, setFormData]=useState({
    'leave_type': '',
    'start_date':'',
    'end_date':'',
    'reason':''
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    await applyLeave(formData)
  }

  // const leaveRequests = getAllLeaves();

  return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
  
        {/* Leave Request Form */}
        <form onSubmit={handleSubmit} className="mb-6">
        <select
          name="leave_type"
          value={formData.leave_type}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full"
        >
          <option value="">Select Leave Type</option>
          {leaveTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
            className="border rounded p-2 my-2"
            rows="3"
            required
          />
          <button type="submit" className="bg-blue-600 text-white w-full">Submit Leave</button>
        </form>
  
        {/* Leave Requests Table */}
        {/* <div className="border rounded p-4">
          <h3 className="text-lg font-semibold mb-3">Leave Requests</h3>
          {leaves.length > 0 ? (
            <ul>
              {leaves.map((leave) => (
                <li key={leave.id} className="border-b py-2">
                  {leave.leave_type} ({leave.status})
                </li>
              ))}
            </ul>
          ) : (
            <p>No leave requests found.</p>
          )}
        </div> */}
      </div>
  
  );
}

export default Leaves;
