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
import authRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.routes.js";
// routes decleration
app.use("/api/v1/users", authRoute);
app.use("/api/v1/blogs", blogRoute);
export { app };
