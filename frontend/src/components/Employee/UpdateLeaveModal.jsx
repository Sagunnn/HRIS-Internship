import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { updateLeaveDetails } from '../../services/leaveServices';
import { getErrorMessage } from '../../services/api';
import LeaveForm from './LeaveForm';

const toFormData = (leave) => ({
  leave_type: leave.leave_type,
  start_date: leave.start_date,
  end_date: leave.end_date,
  reason: leave.reason,
});

const UpdateLeaveModal = ({ leave, onSaved }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [formData, setFormData] = useState(toFormData(leave));

  const open = () => {
    setFormData(toFormData(leave));
    setBasicModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateLeaveDetails(leave.id, formData);
      toast.success('Leave request updated.');
      setBasicModal(false);
      onSaved?.();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update leave details.'));
    }
  };

  return (
    <>
      <MDBBtn onClick={open} color="primary" size="sm" disabled={leave.status !== 'PENDING'}>
        Edit
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Leave Details</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSave} className="d-flex flex-column align-items-center w-100">
                <LeaveForm formData={formData} onChange={handleChange} />
                <MDBBtn type="submit" color="primary" className="w-100 fw-bold">
                  Save Changes
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UpdateLeaveModal;
