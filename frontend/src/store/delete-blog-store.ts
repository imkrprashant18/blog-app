import { create } from "zustand";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface BlogStore {
  isLoading: boolean;
  error: string | null;
  deleteBlog: (id: string) => Promise<void>;
}

export const useDeleteBlogStore = create<BlogStore>((set) => ({
  isLoading: false,
  error: null,

  deleteBlog: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axios.delete(`${baseUrl}/blogs/delete-blog/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      set({ isLoading: false, error: null });
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = "Failed to delete blog";
      if (axiosError.response) {
        errorMessage = (axiosError.response?.data as { message: string })?.message || errorMessage;
      } else if (axiosError.request) {
        errorMessage = "No response received from the server.";
      }
      set({ isLoading: false, error: errorMessage });
      throw new Error(errorMessage);
    }
  },
}));
