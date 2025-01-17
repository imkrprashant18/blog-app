"use client"
import { create } from "zustand";
import axios, { AxiosError } from "axios";
interface User {
        email: string;
        password: string;
}
interface LoginResponse {
        accessToken: string;
        refreshToken: string;
}
interface UserLoginState {
        user: User | null;
        isLoading: boolean;
        errors: string | null;
        message: string | null;
        loginUser: (data: User) => Promise<LoginResponse>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const useUserLoginStore = create<UserLoginState>((set) => ({
        user: null,
        isLoading: false,
        errors: null,
        message: null,

        loginUser: async (data: User): Promise<LoginResponse> => {
                try {
                        set({ isLoading: true, errors: null, message: null });
                        const response = await axios.post(`${baseUrl}/users/login`, data, {
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                        });
                       const {refreshToken, accessToken}= response?.data?.data
                        sessionStorage.setItem('accessToken', accessToken);
                        sessionStorage.setItem("refreshToken", refreshToken)

                        set({ user: response?.data, isLoading: false, errors: null, message: response?.data?.message });
                        return response?.data;
                } catch (error) {
                        const axiosError = error as AxiosError;
                        let errorMessage = "Failed to login user";
                        if (axiosError.response) {
                                errorMessage = (axiosError.response?.data as { message: string })?.message || errorMessage;
                        } else if (axiosError.request) {
                                errorMessage = "No response received from the server.";
                        }

                        set({
                                user: null,
                                isLoading: false,
                                errors: errorMessage || "Failed to login user"
                        });

                        throw new Error(errorMessage);
                }
        }
}));
