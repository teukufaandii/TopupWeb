import express from "express";
import {
  login,
  logout,
  refreshToken,
  signup,
  getProfile,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.post("/login", apiKeyAuth, login);
router.post("/signup", apiKeyAuth, signup);
router.post("/logout", logout);
router.post("/refresh-token", apiKeyAuth, refreshToken);

router.get("/profile", protectRoutes, getProfile);
router.put("/profile", protectRoutes, updateProfile);

export default router;
