require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const database = require('./config/database');
const app = express();

// Middleware
app.use(express.json());

// Call the database connection function
database();

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

const PORT = process.env.DATABASE_PORT || 3000;  // PORT Setup

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Checking Server Connection
});