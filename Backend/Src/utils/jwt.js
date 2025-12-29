
// jwt utility to generate JSON Web Tokens for user authentication
const jwt = require("jsonwebtoken");

// Function to generate a JWT for a given user ID
const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

// Exporting the generateToken function for use in other parts of the application
module.exports = generateToken;
