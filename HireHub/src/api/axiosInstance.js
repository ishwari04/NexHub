import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Adjust as needed
  withCredentials: true, // ✅ Ensures cookies (JWT) are sent
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Get token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token
  }
  return config;
});

export default API;
