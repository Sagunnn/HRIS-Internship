import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { pendingApprovals } from '../../../services/leaveServices';
import { getErrorMessage } from '../../../services/api';
import LeaveRequestModal from '../../Employee/LeaveRequestModal';
import LeaveStatusBadge from '../../Employee/LeaveStatusBadge';
import { leaveTypeLabel } from '../../../services/leaveServices';
import HandleLeaveRequestModal from './HandleLeaveRequestModal';

const FILTERS = ['ALL', 'PENDING', 'APPROVED', 'REJECTED'];

const LeaveApproval = () => {
    const [leaves, setLeaves] = useState([]);
    const [filterStatus, setFilterStatus] = useState('ALL');

    const getLeaves = async () => {
        try {
            setLeaves(await pendingApprovals()); // newest first, sorted by the API
        } catch (err) {
            toast.error(getErrorMessage(err, 'Failed to load leave requests.'));
        }
    };

    useEffect(() => {
        getLeaves();
    }, []);

    const filteredLeaves = filterStatus === 'ALL' ? leaves : leaves.filter((leave) => leave.status === filterStatus);

    return (
        <div className="p-4 w-100">
            <ToastContainer />
            <h2 className="text-center text-primary mb-4">Leave Approvals</h2>

            <div className="mb-4 d-flex justify-content-center gap-2">
                {FILTERS.map((status) => (
                    <button
                        key={status}
                        className={`btn ${filterStatus === status ? 'btn-primary' : 'btn-outline-secondary'}`}
                        onClick={() => setFilterStatus(status)}
                    >
                        {status.charAt(0) + status.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover text-center shadow-sm">
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
                                    <td>{leave.employee.department || 'Unassigned'}</td>
                                    <td>{leaveTypeLabel(leave.leave_type)}</td>
                                    <td>{leave.start_date}</td>
                                    <td>{leave.end_date}</td>
                                    <td>{leave.reason}</td>
                                    <td><LeaveStatusBadge status={leave.status} /></td>
                                    <td><HandleLeaveRequestModal leave={leave} onUpdated={getLeaves} /></td>
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
            <LeaveRequestModal onCreated={getLeaves} />
        </div>
    );
};

export default LeaveApproval;
