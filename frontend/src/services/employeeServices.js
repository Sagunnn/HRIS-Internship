import api from "./api";

export const fetchEmployees = async () => {
  const response = await api.get("/register-employee/list/");
  return response.data;
};

export const fetchMyProfile = async () => {
  const response = await api.get("/register-employee/list/me/");
  return response.data;
};

// formData is a FormData instance so the profile picture can be uploaded
export const createEmployee = async (formData) => {
  const response = await api.post("/register-employee/", formData);
  return response.data;
};

export const updateEmployee = async (id, data) => {
  const response = await api.patch(`/register-employee/list/${id}/`, data);
  return response.data;
};
