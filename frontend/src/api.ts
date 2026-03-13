import axios from "axios";

// Use relative path so Vite proxies to backend (avoids CORS)
const baseURL = '/api/v1';
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
