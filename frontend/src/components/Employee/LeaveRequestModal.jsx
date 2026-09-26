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
import { applyLeave } from '../../services/leaveServices';
import { getErrorMessage } from '../../services/api';
import LeaveForm from './LeaveForm';

const emptyForm = { leave_type: '', start_date: '', end_date: '', reason: '' };

export default function LeaveRequestModal({ onCreated }) {
  const [basicModal, setBasicModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const toggleOpen = () => setBasicModal(!basicModal);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      toast.success('Leave request submitted.');
      setBasicModal(false);
      setFormData(emptyForm);
      onCreated?.();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to submit leave request.'));
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleOpen} color="primary">
        Request Leave
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <MDBModalHeader>
              <MDBModalTitle>Leave Request Form</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <LeaveForm formData={formData} onChange={handleChange} />
                <MDBBtn type="submit" color="secondary" className="w-100">
                  Submit Leave
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
