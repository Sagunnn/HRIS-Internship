import api from "./api";

export const fetchUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const updateUser = async (id, updatedData) => {
  const response = await api.patch(`/users/${id}/`, updatedData);
  return response.data;
};

export const deleteUserMain = async (id) => {
  await api.delete(`/users/${id}/`);
};
