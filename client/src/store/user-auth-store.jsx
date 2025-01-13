import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

export const useUserAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: null,
      isLoading: false,
      getCurrentUser: async () => {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/v1/users/current-user",
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem(
                  "accessToken"
                )}`,
              },
            }
          );
          set({ user: response.data, error: null, isLoading: false });
          return response;
        } catch (error) {
          set({
            error: error?.response?.data?.message,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "user-auth",
      getStorage: localStorage,
    }
  )
);
