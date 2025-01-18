import express from "express";
const router = express.Router();
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  updateFeatureImage,
  deleteBlog,
  publicBlogs,
} from "../controllers/blog.controller.js";
import { verifyJWT } from "../middelware/authMiddelware.js";
import { upload } from "../middelware/multer.js";

router.route("/create-blog").post(
  verifyJWT,
  upload.fields([
    {
      name: "featureImage",
      maxCount: 1,
    },
  ]),
  createBlog
);

router.route("/get-all-blogs").get(verifyJWT, getAllBlogs);
router.route("/get-all-blogs-public").get(publicBlogs);
router.route("/get-all-blog/:id").get(verifyJWT, getBlogById);
router.route("/update-blog/:id").patch(verifyJWT, updateBlog);
router.route("/update-feature-image/:id").patch(
  verifyJWT,
  upload.fields([
    {
      name: "featureImage",
      maxCount: 1,
    },
  ]),
  updateFeatureImage
);

router.route("/delete-blog/:id").delete(verifyJWT, deleteBlog);

export default router;
