import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";

export const useTransactionContext = create((set, get) => ({
  transactionDetails: [],
  transactionLoading: false,
  error: null,
  success: null,

  getTransactionByInvoice: async (invoiceId) => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(`/transactions/invoice/${invoiceId}`);
      console.log("API Response:", res.data);
      set({ transactionDetails: res.data.invoice, loading: false });
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "An error occurred",
        transactionDetails: null,
      });
    }
  },

  createTransaction: async ({
    itemId,
    gameUid,
    phoneNumber,
    quantity,
    server,
  }) => {
    try {
      set({ transactionLoading: true, error: null });
      const res = await axios.post(`/transactions/${itemId}`, {
        game_uid: gameUid,
        phone_number: phoneNumber,
        quantity,
        game_server: server,
      });
      set({
        transactionDetails: res.data.midtransTransaction,
        success: true,
        transactionLoading: false,
      });
    } catch (error) {
      set({
        transactionLoading: false,
        error: error.response?.data?.message || "An error occurred",
        transactionDetails: null,
        success: false,
      });
    }
  },
}));
