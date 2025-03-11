import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";

export const useTransactionContext = create((set, get) => ({
  transactionDetails: [],
  loading: false,
  error: null,

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
}));
