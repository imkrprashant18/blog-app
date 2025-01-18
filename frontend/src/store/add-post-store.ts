"use client";

import { create } from "zustand";
import axios, { AxiosError } from "axios";

interface BlogPost {
  title: string;
  content: string;
  category: string;
  featureImage: File | null;
}

interface BlogResponse {
  message: string;
}

interface BlogState {
  blog: BlogPost;
  loading: boolean;
  error: string | null;
  message: string | null;
  postBlog: (data: BlogPost) => Promise<BlogResponse>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useBlogStore = create<BlogState>((set) => ({
  blog: {
    title: "",
    content: "",
    category: "",
    featureImage: null,
  },
  loading: false,
  error: null,
  message: null,

  postBlog: async (data: BlogPost): Promise<BlogResponse> => {
    try {
      set({ loading: true, error: null, message: null });
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("category", data.category);
      if (data.featureImage) {
        formData.append("featureImage", data.featureImage);
      }

      const response = await axios.post(`${baseUrl}/blogs/create-blog`, formData, {
        headers: {
                 Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      set({ blog: { title: "", content: "", category: "", featureImage: null }, loading: false, error: null, message: response?.data?.message });
      return response?.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = "Failed to post blog";
      if (axiosError.response) {
        errorMessage = (axiosError.response?.data as { message: string })?.message || errorMessage;
      } else if (axiosError.request) {
        errorMessage = "No response received from the server.";
      }

      set({
        loading: false,
        error: errorMessage,
        message: null,
      });

      throw new Error(errorMessage);
    }
  },
}));
