import express from "express";
import {
  delete_Admin,
  get_AllAdmins,
  register,
  updateAdmin,
} from "../Controllers/DirectorController.js";
import { verifyAdmin, verifyDirector } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

// For developers team
router.get("/getAllAdmins", verifyDirector, get_AllAdmins);
router.post("/register", verifyDirector, register);
router.delete("/deleteAdmin/:aId", verifyDirector, delete_Admin);
router.put("/updateAdmin/:aId", verifyAdmin, updateAdmin);

// Uncomment the following lines when testing from client application
// router.post("/register", verifyDirector, register);
// router.get("/getAllAdmins", verifyDirector, get_AllAdmins);

export default router;
