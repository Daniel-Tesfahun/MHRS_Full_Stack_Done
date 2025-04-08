import express from "express";
import {
  delete_Reservation,
  get_AdminById,
  get_AllReservations,
  reservationApproval,
  reservationRejection,
} from "../Controllers/AdminController.js";
import { verifyAdmin } from "../Middleware/AuthMiddleware.js";

import {
  add_HallDetails,
  delete_HallDetails,
  get_SingleHallDetail,
  update_HallDetails,
} from "../Controllers/HallDetailController.js";

const router = express.Router();

// For HallDetails
router.post("/addHallDetails", verifyAdmin, add_HallDetails);
router.put("/updateHallDetails/:hId", verifyAdmin, update_HallDetails);
router.delete("/deleteHallDetails/:hId", verifyAdmin, delete_HallDetails);
router.get("/getSingleHall/:hId", verifyAdmin, get_SingleHallDetail);

// router.post("/approve", reservationApproval);

// Uncomment the line below to use verifyAdmin middleware for the reservation approval route
router.post("/approve/:rId", verifyAdmin, reservationApproval);
router.put("/reject/:rId", verifyAdmin, reservationRejection);
router.get("/allReservations", verifyAdmin, get_AllReservations);
router.delete("/deleteReservation/:rId", verifyAdmin, delete_Reservation);
router.get("/getAdmin/:aId", verifyAdmin, get_AdminById);

export default router;
