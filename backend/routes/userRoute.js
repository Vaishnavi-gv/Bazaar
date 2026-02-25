import express from "express";
import {
  register,
  verifyUserEmail,
  login,
  logout,
  getProfile,
  adminOnly,
} from "../controllers/userController.js";
import {
  protect,
  authorizeRoles,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.get("/verify-email/:token", verifyUserEmail);
router.post("/login", login);

// Authenticated user routes
router.post("/logout", protect, logout);
router.get("/me", protect, getProfile);

// Admin-only example route
router.get("/admin", protect, authorizeRoles("admin"), adminOnly);

export default router;