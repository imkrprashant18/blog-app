import express from "express";
const router = express.Router();
import {
  userRegister,
  loginUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { upload } from "../middelware/multer.js";
import { verifyJWT } from "../middelware/authMiddelware.js";
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
// protected routes
router.route("/get-current-user").get(verifyJWT, getCurrentUser);
export default router;
