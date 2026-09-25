import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import CreateUserForm from './Admin/AdminComponents/CreateUserForm';
import EmployeeDirectory from './EmployeeDirectory';

// Admin view: employee directory with edit actions plus the registration form
const UserRegistration = () => {
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <div className="w-100">
      <ToastContainer />
      <EmployeeDirectory editable reloadKey={reloadKey} />
      <div className="px-4 mb-5">
        <CreateUserForm onCreated={() => setReloadKey((key) => key + 1)} />
      </div>
    </div>
  );
};

export default UserRegistration;
