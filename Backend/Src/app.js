const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddleware");


const app = express();

// Middleware setup for CORS and JSON parsing
app.use(express.json());

app.use(
    cors({
        origin: (origin, callback) => {
            // Allow non-browser clients (curl/Postman) with no Origin header
            if (!origin) return callback(null, true);

            const configured = process.env.CLIENT_ORIGIN;
            const allowedOrigins = (configured
                ? configured.split(",")
                : ["http://localhost:5173", "http://localhost:5174","https://mini-user-management-system-git-main-salmans-projects-c8054218.vercel.app"]
            ).map((value) => value.trim());

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

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



