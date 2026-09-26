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
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

import { createDepartment } from '../services/departments';
import { getErrorMessage } from '../services/api';
import ManagerOptions from './ManagerOptions';

const emptyForm = { department_id: '', department_name: '', manager: '' };

export function CreateDepartmentModal({ managers, onSaved }) {
  const [basicModal, setBasicModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const toggleOpen = () => setBasicModal(!basicModal);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDepartment({ ...formData, manager: formData.manager || null });
      toast.success('Department created.');
      setBasicModal(false);
      setFormData(emptyForm);
      onSaved?.();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to create department.'));
    }
  };

  return (
    <>
      <MDBBtn onClick={toggleOpen} color="primary">
        Create Department
      </MDBBtn>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <MDBModalHeader>
              <MDBModalTitle>Create Department</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-4 w-100">
                  <label htmlFor="department_name">Department Name</label>
                  <MDBInput
                    id="department_name"
                    type="text"
                    name="department_name"
                    value={formData.department_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="department_id">Department ID</label>
                  <MDBInput
                    id="department_id"
                    type="text"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    maxLength={20}
                    required
                  />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="manager">Manager</label>
                  <select id="manager" name="manager" value={formData.manager} onChange={handleChange} className="form-control">
                    <ManagerOptions managers={managers} />
                  </select>
                </div>

                <MDBBtn type="submit" color="secondary" className="w-100">
                  Create Department
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
