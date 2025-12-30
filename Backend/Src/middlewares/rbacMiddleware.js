
// roleGuard middleware to restrict access based on user roles and permissions

const roleGuard = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied: insufficient permissions"
            });
        }
        next();
    };
};

module.exports = roleGuard;
