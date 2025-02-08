import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
  code: String,
  percentage: Number,
  expiresAt: Date,
}, { timestamps: true });

const Discount = mongoose.model("Discount", DiscountSchema);

export default Discount;
