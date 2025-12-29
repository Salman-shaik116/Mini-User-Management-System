
// Utility function to validate password strength
const isStrongPassword = (password) => {
    return (
        password.length >= 12 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password)
    );
};

module.exports = isStrongPassword;
