const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes");
const authRoutes = require('./routes/auth.routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://newnode-pxjc.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests (important!)
app.options('*', cors());

// Body parsing & cookies
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Debug middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
