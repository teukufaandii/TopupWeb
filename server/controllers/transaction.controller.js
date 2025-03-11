import mongoose from "mongoose";
import Item from "../models/item.model.js";
import Transaction from "../models/transaction.model.js";
import fetch from "node-fetch";

export const createTransaction = async (req, res) => {
  try {
    const { item_id } = req.params;
    const userId = req.user._id;

    const invoice_id = "INV-" + Math.random().toString(36).slice(2).toUpperCase();

    const item = await Item.findById(item_id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const total = calculateTotalPrice(item);

    const transaction = await Transaction.create({
      userId,
      invoiceId: invoice_id,
      itemId: item_id,
      itemPrice: total,
    });

    const midtransResponse = await createMidtransTransaction(
      transaction,
      item,
      req.user
    );

    res.status(201).json({
      message: "Transaction created successfully",
      midtransResponse,
      transaction
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const midtransCallback = async (req, res) => {
  try {
    const body = req.body;

    console.log("Midtrans callback received:", body);

    if (!body.order_id || !mongoose.Types.ObjectId.isValid(body.order_id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (body.status_code === "200") {
      const transaction = await Transaction.findOne({ _id: body.order_id });

      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      const payment_type = body.payment_type;

      transaction.status = "success";
      transaction.payment_method = payment_type;
      await transaction.save();

      console.log(
        "Transaction status updated to completed for transaction ID:",
        body.order_id
      );

      return res
        .status(200)
        .json({ message: "Notification received and payment updated" });
    }

    return res
      .status(200)
      .json({ message: "Notification received but no action needed" });
  } catch (error) {
    console.error("Error handling Midtrans callback:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getUserTransactions = async (req, res) => {
  try {
    const userId = req.user._id;
    const transactions = await Transaction.find({ userId }).populate("itemId");
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Transaction.findOne({ invoiceId }).populate("itemId");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json({ invoice });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const calculateTotalPrice = (item) => {
  if (item.isDiscount) {
    if (item.discount === "flat") {
      return item.price - item.discountValue;
    } else if (item.discount === "percentage") {
      return item.price - (item.price * item.discountValue) / 100;
    }
  }
  return item.price;
};

const createMidtransTransaction = async (transaction, item, user) => {
  const url = "https://app.sandbox.midtrans.com/snap/v1/transactions";
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${process.env.MIDTRANS_BASIC_AUTH}`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: transaction._id,
        gross_amount: transaction.itemPrice,
      },
      item_details: [
        {
          id: transaction.itemId,
          price: transaction.itemPrice,
          quantity: 1,
          name: item.name,
          brand: "Fandi Topup Store",
          category: item.category,
          merchant_name: "Midtrans",
          url: "http://toko/toko1?item=abc",
        },
      ],
      customer_details: {
        first_name: user.name,
        last_name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        billing_address: {
          first_name: "TEST",
          last_name: "MIDTRANSER",
          email: "test@midtrans.com",
          phone: "081 2233 44-55",
          address: "Sudirman",
          city: "Jakarta",
          postal_code: "12190",
          country_code: "IDN",
        },
        shipping_address: {
          first_name: "TEST",
          last_name: "MIDTRANSER",
          email: "test@midtrans.com",
          phone: "0 8128-75 7-9338",
          address: "Sudirman",
          city: "Jakarta",
          postal_code: "12190",
          country_code: "IDN",
        },
      },
      credit_card: { secure: true },
    }),
  };

  const response = await fetch(url, options);
  return response.json();
};