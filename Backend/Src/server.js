const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Importing the Express application and database connection function

const app = require("./app");
const connectDB = require("./config/db");

// Connecting to the database before starting the server
connectDB();

const PORT = process.env.PORT || 5000;

// Starting the server to listen on the specified port

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
