import express from "express";
import { bookReservation } from "../Controllers/ReservationController.js";

const router = express.Router();

router.post("/reservation", bookReservation);

export default router;
