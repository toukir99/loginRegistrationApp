// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { uploadMiddleware } = require('../middleware/fileUploadMiddleware'); // File Upload Middleware
const validateAuth = require('../middleware/validateAuth'); // Auth Validation Middleware
const validateCreateProfile = require("../middleware/validateCreateProfile"); // Create Profile Validation Middleware

// Route paths
router.post('/register', uploadMiddleware, validateAuth, validateCreateProfile, authController.registerUser); // Registration Route
router.post('/login', validateAuth, authController.loginUser); // Login Route

module.exports = router;
