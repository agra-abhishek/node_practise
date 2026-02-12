const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const authRoutes = require('./routes/auth.routes')
dotenv.config();
const app = express();
// ENV VARIABLES
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// MongoDB connection
connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "https://node-practise-78.onrender.com",
  "https://node-practise-799.onrender.com"
];

app.use(cors({
  origin: ["http://localhost:5173",  "https://node-practise-78.onrender.com",
  "https://node-practise-799.onrender.com"],
  
            // frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // if you use cookies or auth
}));




app.use(express.json());

app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});