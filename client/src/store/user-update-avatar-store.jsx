import { create } from "zustand";
import axios from "axios";

export const useUpdateUserAvatarStore = create((set) => ({
  image: null,
  error: null,
  isLoading: false,
  updateUserAvatar: async (formData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/v1/users/update-avatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      set({ image: response.data, isLoading: false, error: null });
      return response.data;
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to update avatar.",
        isLoading: false,
      });
    }
  },
}));
