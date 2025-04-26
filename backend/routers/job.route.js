import express from "express";
import { addJob, getAllJobs, getJobById, updateJob, deleteJob } from "../controllers/job.controller.js";
import { protectRoute, authorizeRoles } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Routes
router.post("/add-job", protectRoute, authorizeRoles("admin"), addJob); // Admin only
router.get("/", protectRoute, authorizeRoles("admin", "user"), getAllJobs); // Both Admin & User
router.get("/:jobId", protectRoute, authorizeRoles("admin", "user"), getJobById); // Both Admin & User
router.put("/:jobId", protectRoute, authorizeRoles("admin"), updateJob); // Admin only
router.delete("/:jobId", protectRoute, authorizeRoles("admin"), deleteJob); // Admin only

export default router;
