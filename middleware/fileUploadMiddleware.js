// middleware/fileUploadMiddleware.js
const multer = require('multer');
const path = require('path');

// Multer setup for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images')); // Specify the destination folder for storing profile photo
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || 
  file.mimetype === 'image/jpg' || 
  file.mimetype === 'image/jpeg') {
    cb(null, true); // File Filter
  } else {
    cb(new Error('File format is not allowed!'));
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10000000, // Max File Size: 10 MB
  },
  fileFilter: fileFilter, // File Filter
});

const uploadMiddleware = (req, res, next) => {
  upload.single('profilePhoto')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      // An unknown error occurred
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

    // No error occurred, proceed to the next middleware or route
    next();
  });
};

module.exports = {
  uploadMiddleware,
};
