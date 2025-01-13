import { create } from "zustand";
import axios from "axios";
export const useRegisterStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  registerUser: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("fullName", userData.fullName);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      if (userData.avatar) {
        formData.append("avatar", userData.avatar[0]); // Attach the file
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type
          },
        }
      );
      set({ user: response.data, isLoading: false, error: null });
      return response;
    } catch (error) {
      set({ error: error?.response?.data?.message, isLoading: false });
    }
  },
}));
