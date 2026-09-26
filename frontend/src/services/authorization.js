import { jwtDecode } from "jwt-decode";
import api from "./api";

export const loginUser = async (loginData) => {
  const response = await api.post("/token/", loginData);
  const { access, refresh } = response.data;
  const decodedToken = jwtDecode(access);

  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  localStorage.setItem("role", decodedToken.role);
  localStorage.setItem("fullname", decodedToken.full_name);
  localStorage.setItem("is_staff", decodedToken.is_staff ? "true" : "false");

  return decodedToken;
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
  localStorage.removeItem("fullname");
  localStorage.removeItem("is_staff");
};

// Mirrors the backend's IsHRAdmin permission.
export const isAdmin = () =>
  localStorage.getItem("role") === "Admin" || localStorage.getItem("is_staff") === "true";

export const getHomePath = () => (isAdmin() ? "/admin" : "/employee");
