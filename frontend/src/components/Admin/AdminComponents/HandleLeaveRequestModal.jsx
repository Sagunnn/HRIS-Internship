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
import { updateLeaveStatus } from '../../../services/leaveServices';

const HandleLeaveRequestModal = ({ leave, handleApproval }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [status, setStatus] = useState(leave?.status || 'PENDING');

  const toggleOpen = () => setBasicModal(!basicModal);

  const handleSave = async () => {
    try {
      await updateLeaveStatus(leave.id, status);
      setBasicModal(false); // Close modal after saving
    } catch (error) {
      console.error('Error updating leave status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleOpen} color="primary">
        View Leave Details
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%', marginLeft: '170px', marginTop: '50px' }}>
            <MDBModalHeader>
              <MDBModalTitle>Leave Details</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
                <div className="d-flex flex-column align-items-center w-100">
                    {/* Leave Type */}
                    <div className="mb-4 w-100">
                    <label htmlFor="leave_type" className="fw-bold text-start d-block">Leave Type</label>
                    <MDBInput type="text" id="leave_type" value={leave?.leave_type || ''} readOnly className="form-control" />
                    </div>

                    {/* Start Date */}
                    <div className="mb-4 w-100">
                    <label htmlFor="start_date" className="fw-bold text-start d-block">Start Date</label>
                    <MDBInput type="date" id="start_date" value={leave?.start_date || ''} readOnly className="form-control" />
                    </div>

                    {/* End Date */}
                    <div className="mb-4 w-100">
                    <label htmlFor="end_date" className="fw-bold text-start d-block">End Date</label>
                    <MDBInput type="date" id="end_date" value={leave?.end_date || ''} readOnly className="form-control" />
                    </div>

                    {/* Reason */}
                    <div className="mb-4 w-100">
                    <label htmlFor="reason" className="fw-bold text-start d-block">Reason</label>
                    <MDBTextArea id="reason" value={leave?.reason || ''} readOnly rows="4" className="form-control" />
                    </div>

                    {/* Status Dropdown */}
                    <div className="mb-4 w-100">
                    <label htmlFor="status" className="fw-bold text-start d-block">Leave Status</label>
                    <select id="status" className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                    </div>

                    {/* Save Button */}
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
