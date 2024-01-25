// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware.js'); // User Authentication Middleware
const { uploadMiddleware } = require('../middleware/fileUploadMiddleware.js'); // File Upload Middleware
const validateUpdateProfile = require("../middleware/validateUpdateProfile"); // Update Profile Validation Middleware
const validateUserId = require("../middleware/validateUserId"); // UserId Validation Middleware
const validateAuthToken = require("../middleware/validateAuthToken"); // AuthToken Validation Middleware

// Apply validate Auth Token and Authenticate User middleware to all profile routes
router.use(validateAuthToken);
router.use(authenticateUser);

// Route paths
router.put('/update/:user_id', uploadMiddleware, validateUserId, validateUpdateProfile, profileController.updateProfile); // Update Profile Route
router.delete('/delete/:user_id', validateUserId, profileController.deleteUser); // Delete User Route
router.get('/:user_id', validateUserId, profileController.getUserProfile); // User Profile Route

module.exports = router;

