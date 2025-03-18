import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
} from 'mdb-react-ui-kit';
import { applyLeave } from "../../services/leaveServices";

export default function LeaveRequestModal() {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);

  const [formData, setFormData] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
  });

  const leaveTypes = [
    'SICK',
    'CASUAL',
    'UNPAID',
    'PAID',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    applyLeave(formData);
    setBasicModal(false); // Close the modal after successful submission
    setFormData({ leave_type: '', start_date: '', end_date: '', reason: '' });
    
  };

  return (
    <>
      <MDBBtn onClick={toggleOpen} color="primary">
        Request Leave
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%',marginLeft: '170px',marginTop:'50px' }}>
            <MDBModalHeader>
              <MDBModalTitle>Leave Request Form</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                {/* Leave Type Dropdown */}
                <div className="mb-4 w-100">
                  <label htmlFor="leave_type">Select Leave Type</label>
                  <select
                    id="leave_type"
                    name="leave_type"
                    value={formData.leave_type}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Leave Type</option>
                    {leaveTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="mb-4 w-100">
                  <label htmlFor="start_date">Start Date</label>
                  <MDBInput
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="mb-4"
                    required
                  />
                </div>

                {/* End Date */}
                <div className="mb-4 w-100">
                  <label htmlFor="end_date">End Date</label>
                  <MDBInput
                    type="date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    className="mb-4"
                    required
                  />
                </div>

                {/* Reason */}
                <div className="mb-4 w-100">
                  <label htmlFor="reason">Leave Reason</label>
                  <MDBTextArea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Reason for leave"
                    rows="4"
                    className="mb-4"
                    required
                  />
                </div>

                {/* Submit Button */}
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
