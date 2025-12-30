const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/user");
const generateToken = require("../utils/jwt");
const isStrongPassword = require("../utils/passwordValidator");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// ✅ SIGNUP  // Register a new user

exports.signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        throw new AppError("All fields are required", 400);
    }

    if (!validator.isEmail(email)) {
        throw new AppError("Invalid email format", 400);
    }

    if (!isStrongPassword(password)) {
        throw new AppError(
            "Password must be at least 12 characters and include uppercase, lowercase, and number",
            400
        );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            token,
        }
    });
});

// ✅ LOGIN  // Authenticate an existing user

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Email and password required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    if (user.isActive === false) {
        throw new AppError("Account is deactivated", 403);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError("Invalid credentials", 401);
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token
        }
    });
});

// ✅ GET CURRENT USER // Retrieve details of the currently authenticated user

exports.getCurrentUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});

// ✅ LOGOUT  // Log out the current user

exports.logout = asyncHandler(async (req, res) => {

    // JWT is stateless → handled on frontend by deleting token
    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});
