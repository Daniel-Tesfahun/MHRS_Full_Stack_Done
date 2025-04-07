import axios from "axios";
import apiClient from "./ApiIntercepter";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (formData) => API.post("/api/authAdmin/login", formData);

export const getAdminById = (aId) =>
  apiClient.get(`/api/admin/getAdmin/${aId}`);

export const addNewHall = (formData) =>
  apiClient.post("/api/admin/addHallDetails", formData);
