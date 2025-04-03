import express from "express";
import {
  delete_Reservation,
  get_AllReservations,
  get_ApprovedReservations,
  reservationApproval,
  reservationRejection,
} from "../Controllers/AdminController.js";
import { verifyAdmin } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

// router.post("/approve", reservationApproval);

// Uncomment the line below to use verifyAdmin middleware for the reservation approval route
router.post("/approve/:rId", verifyAdmin, reservationApproval);
router.put("/reject/:rId", verifyAdmin, reservationRejection);
router.get("/allReservations", verifyAdmin, get_AllReservations);
router.get("/allHallInfo", verifyAdmin, get_ApprovedReservations);
router.delete("/deleteReservation/:rId", verifyAdmin, delete_Reservation);

export default router;
