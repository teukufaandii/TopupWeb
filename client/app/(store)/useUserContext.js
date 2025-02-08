import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useUserContext = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
  }) => {
    set({ loading: true });

    if (password !== confirmPassword) {
      set({ loading: false });
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("/auth/signup", {
        username,
        email,
        password,
        phoneNumber,
      });

      set({ user: res.data.user, loading: false });
      toast.success("Account created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Something went wrong, please try again later");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data.user, loading: false });
      toast.success("Logged in successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Something went wrong, please try again later");
    }
  },
}));
