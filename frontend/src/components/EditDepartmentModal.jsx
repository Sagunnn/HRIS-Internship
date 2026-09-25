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

import { editDepartmentMain } from '../services/departments';
import { getErrorMessage } from '../services/api';
import ManagerOptions from './ManagerOptions';

export function EditDepartmentModal({ departmentData, managers, onSaved }) {
  const [basicModal, setBasicModal] = useState(false);
  const [formData, setFormData] = useState({});

  const open = () => {
    setFormData({
      department_name: departmentData.department_name,
      manager: departmentData.manager ?? '',
    });
    setBasicModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editDepartmentMain(departmentData.department_id, { ...formData, manager: formData.manager || null });
      toast.success('Department updated.');
      setBasicModal(false);
      onSaved?.();
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to update department.'));
    }
  };

  return (
    <>
      <button onClick={open} className="btn btn-primary" title="Edit department">
        <span className="material-symbols-outlined">edit</span>
      </button>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Department</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="mb-4 w-100">
                  <label htmlFor="department_name">Department Name</label>
                  <MDBInput
                    id="department_name"
                    type="text"
                    name="department_name"
                    value={formData.department_name || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="department_id">Department ID</label>
                  <MDBInput id="department_id" type="text" value={departmentData.department_id} disabled />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="manager">Manager</label>
                  <select id="manager" name="manager" value={formData.manager ?? ''} onChange={handleChange} className="form-control">
                    <ManagerOptions managers={managers} />
                  </select>
                </div>

                <MDBBtn type="submit" color="secondary" className="w-100">
                  Update Department
                </MDBBtn>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
