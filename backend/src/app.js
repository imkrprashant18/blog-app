import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import authRoutes from "./routes/user.route.js";
import blogRoutes from "./routes/blog.route.js";
// routes decleration

app.use("/api/v1/users", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
export { app };
