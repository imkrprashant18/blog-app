import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "@/store/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import the navigate hook
import { getCurrentUser } from "@/store/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate hook
  const { status, error } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  if (user) {
    navigate("/");
  }

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "", // For fullname
    avatar: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login: send email and password only
      dispatch(
        loginUser({ email: formData.email, password: formData.password })
      )
        .then((response) => {
          console.log("Login response: ", response); // Log the response to inspect its structure
          if (response.type === "auth/login/fulfilled") {
            const { accessToken, refreshToken } = response.payload; // Destructure accessToken and refreshToken from response.payload

            if (accessToken) {
              // Save accessToken and refreshToken to localStorage
              localStorage.setItem("accessToken", accessToken);
              // localStorage.setItem("refreshToken", refreshToken);
              console.log("Access Token: ", accessToken); // Optional: Log token for inspection
              alert("Login successful!");
              navigate("/"); // Redirect to home page
              window.location.reload();
            } else {
              alert("Access token not found in response.");
            }
          }
        })
        .catch((error) => {
          console.error("Login failed: ", error);
          alert("Login failed. Please try again.");
        });
    } else {
      // Register: send FormData including avatar, email, fullname, and password
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("fullName", formData.fullName); // Ensure "fullName" is used
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      dispatch(registerUser(formDataToSend))
        .then((response) => {
          if (response.type === "auth/register/fulfilled") {
            alert("Registration successful! Please login.");
            setIsLogin(true); // Switch to login view
          }
        })
        .catch((error) => {
          console.error("Registration failed: ", error);
          alert("Registration failed. Please try again.");
        });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      const allowedTypes = ["image/jpeg", "image/jpg"]; // List of allowed types (JPG and JPEG)

      // Check if the file type is valid
      if (!allowedTypes.includes(fileType)) {
        alert("Please upload a JPG or JPEG image.");
        setFormData({ ...formData, avatar: null });
        setPreviewUrl(null);
      } else {
        setFormData({ ...formData, avatar: file });
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    localStorage.removeItem("refreshToken"); // Remove refresh token from localStorage
    alert("You have logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Avatar preview"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={32} className="text-gray-400" />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
                      <Upload size={16} className="text-gray-500" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="text-gray-500" size={20} />
                  <Input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName} // Fixed: Use fullName instead of username
                    onChange={handleChange}
                    className="flex-1"
                  />
                </div>
              </>
            )}
            <div className="flex items-center space-x-2">
              <Mail className="text-gray-500" size={20} />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="text-gray-500" size={20} />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="flex-1"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Processing..."
                : isLogin
                ? "Login"
                : "Register"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm">{error.message || error}</p>
            )}
            <p className="text-center text-sm text-gray-600">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
