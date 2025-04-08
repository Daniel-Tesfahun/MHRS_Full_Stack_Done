import express from "express";
import { bookReservation } from "../Controllers/ReservationController.js";
import { get_ApprovedReservations } from "../Controllers/AdminController.js";
import { get_AllHallDetails } from "../Controllers/HallDetailController.js";

const router = express.Router();

router.post("/reservation", bookReservation);
router.get("/allHallInfo", get_ApprovedReservations);
router.get("/getAllHallDetails", get_AllHallDetails);

export default router;
