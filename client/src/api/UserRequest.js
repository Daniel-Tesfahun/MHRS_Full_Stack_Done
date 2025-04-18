import axios from "axios";
import apiClient from "./ApiIntercepter";

const API = axios.create({ baseURL: "https://server.mhrs.ethiopbytes.com" });

export const reserveHall = (formData) =>
  API.post("/api/user/reservation", formData);

export const getAllApprovedReservations = () =>
  apiClient.get("api/user/allHallInfo");

export const getAllHallDetails = () =>
  apiClient.get("/api/user/getAllHallDetails");
