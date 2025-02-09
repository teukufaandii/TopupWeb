import mongoose from "mongoose";
import slugify from "slugify";

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    description: { type: String },
    isPopular: { type: Boolean, default: false },
    image: {
      type: String,
      default: "https://via.placeholder.com/300",
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
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
