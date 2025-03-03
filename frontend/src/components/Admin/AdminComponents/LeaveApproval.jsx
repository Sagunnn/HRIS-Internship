import React, { useEffect, useState } from 'react';
import { pendingApprovals, updateLeaveStatus } from '../../../services/leaveServices';

const LeaveApproval = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);
    const [filterStatus, setFilterStatus] = useState('ALL');

    useEffect(() => {
        getLeaves();
    }, []);

    const getLeaves = async () => {
        try {
            const data = await pendingApprovals();
            setLeaves(data);
            setFilteredLeaves(data); // Initially, show all leaves
        } catch (err) {
            console.error(err);
        }
    };

    const handleApproval = async (leaveId, status) => {
        try {
            await updateLeaveStatus(leaveId, status);
            setLeaves(leaves.filter(leave => leave.id !== leaveId)); // Remove from UI after update
            setFilteredLeaves(filteredLeaves.filter(leave => leave.id !== leaveId)); // Remove from filtered list
        } catch (err) {
            console.error('Error updating leave:', err);
        }
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (status === 'ALL') {
            setFilteredLeaves(leaves);
        } else {
            setFilteredLeaves(leaves.filter(leave => leave.status === status));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-primary mb-4">Leave Approvals</h2>

            <div className="mb-4 text-center">
                <button
                    className={`btn ${filterStatus === 'ALL' ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
                    onClick={() => handleFilterChange('ALL')}
                >
                    All
                </button>
                <button
                    className={`btn ${filterStatus === 'PENDING' ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
                    onClick={() => handleFilterChange('PENDING')}
                >
                    Pending
                </button>
                <button
                    className={`btn ${filterStatus === 'APPROVED' ? 'btn-primary' : 'btn-outline-secondary'} me-2`}
                    onClick={() => handleFilterChange('APPROVED')}
                >
                    Approved
                </button>
                <button
                    className={`btn ${filterStatus === 'REJECTED' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => handleFilterChange('REJECTED')}
                >
                    Rejected
                </button>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center shadow-lg">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>ID</th>
                            <th>Employee</th>
                            <th>Department</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length > 0 ? (
                            filteredLeaves.map((leave) => (
                                <tr key={leave.id}>
                                    <td>{leave.id}</td>
                                    <td>{leave.employee.first_name} {leave.employee.last_name}</td>
                                    <td>{leave.employee.department}</td>
                                    <td>{leave.leave_type}</td>
                                    <td>{leave.start_date}</td>
                                    <td>{leave.end_date}</td>
                                    <td>{leave.reason}</td>
                                    <td>
                                        <span className={`badge ${
                                            leave.status === 'PENDING' ? 'bg-light' :
                                            leave.status === 'APPROVED' ? 'bg-success' :
                                            'bg-danger'
                                        } text-dark`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td>
                                        {leave.status === 'PENDING' && (
                                            <>
                                                <button
                                                    className="btn btn-outline-success btn-sm me-2 px-3 fw-bold"
                                                    onClick={() => handleApproval(leave.id, "APPROVED")}
                                                >
                                                    ✔ Approve
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm px-3 fw-bold"
                                                    onClick={() => handleApproval(leave.id, "REJECTED")}
                                                >
                                                    ✖ Reject
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center text-muted fw-bold">No leave requests available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveApproval;
