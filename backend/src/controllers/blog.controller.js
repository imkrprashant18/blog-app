import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";
// create blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  if ([title, content.category].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const featureImageLocalPath = req.files?.featureImage[0]?.path;
  if (!featureImageLocalPath) {
    throw new ApiError(400, "Feature image is required");
  }

  const featureImage = await UploadOnCloudinary(featureImageLocalPath);
  if (!featureImage) {
    throw new ApiError(400, "Feature image is required");
  }
  const blog = await Blog.create({
    title,
    content,
    category,
    featureImage: featureImage.url,
    author: req.user._id,
  });

  if (!blog) {
    throw new ApiError(500, "Failed to create the blog");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $push: {
        blogs: blog._id,
      },
    },
    { new: true }
  ).select("-password --refreshToken");
  if (!user) {
    throw new ApiError(500, "Something went wrong while creating the blog");
  }
  const createdBlog = await Blog.findById(blog._id);
  if (!createdBlog) {
    throw new ApiError(500, "Something went wrong while creating the blog");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdBlog, "Blog created successfully"));
});

// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User is not authorized to get blogs");
  }
  const blogs = await Blog.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $unwind: {
        path: "$authorDetails",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        category: 1,
        featureImage: 1,
        "authorDetails.fullName": 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  if (!blogs || blogs.length === 0) {
    throw new ApiError(404, "No blogs found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
});

// get blogs by id

const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User is not authorized to access this blog");
  }
  const blogId = await Blog.findById(id);

  const blog = await Blog.aggregate([
    {
      $match: { _id: blogId },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails",
      },
    },
    {
      $unwind: {
        path: "$authorDetails",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        category: 1,
        featureImage: 1,
        "authorDetails.fullName": 1,
      },
    },
  ]);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }
  console.log(blog);
  return res
    .status(200)
    .json(new ApiResponse(200, blog[0], "Blog fetched successfully"));
});

export { createBlog, getAllBlogs, getBlogById };
