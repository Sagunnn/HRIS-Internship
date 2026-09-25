import axios from "axios";

// Defaults to a same-origin path: Vite (dev) and nginx (Docker) proxy /api to Django.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // An expired or invalid token: clear the session and send the user back to login.
    const isLoginRequest = error.config?.url?.startsWith("/token/");
    if (error.response?.status === 401 && !isLoginRequest && localStorage.getItem("access_token")) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Turns a DRF error response into a readable message.
export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  const data = error?.response?.data;
  if (!data) return error?.message || fallback;
  if (typeof data === "string") return fallback;
  if (data.detail) return data.detail;
  return Object.entries(data)
    .map(([field, messages]) => `${field}: ${[].concat(messages).join(" ")}`)
    .join("\n");
};

export default api;
