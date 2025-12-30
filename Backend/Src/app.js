const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/error.middleware");


const app = express();

// Middleware setup for CORS and JSON parsing
app.use(express.json());
app.use(cors());

// Route setup for authentication
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Basic route to check if the API is running
app.get("/", (req, res) => {
    res.send("Mini User Management API running");
});

// Centralized error handling middleware
app.use(errorHandler);

module.exports = app;



