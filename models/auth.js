// models/auth.js
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    auth_token: {
        type: 'UUID',
        default: () => randomUUID()
    },
},{
    timestamps: true,
});

const Auth = mongoose.model("authModel", authSchema);
module.exports = Auth;
