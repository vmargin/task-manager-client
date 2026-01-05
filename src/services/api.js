import axios from 'axios';

const API_URL = "https://task-manager-api-7po6.onrender.com";
const CLIENT_URL = "https://task-manager-client-ivory-kappa.vercel.app/";

const api = axios.create({
  baseURL: API_URL,
});

// This automatically attaches your JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;