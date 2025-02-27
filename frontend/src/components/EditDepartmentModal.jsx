import React from 'react';
import { MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const EditDepartmentModal = ({ showModal, setShowModal, department, handleInputChange, handleSaveClick, handleCancelClick }) => {
  // Conditional rendering to avoid errors when department is null or undefined
  if (!department) {
    return null; // If no department is provided, return nothing (modal won't render)
  }

  return (
    <MDBModal show={showModal} setShow={setShowModal} tabIndex="-1">
      <MDBModalHeader>
        <h5>Edit Department</h5>
      </MDBModalHeader>
      <MDBModalBody>
        <form>
          <MDBInput
            label="Department Name"
            type="text"
            name="department_name"
            value={department.department_name || ''}
            onChange={handleInputChange}
            className="mb-2"
          />
          <MDBInput
            label="Department ID"
            type="text"
            name="department_id"
            value={department.department_id || ''}
            onChange={handleInputChange}
            className="mb-2"
          />
          <MDBInput
            label="Manager Name"
            type="text"
            name="manager"
            value={department.manager || ''}
            onChange={handleInputChange}
            className="mb-2"
          />
          <MDBBtn color="success" onClick={handleSaveClick}>
            Save
          </MDBBtn>
          <MDBBtn color="danger" onClick={handleCancelClick} className="ms-2">
            Cancel
          </MDBBtn>
        </form>
      </MDBModalBody>
    </MDBModal>
  );
};

export default EditDepartmentModal;
