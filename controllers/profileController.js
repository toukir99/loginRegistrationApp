// controllers/profileController.js
const Profile = require('../models/profile');
const Auth = require('../models/auth');

// Update Profile 
const updateProfile = async (req, res) => {
  try {
    let userId = req.params.user_id;
    userId = Number(userId);
   
    // Ensure that one user cannot update data of other users
    if (userId !== req.user.id) {
      throw new error('Authentication Error!');
    }
    
    let profilePhoto;
    if(req.file){
      profilePhoto = req.file.path;
    }

    // Extract only the allowed fields from the request body
    const { first_name, last_name, nid, age, marital_status } = req.body;
    
    // Build an object with only the allowed fields
    const updatedProfiles = {
      first_name: first_name,
      last_name: last_name,
      nid: nid,
      age: age,
      marital_status: marital_status,
      profilePhoto: profilePhoto,
    };

    // Update user profile data with only the allowed fields
    let resultUpdateProfile = await Profile.update(updatedProfiles, { where: { user_id: userId } });
    if (resultUpdateProfile) {
      return res.status(200).json({ success: true, message: 'Successfully updated!', profile: updatedProfiles });
    } else {
      throw new error('Profile is not found!');
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};


// Delete Profile 
const deleteUser = async (req, res) => {
  try {
    let userId = req.params.user_id;
    userId = Number(userId);

    // Ensure that one user cannot delete other users
    if (userId !== req.user.id) {
      throw new Error('Authentication Error!');
    }

    // Delete user profile data
    const resultDeleteProfile = await Profile.destroy({ where: { user_id: userId } });
    const resultDeleteAuth = await Auth.destroy({ where: { id: userId } });

    if (resultDeleteProfile && resultDeleteAuth) {
      return res.status(200).json({ success: true, message: 'User successfully deleted!' });
    } else {
      throw new Error('User not found!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};


// User profile
const getUserProfile = async (req, res) => {
  try {
    let userId = req.params.user_id;
    userId = Number(userId);

    // Ensure that one user cannot access data of other users
    if (userId !== req.user.id) {
      throw new Error('Authentication Error!');
    }

    // Retrieve user profile data
    const userProfile = await Profile.findOne({ where: { user_id: userId } });

    if (userProfile) {
      return res.status(200).json({ success: true, profile: userProfile });
    } else {
      throw new Error('Profile not found!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to get user profile' });
  }
};

module.exports = {
  updateProfile,
  deleteUser,
  getUserProfile,
};
