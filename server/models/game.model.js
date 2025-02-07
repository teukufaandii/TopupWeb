import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  categories: [
    { type: String, enum: ["monthly-pass", "weekly-pass", "in-game-currency"] },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
