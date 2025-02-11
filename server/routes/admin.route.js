import express from "express";
import { adminRoutes, protectRoutes } from "../middleware/auth.middleware.js";
import { addGame, createItem, deleteGame, updateItem } from "../controllers/admin.controller.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.post("/item", apiKeyAuth, protectRoutes, adminRoutes, createItem);
router.put("/item/:id", apiKeyAuth, protectRoutes, adminRoutes, updateItem);

router.post("/game", apiKeyAuth, protectRoutes, adminRoutes, addGame);
router.delete("/game/:id", apiKeyAuth, protectRoutes, adminRoutes, deleteGame);


export default router;
