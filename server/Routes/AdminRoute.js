import express from "express";
import {
  delete_Reservation,
  get_AdminById,
  get_AllReservations,
  get_ApprovedReservations,
  reservationApproval,
  reservationRejection,
} from "../Controllers/AdminController.js";
import { verifyAdmin } from "../Middleware/AuthMiddleware.js";

import {
  add_HallDetails,
  delete_HallDetails,
  get_AllHallDetails,
  update_HallDetails,
} from "../Controllers/HallDetailController.js";

const router = express.Router();

// For HallDetails
router.post("/addHallDetails", verifyAdmin, add_HallDetails);
router.put("/updateHallDetails/:hId", verifyAdmin, update_HallDetails);
router.get("/getAllHallDetails", verifyAdmin, get_AllHallDetails);
router.delete("/deleteHallDetails/:hId", verifyAdmin, delete_HallDetails);

// router.post("/approve", reservationApproval);

// Uncomment the line below to use verifyAdmin middleware for the reservation approval route
router.post("/approve/:rId", verifyAdmin, reservationApproval);
router.put("/reject/:rId", verifyAdmin, reservationRejection);
router.get("/allReservations", verifyAdmin, get_AllReservations);
router.get("/allHallInfo", verifyAdmin, get_ApprovedReservations);
router.delete("/deleteReservation/:rId", verifyAdmin, delete_Reservation);
router.get("/getAdmin/:aId", verifyAdmin, get_AdminById);

export default router;
