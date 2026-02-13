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
app.use(cors({
  origin: "process.env.FRONTEND_URL", // frontend URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(session({
  name: "session_id",            // optional session cookie name
  secret: process.env.SESSION_SECRET,     // required
  resave: false,                 // recommended
  saveUninitialized: false,      // recommended
  cookie: {
    httpOnly: true,              // not accessible via JS
    secure: true,                // must be true if SameSite=None (HTTPS)
    sameSite: "none",            // allows cross-site
    maxAge: 24 * 60 * 60 * 1000  // 1 day
  }
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});