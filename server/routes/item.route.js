import express from "express";
import { getItemsBySlug } from "../controllers/item.controller.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.get("/:slug", apiKeyAuth, getItemsBySlug);

export default router;