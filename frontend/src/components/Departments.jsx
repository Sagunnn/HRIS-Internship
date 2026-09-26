import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBContainer } from 'mdb-react-ui-kit';
import { toast, ToastContainer } from 'react-toastify';
import { fetchDepartments, deleteDepartmentMain } from '../services/departments';
import { getErrorMessage } from '../services/api';
import { isAdmin } from '../services/authorization';
import { CreateDepartmentModal } from './CreateDepartmentModal';
import { EditDepartmentModal } from './EditDepartmentModal';
import { useManagers } from '../services/useManagers';

const Departments = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const canEdit = isAdmin();
  const managers = useManagers();

  const getDepartments = async () => {
    try {
      setDepartmentData(await fetchDepartments());
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to load departments.'));
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const deleteDepartment = async (department) => {
    if (!window.confirm(`Delete the ${department.department_name} department?`)) return;
    try {
      await deleteDepartmentMain(department.department_id);
      setDepartmentData((prev) => prev.filter((dept) => dept.department_id !== department.department_id));
      toast.success('Department deleted.');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to delete department.'));
    }
  };

  return (
    <MDBContainer>
      <ToastContainer />
      <h2 className="mb-4 text-center text-primary rounded p-3">Departments</h2>

      <MDBTable align="middle" hover bordered responsive className="custom-table">
        <MDBTableHead className="bg-primary text-white rounded-top">
          <tr>
            <th>Department Name</th>
            <th>Department ID</th>
            <th>Manager</th>
            {canEdit && <th style={{ textAlign: 'center', verticalAlign: 'middle' }}>Actions</th>}
          </tr>
        </MDBTableHead>

        <MDBTableBody>
          {departmentData.length > 0 ? (
            departmentData.map((department) => (
              <tr key={department.department_id}>
                <td>{department.department_name}</td>
                <td>{department.department_id}</td>
                <td>{department.manager_name}</td>
                {canEdit && (
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <EditDepartmentModal departmentData={department} managers={managers} onSaved={getDepartments} />
                      <button className="btn btn-danger" onClick={() => deleteDepartment(department)}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={canEdit ? 4 : 3} className="text-center text-muted">No departments yet</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      {canEdit && <CreateDepartmentModal managers={managers} onSaved={getDepartments} />}
    </MDBContainer>
  );
};

export default Departments;
