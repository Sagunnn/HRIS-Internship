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
import { updateLeaveDetails } from '../../services/leaveServices'; // Assuming an update function

const UpdateLeaveModal = ({ leave }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [formData, setFormData] = useState({
    leave_type: leave?.leave_type || '',
    start_date: leave?.start_date || '',
    end_date: leave?.end_date || '',
    reason: leave?.reason || '',
  });

  const toggleOpen = () => setBasicModal(!basicModal);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    console.log(formData)
    try {
      await updateLeaveDetails(leave.id, formData); // Call API to update
      setBasicModal(false); // Close modal after saving
    } catch (error) {
      console.error('Error updating leave details:', error);
      alert('Failed to update leave details');
    }
  };

  const leaveTypes = [
    'SICK',
    'CASUAL',
    'UNPAID',
    'PAID',
  ];

  return (
    <>
      <MDBBtn onClick={toggleOpen} color="primary">
        Edit Leave
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%', marginLeft: '170px', marginTop: '50px' }}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Leave Details</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <div className="d-flex flex-column align-items-center w-100">
                {/* Leave Type */}
                <div className="mb-4 w-100">
                  <label htmlFor="leave_type" className="fw-bold text-start d-block">Leave Type</label>
                  <select
                    id="leave_type"
                    name="leave_type"
                    value={formData.leave_type}  // Bind to formData
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
                  <label htmlFor="start_date" className="fw-bold text-start d-block">Start Date</label>
                  <MDBInput
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}  // Bind to formData
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* End Date */}
                <div className="mb-4 w-100">
                  <label htmlFor="end_date" className="fw-bold text-start d-block">End Date</label>
                  <MDBInput
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}  // Bind to formData
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                {/* Reason */}
                <div className="mb-4 w-100">
                  <label htmlFor="reason" className="fw-bold text-start d-block">Reason</label>
                  <MDBTextArea
                    id="reason"
                    name="reason"
                    value={formData.reason}  // Bind to formData
                    onChange={handleChange}
                    rows="4"
                    className="form-control"
                  />
                </div>

                {/* Save Button */}
                <MDBBtn color="primary" className="w-100 fw-bold" onClick={handleSave}>
                  Save Changes
                </MDBBtn>
              </div>
            </MDBModalBody>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default UpdateLeaveModal;
