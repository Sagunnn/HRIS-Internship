// import React, { useState } from 'react'
// import axios from 'axios'
// import { createUser } from '../services/users'
// const UserRegistration = () => {
//     const [formData,setFormData]=useState({
//         'username':'',
//         'email':'',
//         'profile_picture':null,
//         'is_staff':false,
//         'password':'',
//         'confirm_password':''
//     })
//     const [error,setError]=useState()
//     const handleChange=(e)=>{
//         setFormData({...formData,[e.target.name]:e.target.value})
//     }
//     const handleSubmit=(e)=>{
//       e.preventDefault()
//       console.log(formData)
//       createUser(formData)
//     }

//     const handleFileChange=(e)=>{
//       setFormData({...formData,[e.target.name]:e.target.files[0]})
//     }
//   return (
//     <form onSubmit={handleSubmit}>
//         <input type="text" name='username' onChange={handleChange} placeholder='Username'/><br/>
//         <input type="email" name="email" onChange={handleChange} placeholder='Email' /><br/>
//         <input type="file" name="profile_picture" onChange={handleFileChange} placeholder='image'/><br/>
//         <input type="checkbox" name="is_staff" /><label>Is Staff</label><br/>
//         <input type="password" name="password" onChange={handleChange} placeholder='Password' /><br/>
//         <input type="password" name="confirm_password" onChange={handleChange} placeholder='Confirm Password'/><br/>
//         <button type='submit'>Create</button>
//     </form>
//   )
// }

// export default UserRegistration

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthHeaders } from '../services/authorization';

const UserRegistration = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/register-employee/list/',{
      headers:getAuthHeaders()
    })
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      <div className="employee-list">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <div key={index} className="employee-card">
              <h3>{employee.first_name} {employee.middle_name} {employee.last_name}</h3>
              <p><strong>Username:</strong> {employee.user.username}</p>
              <p><strong>Email:</strong> {employee.user.email}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Contact:</strong> {employee.contact_number}</p>
              <p><strong>Address:</strong> {employee.address}</p>
            </div>
          ))
        ) : (
          <p>Loading employees...</p>
        )}
      </div>
    </div>
  );
};

export default UserRegistration;
