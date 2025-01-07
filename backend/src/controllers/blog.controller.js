import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const userId = req.user._id;

    const featureImageLocalPath = req.files?.featureImage[0]?.path;
    if (!featureImageLocalPath) {
      return res
        .status(400)
        .json({ message: "Feature Image file is required" });
    }
    const featureImage = await UploadOnCloudinary(featureImageLocalPath);
    if (!featureImage) {
      return res
        .status(400)
        .json({ message: "Feature Image file is required" });
    }

    const newBlog = await Blog.create({
      title,
      content,
      category,
      featureImage: featureImage.url,
      author: userId,
    });
    if (!newBlog) {
      return res.status(500).json({ message: "Failed to create blog" });
    }
    await newBlog.save();
    await User.findByIdAndUpdate(userId, {
      $push: { posts: newBlog._id },
    });
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create blog" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "fullName avatar");
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found" });
    }
    res.status(200).json({ blogs });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

export { createBlog, getAllBlogs };
