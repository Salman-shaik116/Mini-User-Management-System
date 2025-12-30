const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Authentication routes key endpoints for signup, login, get current user, and logout

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.get("/me", authMiddleware, authController.getCurrentUser);

router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
