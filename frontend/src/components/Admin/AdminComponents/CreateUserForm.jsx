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
} from 'mdb-react-ui-kit';

import { createUser } from '../../../services/users';
import UserRegistrationStepper from './UserRegistrationStepper';
export default function CreateUserForm() {
  const [basicModal, setBasicModal] = useState(false);
  const toggleOpen = () => setBasicModal(!basicModal);
  const [formData,setFormData]=useState({
          'username':'',
          'email':'',
          'profile_picture':null,
          'is_staff':false,
          'password':'',
          'confirm_password':''
      })
      const [error,setError]=useState()
      const handleChange=(e)=>{
          setFormData({...formData,[e.target.name]:e.target.value})
      }
      const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
        createUser(formData)
      }
  
      const handleFileChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.files[0]})
      }
  return (
    <>
      <MDBBtn onClick={toggleOpen}>Add Employee</MDBBtn>
      <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
      <MDBModalDialog style={{ marginLeft: "500px" }}>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Employee Registration</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            {/* <form onSubmit={handleSubmit} id="employeeForm">
                <input type="text" name='username' onChange={handleChange} placeholder='Username'/><br/>
                <input type="email" name="email" onChange={handleChange} placeholder='Email' /><br/>
                <input type="file" name="profile_picture" onChange={handleFileChange} placeholder='image'/><br/>
                <input type="checkbox" name="is_staff" /><label>Is Staff</label><br/>
                <input type="password" name="password" onChange={handleChange} placeholder='Password' /><br/>
                <input type="password" name="confirm_password" onChange={handleChange} placeholder='Confirm Password'/><br/>
            </form> */}
            <UserRegistrationStepper/>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleOpen}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}