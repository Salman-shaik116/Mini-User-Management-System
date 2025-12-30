const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/User");
const generateToken = require("../utils/jwt");
const isStrongPassword = require("../utils/passwordValidator");

// ✅ SIGNUP  // Register a new user

exports.signup = async (req, res) => {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    if (!isStrongPassword(password)) {
        return res.status(400).json({ message: "Password must be at least 12 characters and include uppercase, lowercase, and number" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
};

// ✅ LOGIN  // Authenticate an existing user

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            token
        }
    });
};

// ✅ GET CURRENT USER // Retrieve details of the currently authenticated user

exports.getCurrentUser = async (req, res) => {
    res.status(200).json(req.user);
};

// ✅ LOGOUT  // Log out the current user

exports.logout = async (req, res) => {

    // JWT is stateless → handled on frontend by deleting token
    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
};
