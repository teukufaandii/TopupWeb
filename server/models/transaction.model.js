import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    invoiceId: { type: String, required: true, unique: true, index: true },
    itemPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    quantity: { type: Number, required: true },
    game_uid: { type: String },
    game_server: { type: String },
    phone_number: { type: String },
    payment_method: { type: String },
    midtransToken: { type: String },
    midtransUrl: { type: String },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
