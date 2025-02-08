import express from "express";
import {
  login,
  logout,
  refreshToken,
  signup,
  getProfile,
} from "../controllers/auth.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);

router.get("/profile", protectRoutes, getProfile);

export default router;
