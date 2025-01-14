import { create } from "zustand";
import axios from "axios";

export const useUserLogoutStore = create((set) => ({
  isLoggedIn: true,
  user: null,
  isLoading: false,
  error: null,
  logout: async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response);
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      localStorage.clear();
      set({
        user: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
      });
      return response;
    } catch (error) {
      set({
        error: error?.response?.data?.message,
        isLoading: false,
      });
    }
  },
}));
