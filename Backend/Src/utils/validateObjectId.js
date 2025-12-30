
// consisient validation for MongoDB ObjectId

const mongoose = require("mongoose");
const AppError = require("./AppError");

const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new AppError("Invalid ID format", 400);
    }
};

module.exports = validateObjectId;
