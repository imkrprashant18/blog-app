import { Router } from "express";
import {
  userRegister,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountDetials,
  updateAvatar,
  updateCoverImage,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middelwares/auth.middleware.js";
import { upload } from "../middelwares/multer.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userRegister
);
router.route("/login").post(loginUser);

// protected route
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account").patch(verifyJwt, updateAccountDetials);
router
  .route("/update-avatar")
  .patch(verifyJwt, upload.single("avatar"), updateAvatar);
router
  .route("/update-cover-image")
  .patch(verifyJwt, upload.single("coverImage"), updateCoverImage);
export default router;
