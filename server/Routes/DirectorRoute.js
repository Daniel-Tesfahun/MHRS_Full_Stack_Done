import express from "express";
import {
  delete_Admin,
  get_AllAdmins,
  register,
  updateAdmin,
} from "../Controllers/DirectorController.js";
import { verifyDirector } from "../Middleware/AuthMiddleware.js";
import {
  add_HallDetails,
  delete_HallDetails,
  get_AllHallDetails,
  update_HallDetails,
} from "../Controllers/HallDetailController.js";

const router = express.Router();

// For developers team
router.get("/getAllAdmins", get_AllAdmins);
router.post("/register", register);
router.put("/updateAdmin/:aId", updateAdmin);
router.delete("/deleteAdmin/:aId", delete_Admin);

// For HallDetails
router.post("/addHallDetails", verifyDirector, add_HallDetails);
router.put("/updateHallDetails/:hId", verifyDirector, update_HallDetails);
router.get("/getAllHallDetails", verifyDirector, get_AllHallDetails);
router.delete("/deleteHallDetails/:hId", verifyDirector, delete_HallDetails);

// Uncomment the following lines when testing from client application
// router.post("/register", verifyDirector, register);
// router.get("/getAllAdmins", verifyDirector, get_AllAdmins);

export default router;
