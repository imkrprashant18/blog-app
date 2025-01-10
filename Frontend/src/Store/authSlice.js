import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API URLs
const LOGIN_URL = "http://localhost:8000/api/v1/users/login";
const REGISTER_URL = "http://localhost:8000/api/v1/users/register";
const GETUSERDATA = "http://localhost:8000/api/v1/users/current-user";
const LOGOUT_URL = "http://localhost:8000/api/v1/users/logout";
const UpdateDetails_Url = "http://localhost:8000/api/v1/users/update-account";
const CREATE_BLOG_URL = "http://localhost:8000/api/v1/blogs/create-blog";
const GET_ALL_BLOGS_URL = "http://localhost:8000/api/v1/blogs/get-all-blogs";
const GET_BLOGS_BY_ID = "http://localhost:8000/api/v1/blogs/get-blogs";
const UPDATE_BLOG_URL = "http://localhost:8000/api/v1/blogs/update-blog";


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


export const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(GET_ALL_BLOGS_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.blogs;
});


// Async thunk to fetch blog details by ID
export const fetchBlogDetails = createAsyncThunk(
    'blog/fetchBlogDetails',
    async (id, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken"); // Get token from local storage
            const response = await axios.get(
                `${GET_BLOGS_BY_ID}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in headers
                    },
                }
            );
            return response.data; // Return the full response data
        } catch (error) {
            console.error("API Error: ", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || { message: "Unknown error occurred" });
        }
    }
);

// Thunk for fetching blogs by user ID
export const getBlogsByUser = createAsyncThunk(
    "blogs/getBlogsByUser",
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const userId = getState().auth.user._id; // Assuming user._id exists

            // Fetch blogs from the backend for this user
            const response = await axios.get(GET_ALL_BLOGS_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            // Update the filtering logic to match author._id
            const filteredBlogs = response.data.blogs.filter(
                (blog) => blog.author._id === userId // Access author._id to match userId
            );

            return filteredBlogs;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// Update Blog Thunk
export const updateBlog = createAsyncThunk(
    "blogs/updateBlog",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(
                `${UPDATE_BLOG_URL}/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );


            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

//update image thunk

export const updateFeatureImage = createAsyncThunk(
    "blogs/updateFeatureImage",
    async ({ blogId, formData }, { rejectWithValue }) => {
        if (!blogId) {
            return rejectWithValue("Blog ID is missing");
        }
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(
                `http://localhost:8000/api/v1/blogs/update-feature-image/${blogId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Define the async thunk for toggling likes
export const toggleLikeBlog = createAsyncThunk(
    "auth/toggleLikeBlog",
    async (blogId, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put(
                `http://localhost:8000/api/v1/blogs/like-blog/${blogId}`,
                {}, // No body needed
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return { blogId, liked: response.data.liked }; // Assuming `liked` is part of the response
        } catch (error) {
            console.error("Error toggling like:", error);
            // Log more details for debugging
            console.error("Error response:", error.response);
            return rejectWithValue(
                error.response?.data || { message: "An error occurred while toggling like." }
            );
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
        blogDetails: null,
        filteredBlogs: [],
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
            })

            // Get All Blogs
            .addCase(getAllBlogs.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogs = action.payload; // Ensure payload has data
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            //Blog details show
            .addCase(fetchBlogDetails.pending, (state) => {
                state.status = "loading";
                state.blogDetails = null;
            })
            .addCase(fetchBlogDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.blogDetails = action.payload; // Add the blog details to the state
            })
            .addCase(fetchBlogDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Get All Blogs and Filter By User
            .addCase(getBlogsByUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getBlogsByUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.filteredBlogs = action.payload;
            })
            .addCase(getBlogsByUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload || "Error occurred";
            })

            // Update Blog
            .addCase(updateBlog.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedBlog = action.payload;
                const blogIndex = state.blogs.findIndex((blog) => blog._id === updatedBlog._id);
                if (blogIndex >= 0) {
                    state.blogs[blogIndex] = updatedBlog; // Update the blog in the state
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Update Feature Image
            .addCase(updateFeatureImage.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateFeatureImage.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedBlog = action.payload; // Assuming the response returns the updated blog
                state.blogs = state.blogs.map((blog) =>
                    blog._id === updatedBlog._id ? updatedBlog : blog
                );
                state.error = null;
            })
            .addCase(updateFeatureImage.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // like and unlike
            .addCase(toggleLikeBlog.pending, (state) => {
                state.status = "loading";
            })
            .addCase(toggleLikeBlog.fulfilled, (state, action) => {
                state.status = "succeeded";
                const { blogId, liked } = action.payload;
                const blogIndex = state.blogs.findIndex((blog) => blog._id === blogId);
                if (blogIndex !== -1) {
                    state.blogs[blogIndex].liked = liked;
                }
            })
            .addCase(toggleLikeBlog.rejected, (state, action) => {
                state.status = "failed";
                console.error("Failed to toggle like:", action.payload);
                state.error = action.payload.message || "Failed to toggle like";
            });
    },
});

export default authSlice.reducer;
