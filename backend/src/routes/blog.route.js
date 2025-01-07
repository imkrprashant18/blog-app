import { Router } from "express";
import { verifyJwt } from "../middelwares/auth.middleware.js";
import {
  createBlog,
  getAllBlogs,
  getAllBlogsById,
  updateBlog,
  updateFeatureImage,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middelwares/multer.middleware.js";
const router = Router();

router
  .route("/create-blog")
  .post(
    verifyJwt,
    upload.fields([{ name: "featureImage", maxCount: 1 }]),
    createBlog
  );
router.route("/get-all-blogs").get(verifyJwt, getAllBlogs);
router.route("/get-blogs/:id").get(verifyJwt, getAllBlogsById);
router.route("/update-blog/:id").put(verifyJwt, updateBlog);
router
  .route("/update-feature-image/:id")
  .put(verifyJwt, upload.single("featureImage"), updateFeatureImage);
router.route("/delete-blog/:id").delete(verifyJwt, deleteBlog);
export default router;
