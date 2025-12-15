import axios, { type AxiosInstance } from "axios";

import { API_BASE_URL } from '../config';

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});