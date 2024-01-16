// models/auth.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Creating auth model
const Auth = sequelize.define('Auth', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    auth_token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
}, {
    timestamps: true, 
});

module.exports = Auth;
