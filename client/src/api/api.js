import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your deployed backend URL or local http://localhost:5000/api
  withCredentials: true, // to handle auth tokens/cookies if needed
});

// attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
