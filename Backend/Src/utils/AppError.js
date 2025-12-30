
// Custom error class for application-specific errors
// Extends the built-in Error class to include a status code property
// for more informative error handling throughout the application.

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = AppError;
