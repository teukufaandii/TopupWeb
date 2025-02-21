import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import mongoose from "mongoose";
import express from "express";
import User from "./models/user.model.js";
import { Database, Resource } from "@adminjs/mongoose";
import dotenv from "dotenv";
import Transaction from "./models/transaction.model.js";
import Item from "./models/item.model.js";
import Game from "./models/game.model.js";

dotenv.config();

AdminJS.registerAdapter({ Database, Resource });

await mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const admin = new AdminJS({
  resources: [User, Transaction, Item, Game],

  rootPath: "/admin",
});

const adminRouter = AdminJSExpress.buildRouter(admin);

export default adminRouter;
