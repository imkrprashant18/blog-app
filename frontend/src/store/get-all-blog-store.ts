import { create } from "zustand";
import axios, { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

interface Blog {
        id: number;
        title: string;
        content: string;
        author: string;
        createdAt: string;
}

interface BlogStore {
        allBlogs: Blog[] | null;
        isLoading: boolean;
        error: string | null;
        getAllBlogs: () => Promise<void>;
}

export const useBlogStore = create<BlogStore>((set) => ({
        allBlogs: null,
        isLoading: false,
        error: null,

        getAllBlogs: async () => {
                set({ isLoading: true, error: null });
                try {
                        const response = await axios.get<Blog[]>(`${baseUrl}/blogs/get-all-blogs`, {
                                headers: {
                                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
                                },
                        });

                        set({
                                allBlogs: response.data,
                                isLoading: false,
                                error: null,
                        });
                } catch (error) {
                        const axiosError = error as AxiosError;
                        let errorMessage = "Failed to fetch user";
                        if (axiosError.response) {
                                errorMessage = (axiosError.response?.data as { message: string })?.message || errorMessage;
                        } else if (axiosError.request) {
                                errorMessage = "No response received from the server.";
                        }
                        set({
                                isLoading: false,
                                error: "Failed to fetch blogs",
                        });
                        throw new Error(errorMessage);

                }
        },
}));
