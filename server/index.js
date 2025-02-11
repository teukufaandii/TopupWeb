import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { dbConnect } from "./lib/dbConnect.js";

// Import routes
import authRoutes from "./routes/auth.route.js";
import gameRoutes from "./routes/game.route.js";
import itemRoutes from "./routes/item.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
  dbConnect();
});
