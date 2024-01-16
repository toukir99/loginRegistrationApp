// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { authenticateUser } = require('../middleware/authMiddleware.js'); // Authentication Middleware
const { uploadMiddleware } = require('../middleware/fileUploadMiddleware.js'); // File Upload Middleware

// Apply Authentication middleware to all profile routes
router.use(authenticateUser);

// Route paths
router.put('/update/:user_id', uploadMiddleware, profileController.updateProfile); // Update Profile Route
router.delete('/delete/:user_id', profileController.deleteUser); // Delete User Route
router.get('/:user_id', profileController.getUserProfile); // User Profile Route

module.exports = router;

