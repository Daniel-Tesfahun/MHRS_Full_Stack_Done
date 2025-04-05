import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const reserveHall = (formData) =>
  API.post("/api/user/reservation", formData);
