import React, { useEffect, useState } from 'react';
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

import { fetchEmployees } from '../services/employeeServices';
import { createDepartment } from '../services/departments';

export function CreateDepartmentModal() {
  const [basicModal, setBasicModal] = useState(false);
  const [Managers,setManagers]=useState([])
  const toggleOpen = () => setBasicModal(!basicModal);

  const [formData, setFormData] = useState({
    department_id: '',
    department_name: '',
    manager: '',
  });
  
  useEffect(()=>{
    const getManagers= async () =>{
        try{
            const data= await fetchEmployees()
            const filteredManager= data.filter((employee)=> employee.user.role=='Manager')
            console.log(filteredManager)
            setManagers(filteredManager)
        }
        catch(err){
            console.log(err)
        }
        
    }
    getManagers()
  }, [])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createDepartment(formData);
    console.log(formData)
    setBasicModal(false); // Close the modal after successful submission
    setFormData({ department_id: '', department_name: '', manager: ''});
    // window.location.reload()
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
                {/* Manager Dropdown */}
                <div className="mb-4 w-100">
                  <label htmlFor="manager">Select Manager</label>
                  <select
                    id="manager"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="">Select Manager</option>
                    {Managers.map((manager) => (
                      <option key={manager.id} value={manager.id}>
                        {manager.first_name} {manager.last_name}: <b>{manager.department}</b>
                      </option>
                      
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="mb-4 w-100">
                  <label htmlFor="department_name">Department Name</label>
                  <MDBInput
                    type="text"
                    name="department_name"
                    value={formData.department_name}
                    onChange={handleChange}
                    className="mb-4"
                    required
                  />
                </div>

                {/* End Date */}
                <div className="mb-4 w-100">
                  <label htmlFor="department_id">Department ID</label>
                  <MDBInput
                    type="text"
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    className="mb-4"
                    required
                  />
                </div>

                
                {/* Submit Button */}
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
