const { profileUpdateSchema } = require('../schemaValidate/validateProfileSchema');

// Validate UpdateProfile
const validateUpdateProfile = async (req, res, next) => {
    try {
        const { first_name, last_name, nid, age, marital_status } = req.body;
        const profileData = { first_name, last_name, nid, age, marital_status };

        const { value, error } = profileUpdateSchema.validate(profileData);
        if (error) {
            throw new Error(`Update Profile Validation Error! ${error.message}`);
        }

        // No error occurred, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}


module.exports = validateUpdateProfile;