const express = require("express");
const router = express.Router();


const authMiddleware = require("../middlewares/authMiddleware");
const roleGuard = require("../middlewares/rbacMiddleware");
const userController = require("../controllers/userController");

// Admin-only routes

// ✅ VIEW ALL USERS (with pagination)

router.get(
    "/",
    authMiddleware,
    roleGuard("admin"),
    userController.getAllUsers
);

// ✅ ACTIVATE USER and set isActive to true

router.patch(
    "/:id/activate",
    authMiddleware,
    roleGuard("admin"),
    userController.activateUser
);

// ✅ DEACTIVATE USER and set isActive to false

router.patch(
    "/:id/deactivate",
    authMiddleware,
    roleGuard("admin"),
    userController.deactivateUser
);


// User routes

// protected route to get current user's profile
router.get(
    "/me",
    authMiddleware,
    userController.getMyProfile
);

// user can update their profile

router.put(
    "/me",
    authMiddleware,
    userController.updateProfile
);

// user can change their password

router.put(
    "/me/change-password",
    authMiddleware,
    userController.changePassword
);


module.exports = router;
