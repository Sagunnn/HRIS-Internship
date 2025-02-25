import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import { fetchDepartments } from '../../../services/departments';
import { createEmployee } from '../../../services/employeeServices';

const steps = [
  { label: 'Personal Information', fields: [
      { name: 'first_name', label: 'First Name', type: 'text' },
      { name: 'middle_name', label: 'Middle Name', type: 'text' },
      { name: 'last_name', label: 'Last Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'contact_number', label: 'Phone Number', type: 'tel' },
      { name: 'address', label: 'Address', type: 'text' },
    ] },
  { label: 'Account Details', fields: [
      { name: 'username', label: 'Username', type: 'text' },
      { name: 'password', label: 'Password', type: 'password' },
      { name: 'confirm_password', label: 'Confirm Password', type: 'password' },
    ] },
  { label: 'Department Selection', fields: [
      { name: 'department', label: 'Department', type: 'select' },
    ] },
  { label: 'Profile Picture & Role', fields: [
      { name: 'profile_picture', label: 'Profile Picture', type: 'file' },
      { name: 'is_staff', label: 'Is Staff', type: 'checkbox' },
    ] },
];

export default function UserRegistrationStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    user: { username: '', email: '', profile_picture: null, is_staff: false, password: '', confirm_password: '' },
    department: '',
    contact_number: '',
    address: '',
    first_name: '',
    middle_name: '',
    last_name: '',
  });

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    getDepartment();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      user: { ...prev.user, [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value },
      [name]: name in prev.user ? prev[name] : value,
    }));
  };

  const handleSubmit = async () => {
    if (formData.user.password !== formData.user.confirm_password) {
      alert("Passwords do not match!");
      return;
    }
  
    const dataToSend = {
      user: {
        username: formData.user.username,
        email: formData.user.email,
        is_staff: formData.user.is_staff,
        password: formData.user.password,
        confirm_password: formData.user.confirm_password,
      },
      department: formData.department,
      contact_number: formData.contact_number,
      address: formData.address,
      first_name: formData.first_name,
      middle_name: formData.middle_name || '',
      last_name: formData.last_name,
    };
  
    console.log("📌 JSON Payload:", JSON.stringify(dataToSend, null, 2));
  
    try {
      const response = await createEmployee(dataToSend);
      console.log("✅ Success:", response.data);
      alert("User registered successfully!");
    } catch (error) {
      console.error("❌ Error submitting form:", error);
  
      if (error.response) {
        // Handle 400, 403, or other backend errors
        console.log("🔍 Response Data:", error.response.data);
        console.log("🔍 Response Status:", error.response.status);
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("🚨 No response received:", error.request);
        alert("Error: No response from server. Check if backend is running.");
      } else {
        // Any other errors (network issue, CORS, etc.)
        console.error("🛑 Request setup error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };
    
  

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
            {step.fields.map((field) => (
              field.type === 'select' ? (
                <TextField
                  key={field.name}
                  select
                  fullWidth
                  margin="normal"
                  name={field.name}
                  label={field.label}
                  value={formData.department}
                  onChange={handleChange}
                >
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <MenuItem key={dept.id} value={dept.department_name}>
                        {dept.department_name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No departments available</MenuItem>
                  )}
                </TextField>
              ) : (
                <TextField
                  key={field.name}
                  fullWidth
                  margin="normal"
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  value={formData.user[field.name] || formData[field.name] || ''}
                  onChange={handleChange}
                />
              )
            ))}

              <Box sx={{ mb: 2 }}>
                <Button variant="contained" onClick={index === steps.length - 1 ? handleSubmit : () => setActiveStep(prev => prev + 1)}>
                  {index === steps.length - 1 ? 'Submit' : 'Continue'}
                </Button>
                <Button disabled={index === 0} onClick={() => setActiveStep(prev => prev - 1)}>Back</Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
