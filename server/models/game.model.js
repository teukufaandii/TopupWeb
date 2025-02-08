import mongoose from "mongoose";
import slugify from "slugify";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    description: { type: String },
    image: {
      type: String,
      default: "https://via.placeholder.com/300",
    },
    categories: [
      {
        type: String,
        enum: ["monthly-pass", "weekly-pass", "in-game-currency"],
      },
    ],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

gameSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
