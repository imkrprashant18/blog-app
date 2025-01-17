import { create } from "zustand";
import axios, { AxiosResponse, AxiosError } from "axios";

interface User {
  currentUser: User | null | undefined;
  id: string;
  email: string;
  fullName: string;
  avatar: string;
  blogs: string[];
  comments: string[];
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  isAuthenticated: boolean;
}

interface UserAuthStore extends AuthStore {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  getCurrentUser: () => Promise<AuthStore>;
}

interface ApiResponse {

  data: User;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useUserAuthStore = create<UserAuthStore>(
    (set) => ({
      currentUser: null,
      isLoading: false,
      error: null,
      isAuthenticated: false, 
      getCurrentUser: async (): Promise<AuthStore> => {
        set({ isLoading: true, error: null });
        try {
          const response: AxiosResponse<ApiResponse> = await axios.get(
            `${baseUrl}/users/get-current-user`,
             {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
          }
          );

          set({
            currentUser: response?.data?.data,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return {isAuthenticated: true};
        } catch (error) {
                 const axiosError = error as AxiosError;
                                        let errorMessage = "Failed to fetch user";
                                        if (axiosError.response) {
                                                errorMessage = (axiosError.response?.data as { message: string })?.message || errorMessage;
                                        } else if (axiosError.request) {
                                                errorMessage = "No response received from the server.";
                                        }
          set({
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
          throw new Error(errorMessage);
        }
      },
    })
)