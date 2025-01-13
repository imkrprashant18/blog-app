import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessandRefereshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in token generation:", error.message);
    return null;
  }
};
const userRegister = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      return res.status(400).json({ message: "Avatar file is required" });
    }
    const avatar = await UploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const user = await User.create({
      fullName,
      avatar: avatar.url,
      email,
      password,
    });
    const createdUser = await User.findById(user._id).select(
      "--password --refreshToken"
    );
    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user" });
    }
    return res.status(201).json({
      message: "User registered Successfully",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid user credentials" });
    }
    const { accessToken, refreshToken } = await generateAccessandRefereshToken(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken "
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "User logged In Successfully",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this will remove the field from document
      },
    },
    { new: true } // this will return the updated document
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged Out Successfully" });
};

const getCurrentUser = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "User fetched successfully", user: req.user });
  } catch (error) {
    return res.status(500).json({ message: "Unauthorized user" });
  }
};

const updateAccountDetials = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    if (!fullName && !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          fullName,
          email: email,
        },
      },
      { new: true }
    ).select("-password");
    return res.status(200).json({
      message: "Account details updated successfully",
      user,
    });
  } catch (error) {
    return res.status(501).json({ message: "User are Unauthorized" });
  }
};
export {
  userRegister,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountDetials,
};
