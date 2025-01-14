import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const author = req.user._id;
    const blog = await Blog.create({
      title,
      content,
      category,
      author,
    });
    if (!blog) {
      return res.status(500).json({ message: "Failed to create blog" });
    }
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.findByIdAndUpdate(author, {
      $push: { posts: blog._id },
    });
    await user.save();
    return res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.log(error);
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

const getAllBlogsById = async (req, res) => {
  try {
    const blogId = req.params?.id;
    const blog = await Blog.findById(blogId).populate(
      "author",
      "fullName avatar"
    );
    // add commente here as well

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ blog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch the blog" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blogId = req.params?.id;
    const { title, content, category } = req.body;
    if (!title && !content && !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = await Blog.findById(blogId);

    // Check if the blog exists
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the logged-in user is the author of the blog
    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this blog" });
    }
    const updateBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        category,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    if (!updateBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res
      .status(200)
      .json({ message: "Blog updates Successfully", blog: updateBlog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update blog" });
  }
};

const updateFeatureImage = async (req, res) => {
  try {
    const updateFeatureImagePath = req.file?.path;

    if (!updateFeatureImagePath) {
      return res.status(400).json({ message: "Feature Image file is missing" });
    }

    const featureImage = await UploadOnCloudinary(updateFeatureImagePath);

    if (!featureImage.url) {
      return res
        .status(400)
        .json({ message: "Error while uploading Feature Image" });
    }

    const blogId = req.params?.id;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Feature Image not found" });
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update the  feature image",
      });
    }

    const updateFeatureImage = await Blog.findByIdAndUpdate(
      blogId,
      {
        featureImage: featureImage.url,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updateFeatureImage) {
      return res.status(404).json({ message: "Feature Image Not found" });
    }

    return res.status(200).json({
      message: "Feature Image Update successfull Successfully",
      blog: updateFeatureImage,
    });
  } catch (error) {
    return res.status(500).json({ message: " Failed to update Feature Image" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params?.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this blog" });
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { posts: blogId },
    });

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete blog" });
  }
};

const likeBlog = async (req, res) => {};
export {
  createBlog,
  getAllBlogs,
  getAllBlogsById,
  updateBlog,
  updateFeatureImage,
  deleteBlog,
};
