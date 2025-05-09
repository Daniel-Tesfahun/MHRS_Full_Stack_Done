import axios from "axios";
import apiClient from "./ApiIntercepter";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const reserveHall = (formData) =>
  API.post("/api/user/reservation", formData);

export const getAllApprovedReservations = () =>
  apiClient.get("api/user/allHallInfo");

export const getAllHallDetails = () =>
  apiClient.get("/api/user/getAllHallDetails");
