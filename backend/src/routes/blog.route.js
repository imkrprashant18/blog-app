import { Router } from "express";
import { verifyJwt } from "../middelwares/auth.middleware.js";
import { createBlog, getAllBlogs } from "../controllers/blog.controller.js";
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
export default router;
