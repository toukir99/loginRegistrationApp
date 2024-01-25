const { profileCreateSchema } = require('../schemaValidate/validateProfileSchema');

// Validate Create Profile
const validateCreateProfile = async (req, res, next) => {
    try {
        const { first_name, last_name, nid, age, marital_status } = req.body;
        const profileData = { first_name, last_name, nid, age, marital_status };

        const { value, error } = profileCreateSchema.validate(profileData);
        if (error) {
            throw new Error(`Create Profile Validation Error! ${error.message}`);
        }

        // No error occurred, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = validateCreateProfile;