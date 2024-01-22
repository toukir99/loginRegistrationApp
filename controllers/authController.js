const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const Auth = require('../models/auth');
const Profile = require('../models/profile');


// Password Hashing Function
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

// User Registration
const registerUser = async (req, res) => {
  
  try {
    const { first_name, last_name, email, password, nid, age, marital_status } = req.body;
    const profilePhoto = req.file ? req.file.path : null;

    const alreadyExistsUser = await Auth.findOne({ email });
    if(alreadyExistsUser){
      throw new Error('User already exists!');
    }
    
    // Hash the password
    const hashedPassword = hashPassword(password);

    // Create user in Auth table
    // const authRecord = new Auth({ email, password: hashedPassword, auth_token: uuidv4() });
    // await authRecord.save();
    const authRecord = await Auth.create({ email, password: hashedPassword, auth_token: uuidv4() });

    // Handle failed registration
    if (!authRecord) {
      throw new Error('User registration failed!');
    }

    // Create profileRecord of the user in Profile table
    // const profileRecord = new Profile({ user_id: authRecord._id, first_name, last_name, nid, age, profilePhoto, marital_status });
    // await profileRecord.save();
    const profileRecord = await Profile.create({ user_id: authRecord._id, first_name, last_name, nid, age, profilePhoto, marital_status });

    // Handle failed registration
    if (!profileRecord) {
      throw new Error('User registration failed!');
    }

    // Success
    return res.status(201).json({ message: 'User Registration done!', data: { _id: profileRecord.user_id }});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
};

const loginUser = async (req, res) => {

  try {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      throw new Error('Email and password are required!');
    }

    // Find user by email in Auth table 
    const authUser = await Auth.findOne({ email });
    
    // Check if user exists
    if (!authUser) {
      throw new Error('User not found!');
    }

    // Compare passwords using the hashedPassword function
    const isValidPassword = authUser.password === hashPassword(password);

    // Check if password is correct
    if (!isValidPassword) {
      throw new Error('Incorrect password!');
    }

    // Generate and update auth_token within the transaction
    const newAuthToken = uuidv4();
    await authUser.updateOne({ auth_token: newAuthToken });

    // Success
    return res.status(200).json({ message: 'You are logged in!', auth_token: newAuthToken, user_id: authUser._id });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Internal Server Error!' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
