
// roleGuard middleware to restrict access based on user roles and permissions

const AppError = require("../utils/AppError");

const roleGuard = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return next(new AppError("Access denied: insufficient permissions", 403));
        }
        next();
    };
};

module.exports = roleGuard;
