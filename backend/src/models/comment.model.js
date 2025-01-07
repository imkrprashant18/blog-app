import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model (the user who made the comment)
      required: true,
    },
    blog: {
      type: Schema.Types.ObjectId,
      ref: "Blog", // Reference to the Blog model (the blog this comment belongs to)
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
