// middleware/authMiddleware.js
const Auth = require('../models/auth');

const authenticateUser = async (req, res, next) => {
  // Check if the request contains an auth_token (UUID in this case)
  const authToken = req.headers.auth_token;
  
  if (!authToken) {
    return res.status(401).json({ success: false, message: 'Authentication failed!' });
  }

  try {
    // Check if the user exists in the database with the provided auth_token (UUID)
    const authUser = await Auth.findOne({ auth_token: authToken });
    if (!authUser) {
      throw new error('Invalid auth_token!');
    }

    // Set user information in req.user
    req.user = { user_id: authUser._id, email: authUser.email };
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: `Authentication failed! ${error.message}` });
  }
};

module.exports = {
  authenticateUser,
};
