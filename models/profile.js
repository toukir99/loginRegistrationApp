// models/profile.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Creating profile model
const Profile = sequelize.define('Profile', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nid: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    marital_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
}, {
    timestamps: true,
});

module.exports = Profile;
