const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const handleErrors = require("./middlewares/errorMiddleware");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(
  cors({
    // origin: "https://task-manager-9gqqr7eh2-minuja1703s-projects.vercel.app",
    // origin: process.env.FRONTEND_URL,
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);

//Error handling Middleware
app.use(handleErrors);

module.exports = app;
