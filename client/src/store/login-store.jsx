import { create } from "zustand";
import axios from "axios";

export const useUserLoginStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  login: async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        userData
      );
      const { accessToken, refreshToken } = response.data;
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      set({ user: response.data, isLoading: false, error: null });
      return response;
    } catch (error) {
      set({ error: error?.response?.data?.message, isLoading: false });
    }
  },
}));
