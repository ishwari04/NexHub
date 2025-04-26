import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getSuggestedConnections,
  getPublicProfile,
  updateProfile,
  getUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

// ✅ Order matters — put specific routes first!
router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/profile", protectRoute, getUserProfile); // GET profile
router.put("/profile", protectRoute, updateProfile);  // PUT profile
router.get("/public/:username", getPublicProfile);     // Public route, no protection
router.get("/:username", protectRoute, getPublicProfile); // Protected profile by username

export default router;
