import express from "express";

const router = express.Router();

router.get("/:slug", getBySlug)

export default router;