require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

const PORT = process.env.DATABASE_PORT || 3000;  // PORT Setup

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);  // Checking Server Connection
});