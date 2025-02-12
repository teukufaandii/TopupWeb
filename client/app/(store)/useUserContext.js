import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useUserContext = create((set) => ({
  user: null,
  userImage: null,
  loading: false,
  checkingAuth: true,
  isEmailVerified: null,

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
      const res = await axios.post(
        "/auth/signup",
        {
          username,
          email,
          password,
          confirmPassword,
          phoneNumber,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );

      set({ user: res.data.user, loading: false });
      toast.success(res.data.message);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message || "Signup failed");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });

      if (res.data.success === true) {
        set({
          user: res.data.user,
          loading: false,
          isEmailVerified: res.data.user.isVerified,
        });

        toast.success(res.data.message);
      } else {
        set({ loading: false });
        toast.error(res.data.message);
      }
    } catch (error) {
      set({ loading: false });

      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  updateUser: async ({ username, email, phone }) => {
    try {
      const res = await axios.put("/auth/profile", { username, email, phone });
      set({ user: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      console.log(error);
      set({ checkingAuth: false, user: null });
    }
  },

  updatePassword: async ({ currentPassword, newPassword, confirmPassword }) => {
    try {
      const res = await axios.put("/auth/profile/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      set({ user: null });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  uploadImage: async ({ image }) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        "/auth/upload-profile-image",
        { image },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        }
      );
      set({ loading: false });
      toast.success(res.data.message);
      set({ userImage: res.data.image });
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload gagal");
    }
  },
}));
