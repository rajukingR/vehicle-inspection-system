import axios from "axios";
import { API_URL } from "./Api_url";


// All API Endpoints in ONE place
export const API = {
  AUTH: {
    LOGIN: `${API_URL}/auth/signin`,
    REGISTER: `${API_URL}/auth/signup`,
    FORGOT_PASSWORD: `${API_URL}/auth/reset-password-link`,
    RESET_PASSWORD: `${API_URL}/auth/forgot-password`,
  },
};

// Axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
});
