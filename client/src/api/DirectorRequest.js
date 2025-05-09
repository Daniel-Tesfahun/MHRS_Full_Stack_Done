import apiClient from "./ApiIntercepter";

export const addNewAdmin = (formData) =>
  apiClient.post("api/director/register", formData);

export const updateAdmin = (aId, formData) =>
  apiClient.put(`/api/director/updateAdmin/${aId}`, formData);

export const deleteAdmin = (aId) =>
  apiClient.delete(`/api/director/deleteAdmin/${aId}`);

export const getAllAdmins = () => apiClient.get("api/director/getAllAdmins");
