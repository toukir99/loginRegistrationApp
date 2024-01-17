const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const Auth = require('../models/auth');
const Profile = require('../models/profile');
const sequelize = require('../config/database');

// Password Hashing Function
const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

const registerUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  console.log(typeof req.body);
  try {
    const { first_name, last_name, email, password, nid, age, marital_status } = req.body;
    const profilePhoto = req.file ? req.file.path : null;
    
    const alreadyExistsUser = await Auth.findOne({ where: { email }});
    if(alreadyExistsUser){
      await transaction.rollback();
      throw new Error('User already exists!');
    }
    
    // Hash the password
    const hashedPassword = hashPassword(password);

    // Create user in Auth table
    const authRecord = await Auth.create({ email, password: hashedPassword }, { transaction });
    // Handle failed registration
    if (!authRecord) {
      await transaction.rollback();
      throw new Error('User registration failed!');
    }

    // Create profileRecord of the user in Profile table
    const profileRecord = await Profile.create({
      user_id: authRecord.id,
      first_name,
      last_name,
      nid,
      profilePhoto,
      age,
      marital_status,
    }, { transaction });

    // Handle failed registration
    if (!profileRecord) {
      await transaction.rollback();
      throw new Error('User registration failed!');
    }
  
    // Commit the transaction if both records are created successfully
    await transaction.commit();

    // Success
    return res.status(200).json({ message: 'User registration successful!', data: { user_id: profileRecord.user_id } });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await transaction.rollback();
    throw new Error('User registration failed!');
  }
};

const loginUser = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      throw new Error('Email and password are required!');
    }

    // Find user by email in Auth table within the transaction
    const authUser = await Auth.findOne({ where: { email } }, { transaction });

    // Check if user exists
    if (!authUser) {
      await transaction.rollback();
      throw new Error('User not found!');
    }

    // Compare passwords using the hashedPassword function
    const isValidPassword = authUser.password === hashPassword(password);

    // Check if password is correct
    if (!isValidPassword) {
      await transaction.rollback();
      throw new Error('Incorrect password!');
    }

    // Generate and update auth_token within the transaction
    const newAuthToken = uuidv4();
    await authUser.update({ auth_token: newAuthToken }, { transaction });

    // Commit the transaction
    await transaction.commit();

    // Success
    return res.status(200).json({ message: 'You are logged in!', auth_token: newAuthToken, user_id: authUser.id });
  } catch (error) {
    // Rollback the transaction if an error occurs
    await transaction.rollback();
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
