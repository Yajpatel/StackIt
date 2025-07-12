require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

// Init app
const app = express();
// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
