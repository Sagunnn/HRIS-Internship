import React, { useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBInput } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { updateEmployee } from '../services/employeeServices';
import { fetchDepartments } from '../services/departments';
import { getErrorMessage } from '../services/api';

const EDITABLE_FIELDS = [
  { name: 'first_name', label: 'First Name' },
  { name: 'middle_name', label: 'Middle Name' },
  { name: 'last_name', label: 'Last Name' },
  { name: 'contact_number', label: 'Contact Number' },
  { name: 'address', label: 'Address' },
];

const toFormData = (employee) => ({
  first_name: employee.first_name || '',
  middle_name: employee.middle_name || '',
  last_name: employee.last_name || '',
  department: employee.department || '',
  contact_number: employee.contact_number || '',
  address: employee.address || '',
});

const EmployeeEditModal = ({ employee, onSaved }) => {
  const [basicModal, setBasicModal] = useState(false);
  const [employeeData, setEmployeeData] = useState(toFormData(employee));
  const [departments, setDepartments] = useState([]);

  const open = () => {
    setEmployeeData(toFormData(employee));
    setBasicModal(true);
    fetchDepartments()
      .then(setDepartments)
      .catch(() => toast.error('Failed to load departments.'));
  };

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only send the fields that changed
    const initialData = toFormData(employee);
    const updatedData = Object.fromEntries(
      Object.entries(employeeData).filter(([key, value]) => value !== initialData[key])
    );
    if (updatedData.department === '') updatedData.department = null;

    try {
      await updateEmployee(employee.id, updatedData);
      toast.success('Employee updated.');
      setBasicModal(false);
      onSaved?.();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to update employee data.'));
    }
  };

  return (
    <>
      <button onClick={open} className="btn btn-primary" title="Edit employee">
        <span className="material-symbols-outlined">edit</span>
      </button>

      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent className="p-4" style={{ maxWidth: '600px', width: '100%' }}>
            <MDBModalHeader>
              <MDBModalTitle>Edit Employee</MDBModalTitle>
              <MDBBtn className="btn-close" color="none" onClick={() => setBasicModal(false)}></MDBBtn>
            </MDBModalHeader>

            <MDBModalBody>
              <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center w-100">
                {EDITABLE_FIELDS.map(({ name, label }) => (
                  <div className="mb-4 w-100" key={name}>
                    <label htmlFor={name} className="fw-bold text-start d-block">{label}</label>
                    <MDBInput id={name} name={name} value={employeeData[name]} onChange={handleChange} />
                  </div>
                ))}

                <div className="mb-4 w-100">
                  <label htmlFor="department" className="fw-bold text-start d-block">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={employeeData.department}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Unassigned</option>
                    {/* Keep the current value selectable while the list loads */}
                    {employeeData.department && !departments.some((d) => d.department_name === employeeData.department) && (
                      <option value={employeeData.department}>{employeeData.department}</option>
                    )}
                    {departments.map((dept) => (
                      <option key={dept.department_id} value={dept.department_name}>{dept.department_name}</option>
                    ))}
                  </select>
                </div>

                {/* Account details are managed from the Users page */}
                <div className="mb-4 w-100">
                  <label className="fw-bold text-start d-block">Username / Email</label>
                  <MDBInput value={`${employee.user.username} / ${employee.user.email}`} disabled />
                </div>

                <MDBBtn type="submit" color="primary" className="w-100 fw-bold">
                  Save Changes
                </MDBBtn>
              </form>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setBasicModal(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default EmployeeEditModal;
