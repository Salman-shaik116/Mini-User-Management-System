const bcrypt = require("bcryptjs");
const validator = require("validator");
const isStrongPassword = require("../utils/passwordValidator");
const User = require("../models/user");
const validateObjectId = require("../utils/validateObjectId");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

// ✅ VIEW ALL USERS (with pagination)
// List users with pagination support 

exports.getAllUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(limit);

    const totalUsers = await User.countDocuments();

    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
        success: true,
        data: {
            page,
            totalPages,
            totalUsers,
            users,
        },
    });
});

// ✅ ACTIVATE USER
// Activate a user account by setting isActive to true

exports.activateUser = asyncHandler(async (req, res) => {
    validateObjectId(req.params.id);

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: true },
        { new: true }
    ).select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "User activated successfully",
        data: user
    });
});

// ✅ DEACTIVATE USER
// Deactivate a user account by setting isActive to false

exports.deactivateUser = asyncHandler(async (req, res) => {
    validateObjectId(req.params.id);

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { isActive: false },
        { new: true }
    ).select("-password");

    if (!user) {
        throw new AppError("User not found", 404);
    }

    res.status(200).json({
        success: true,
        message: "User deactivated successfully",
        data: user
    });
});


// user can get own profile to view their details

exports.getMyProfile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});

// user can Update full name and email of their profile

exports.updateProfile = asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new AppError("Name and email are required", 400);
    }

    if (!validator.isEmail(email)) {
        throw new AppError("Invalid email format", 400);
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { name, email },
        { new: true }
    ).select("-password");

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedUser,
    });
});

// user can change their password

exports.changePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        throw new AppError("Current and new password required", 400);
    }

    const user = await User.findById(req.user._id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new AppError("Current password is incorrect", 401);
    }

    if (!isStrongPassword(newPassword)) {
        throw new AppError("Password must be at least 12 characters and include uppercase, lowercase, and number", 400);
    };

    user.password = await bcrypt.hash(newPassword, 13);
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password changed successfully",
    });
});

