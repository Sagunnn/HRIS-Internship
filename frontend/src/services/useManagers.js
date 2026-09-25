import { useEffect, useState } from 'react';
import { fetchEmployees } from './employeeServices';

// Employees with the Manager role, for the department manager dropdowns
export const useManagers = () => {
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    fetchEmployees()
      .then((data) => setManagers(data.filter((employee) => employee.user.role === 'Manager')))
      .catch((err) => console.error('Failed to load managers', err));
  }, []);

  return managers;
};
