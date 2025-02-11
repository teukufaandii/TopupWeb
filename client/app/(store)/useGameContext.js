import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useGameContext = create((set) => ({
    game: null,
    loading: false,

    searchGame: async (q) => {
        try {
            set({ loading: true });
            const res = await axios.get(`/games/search?q=${q}`);
            set({ game: res.data.games, loading: false });
        } catch (error) {
            set({ loading: false });
            console.log(error);
        }
    },

    getGameBySlug: async (slug) => {
        try {
            set({ loading: true });
            const res = await axios.get(`/games/${slug}`);
            set({ game: res.data.games, loading: false });
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.message || "An error occurred");
        }
    }
}));