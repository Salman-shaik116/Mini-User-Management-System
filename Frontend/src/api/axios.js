import axios from "axios";

// this file is used to create an axios instance with a predefined base URL for API requests

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// the following interceptor adds the JWT token to the Authorization header of each request if it exists in localStorage




api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
