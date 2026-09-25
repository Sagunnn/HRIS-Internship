import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { updateLeaveStatus } from '../../../services/leaveServices';
import { getErrorMessage } from '../../../services/api';
import { leaveTypeLabel } from '../../../services/leaveServices';

const HandleLeaveRequestModal = ({ leave, onUpdated }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [status, setStatus] = useState(leave.status);

  const open = () => {
    setStatus(leave.status);
    setBasicModal(true);
  };

  const handleSave = async () => {
    try {
      await updateLeaveStatus(leave.id, status);
      setBasicModal(false);
      toast.success('Status updated.');
      onUpdated?.();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update status.'));
    }
  };

  const employeeName = `${leave.employee.first_name} ${leave.employee.last_name}`;

  return (
    <>
      <MDBBtn onClick={open} color="primary" size="sm">
        Review
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <MDBModalHeader>
              <MDBModalTitle>Leave Details: {employeeName}</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <div className="d-flex flex-column align-items-center w-100">
                <div className="mb-4 w-100">
                  <label htmlFor="leave_type" className="fw-bold text-start d-block">Leave Type</label>
                  <MDBInput type="text" id="leave_type" value={leaveTypeLabel(leave.leave_type)} readOnly />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="start_date" className="fw-bold text-start d-block">Start Date</label>
                  <MDBInput type="date" id="start_date" value={leave.start_date} readOnly />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="end_date" className="fw-bold text-start d-block">End Date</label>
                  <MDBInput type="date" id="end_date" value={leave.end_date} readOnly />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="reason" className="fw-bold text-start d-block">Reason</label>
                  <MDBTextArea id="reason" value={leave.reason} readOnly rows={4} />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="status" className="fw-bold text-start d-block">Leave Status</label>
                  <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>

                <MDBBtn color="primary" className="w-100 fw-bold" onClick={handleSave}>
                  Save
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default HandleLeaveRequestModal;
