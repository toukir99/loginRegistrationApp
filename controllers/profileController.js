// controllers/profileController.js
const Profile = require('../models/profile');
const Auth = require('../models/auth');
const mongoose = require('mongoose');

// Update Profile 
const updateProfile = async (req, res) => {
  try {
    let userId = req.params.user_id;
    userId = new mongoose.Types.ObjectId(userId);
    
    let profilePhoto;
    if(req.file){
      profilePhoto = req.file.path;
    }

    // Extract only the allowed fields from the request body
    const { first_name, last_name, nid, age, marital_status } = req.body;
    
    // Build an object with only the allowed fields
    const updatedProfile = {
      first_name: first_name,
      last_name: last_name,
      nid: nid,
      age: age,
      marital_status: marital_status,
      profilePhoto: profilePhoto,
    };

    // Update user profile data with only the allowed fields
    let resultUpdateProfile = await Profile.updateOne({ user_id: userId }, { $set: updatedProfile });
    if (resultUpdateProfile.modifiedCount > 0) {
      return res.status(200).json({ success: true, message: 'Update successful!', profile: updatedProfile });
    } else {
      throw new Error('Profile not found or no changes were made!');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed!' });
  }
};


// Delete Profile 
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.user_id;
    userId = new mongoose.Types.ObjectId(userId);

    // Delete user profile and user auth data
    const resultDeletedAuth = await Auth.deleteOne({ _id: userId });
    const resultDeletedProfile = await Profile.deleteOne({ user_id: userId });

    if (resultDeletedProfile.deletedCount > 0 && resultDeletedAuth.deletedCount > 0) {
      return res.status(200).json({ message: 'User deleted!' });
  } else {
      throw new Error('Profile not found or no changes made!');
  }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error & failed to delete user profile' });
  }
};


// User profile
const getUserProfile = async (req, res) => {
  try {
    let userId = req.params.user_id;
    userId = new mongoose.Types.ObjectId(userId);

    // Retrieve user profile data
    const userProfile = await Profile.findOne({ user_id: userId });

    if (userProfile) {
      return res.status(200).json({ success: true, profile: userProfile });
    } else {
      throw new Error('Profile not found!');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Error & failed to get user profile!' });
  }
};

module.exports = {
  updateProfile,
  deleteUser,
  getUserProfile,
};
