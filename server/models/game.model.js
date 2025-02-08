import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    categories: [
      {
        type: String,
        enum: ["monthly-pass", "weekly-pass", "in-game-currency"],
      },
    ],
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
