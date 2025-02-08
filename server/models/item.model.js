import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    gameId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    isDiscount: { type: Boolean, default: false },
    discount: { type: String, enum: ["flat", "percentage"] },
    discountValue: { type: Number },
    category: {
      type: String,
      enum: ["monthly-pass", "weekly-pass", "in-game-currency"],
      required: true,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
