// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { uploadMiddleware } = require('../middleware/fileUploadMiddleware'); // File Upload Middleware

// Route paths
router.post('/register', uploadMiddleware, authController.registerUser); // Registration Route
router.post('/login', authController.loginUser); // Login Route

module.exports = router;
