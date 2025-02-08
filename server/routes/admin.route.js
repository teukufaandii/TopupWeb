import express from "express";
import { adminRoutes, protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/item", protectRoutes, adminRoutes, createItem);
router.get("/item", protectRoutes, adminRoutes, getAllItems);
router.put("/item/:id", protectRoutes, adminRoutes, updateItem);

export default router;
