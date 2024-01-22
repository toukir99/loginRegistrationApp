// models/profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    nid: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    profilePhoto: {
        type: String,
        required: false,
    },
    marital_status: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const Profile = mongoose.model("profileModel", profileSchema);
module.exports = Profile;