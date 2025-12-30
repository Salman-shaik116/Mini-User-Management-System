

const dotenv = require("dotenv");
dotenv.config();

// Importing the Express application and database connection function

const app = require("./app");
const connectDB = require("./config/db");

// Connecting to the database before starting the server
connectDB();

const PORT = process.env.PORT;

// Starting the server to listen on the specified port

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
