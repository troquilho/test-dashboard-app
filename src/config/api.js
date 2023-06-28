import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: 'http://146.190.142.174:3000/api'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;