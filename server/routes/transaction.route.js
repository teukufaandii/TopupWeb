import express from "express";
import {
  createTransaction,
  getInvoiceById,
  getUserTransactions,
  midtransCallback,
} from "../controllers/transaction.controller.js";
import apiKeyAuth from "../middleware/apiKeyAuth.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:item_id", apiKeyAuth, protectRoutes, createTransaction);
router.post("/midtrans/callback", midtransCallback);
router.get("/invoice/:invoiceId", apiKeyAuth, getInvoiceById);

router.get("/", apiKeyAuth, protectRoutes, getUserTransactions);

export default router;
