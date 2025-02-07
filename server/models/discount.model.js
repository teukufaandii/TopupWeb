import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
  code: String,
  percentage: Number,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now },
});

const Discount = mongoose.model("Discount", DiscountSchema);

export default Discount;
