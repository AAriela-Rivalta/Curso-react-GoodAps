import axios, { type AxiosInstance } from "axios";
import { API_BASE_URL } from '../config';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR DE REQUEST
//antes de que salga cualquier peticion, revisa si hay un "token"
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// INTERCEPTOR DE RESPONSE
api.interceptors.response.use(
  (response) => {
    console.log(response);

    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token inválido o expirado");
    }

    return Promise.reject(error);
  }
);