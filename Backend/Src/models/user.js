
const mongoose = require("mongoose");


// Defining the User schema with fields for name, email, password, role, and isActive status

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: true
        },
        lastLogin: {
            type: Date,
            default: null
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
