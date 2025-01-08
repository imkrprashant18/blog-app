import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API URLs
const LOGIN_URL = "http://localhost:8000/api/v1/users/login";
const REGISTER_URL = "http://localhost:8000/api/v1/users/register";
const GETUSERDATA = "http://localhost:8000/api/v1/users/current-user";
const LOGOUT_URL = "http://localhost:8000/api/v1/users/logout";
const UpdateDetails_Url = "http://localhost:8000/api/v1/users/update-account";
const CREATE_BLOG_URL = "http://localhost:8000/api/v1/blogs/create-blog";

// Login Thunk
export const loginUser = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(LOGIN_URL, credentials);
            const { accessToken, user } = response.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("username", user.fullName);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Register Thunk
export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(REGISTER_URL, userData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get Current User Thunk
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(GETUSERDATA, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Logout Thunk
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(LOGOUT_URL);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("username");
            return true;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to log out");
        }
    }
);

// Update User Details Thunk
export const updateUserDetails = createAsyncThunk(
    'auth/updateUserDetails',
    async (userDetails, { rejectWithValue }) => {
        try {
            // Perform the update request using axios (PATCH method)
            const response = await axios.patch(UpdateDetails_Url, userDetails, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include the token in the headers for authorization if needed
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            // Return the response data (updated user details)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Create Blog Thunk
export const createBlogPost = createAsyncThunk(
    "blogs/createBlogPost",
    async (formData, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(CREATE_BLOG_URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



// Auth Slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("accessToken") || null,
        isLoggedIn: !!localStorage.getItem("accessToken"),
        status: "idle", // idle | loading | succeeded | failed
        error: null,
        logoutError: null,
        blogs: [],
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Register
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Get Current User
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Logout
            .addCase(logout.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logout.fulfilled, (state) => {
                state.status = "succeeded";
                state.user = null;
                state.token = null;
                state.isLoggedIn = false;
                state.logoutError = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = "failed";
                state.logoutError = action.payload;
            })

            // Update User Details
            .addCase(updateUserDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload; // Update user details in the store
                state.error = null;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create Blog Post
            .addCase(createBlogPost.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs.push(action.payload); // Add new blog to blogs list
                state.error = null;
            })
            .addCase(createBlogPost.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
