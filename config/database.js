const mongoose = require('mongoose');

// Database connection function
const database = async function connectToDatabase() {
    try {
      await mongoose.connect("mongodb://localhost/loginRegistrationApp");
      console.log(`Database Connected!`);
    } catch (error) {
      console.log(error);
    }
  }

  module.exports = database;
