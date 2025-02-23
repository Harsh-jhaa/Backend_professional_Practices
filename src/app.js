import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

// Middlewares to use for accepting data intake
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true,
  })
);
// for handelling json data
app.use(express.json({ limit: "18kb" }));
// for handelling urlencoded data
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
// routes declaration
app.use("/api/v1/users", userRouter);

export default app;
