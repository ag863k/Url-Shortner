import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to include token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("JWT_TOKEN");
        if (token) {
            try {
                const parsedToken = JSON.parse(token);
                config.headers.Authorization = `Bearer ${parsedToken}`;
            } catch (error) {
                localStorage.removeItem("JWT_TOKEN"); // Clean invalid token
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle errors faster
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error("Request timeout - backend might be slow");
        }
        return Promise.reject(error);
    }
);

export default api;