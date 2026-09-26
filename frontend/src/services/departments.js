import api from "./api";

export const fetchDepartments = async () => {
  const response = await api.get("/departments/");
  return response.data;
};

export const createDepartment = async (newDepartment) => {
  const response = await api.post("/departments/", newDepartment);
  return response.data;
};

export const deleteDepartmentMain = async (deptId) => {
  await api.delete(`/departments/${deptId}/`);
};

export const editDepartmentMain = async (id, data) => {
  const response = await api.patch(`/departments/${id}/`, data);
  return response.data;
};
