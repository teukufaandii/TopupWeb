import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { dbConnect } from "./lib/dbConnect.js";

// Import routes
import authRoutes from "./routes/auth.route.js";
import gameRoutes from "./routes/game.route.js";
import itemRoutes from "./routes/item.route.js";
import transactionRoutes from "./routes/transaction.route.js";
import adminRoutes from "./routes/admin.route.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
  dbConnect();
});
