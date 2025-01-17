import { create } from "zustand";
import axios , {AxiosError} from "axios"; 

interface User {
  email: string;
  fullName: string;
  password: string;
  avatar: File | null;
}

interface UserRegisterState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  registerUser: (data: User) => Promise<void>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL; 

export const useUserRegisterStore = create<UserRegisterState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  registerUser: async (data: User) => {
    try {
      set({ isLoading: true, error: null }); 
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }
      const response = await axios.post(`${baseUrl}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      set({ user: response.data, isLoading: false, error: null });
    } catch (error) {
      const axiosError = error as AxiosError; 
      let errorMessage = "Failed to register user"; 
      if (axiosError.response) {
        errorMessage = (axiosError.response?.data as { message: string })?.message || errorMessage;
      } else if (axiosError.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = axiosError.message || errorMessage;
      }
      set({ 
        user: null, 
        isLoading: false, 
        error: errorMessage || "Failed to register user" 
      }); 
    }
  }
}));