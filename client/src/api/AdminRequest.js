import axios from "axios";
import apiClient from "./ApiIntercepter";

const API = axios.create({ baseURL: "https://server.mhrs.ethiopbytes.com" });

export const login = (formData) => API.post("/api/authAdmin/login", formData);

export const getAdminById = (aId) =>
  apiClient.get(`/api/admin/getAdmin/${aId}`);

export const addNewHall = (formData) =>
  apiClient.post("/api/admin/addHallDetails", formData);

export const getAllHalls = () => apiClient.get("api/admin/getAllHalls");

export const getHallById = (hId) =>
  apiClient.get(`api/admin/getSingleHall/${hId}`);

export const editHall = (hId, formData) =>
  apiClient.put(`/api/admin/updateHallDetails/${hId}`, formData);

export const deleteHall = (hId) =>
  apiClient.delete(`/api/admin/deleteHallDetails/${hId}`);

export const getAllReservations = () =>
  apiClient.get("/api/admin/allReservations");

export const approveReservation = (rId) =>
  apiClient.post(`/api/admin/approve/${rId}`);

export const rejectReservation = (rId) =>
  apiClient.put(`/api/admin/reject/${rId}`);
