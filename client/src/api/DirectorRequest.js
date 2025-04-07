import apiClient from "./ApiIntercepter";

export const addNewAdmin = (formData) =>
  apiClient.post("api/director/register", formData);
