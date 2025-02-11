import express from "express";
import {
  getAllGames,
  getGamesByPopularity,
  getItemsBySlug,
  searchGames,
} from "../controllers/game.controller.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";

const router = express.Router();

router.get("/", apiKeyAuth, getAllGames);
router.get("/popular", apiKeyAuth, getGamesByPopularity);
router.get("/search", apiKeyAuth, searchGames);

router.get("/:slug", apiKeyAuth, getItemsBySlug);

export default router;
