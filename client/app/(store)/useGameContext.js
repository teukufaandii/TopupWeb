import axios from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";
import { debounce } from "lodash";

export const useGameContext = create((set, get) => ({
  game: [],
  popularGame: null,
  loading: false,
  searchCache: {},

  getAllGames: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/games");
      set({ game: res.data.games || [], loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  searchGame: debounce(async (q) => {
    if (!q.trim()) return;

    const { searchCache } = get();
    if (searchCache[q]) {
      set({ game: searchCache[q], loading: false });
      return;
    }

    try {
      set({ loading: true });
      const res = await axios.get(`/games/search?q=${q}`);
      set((state) => ({
        game: res.data.games,
        searchCache: { ...state.searchCache, [q]: res.data.games },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  }, 500),

  getGameBySlug: async (slug) => {
    try {
      set({ loading: true });
      const res = await axios.get(`/games/${slug}`);
      set({ game: res.data.games[0] || null, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  getGamesByPopularity: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/games/popular");
      set({ popularGame: res.data.popularGames, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },
}));
