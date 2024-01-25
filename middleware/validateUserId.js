const { userIdSchema } = require('../schemaValidate/validateProfileSchema');

// Validate User Id
const validateUserId = async (req, res, next) => {
    try {
        const userId = req.params.user_id;

        const { value, error } = userIdSchema.validate(userId);
        if (error) {
            throw new Error(`User Id Validation Error: ${error.message}`);
        }
     
        // No error occurred, proceed to the next middleware or route
        next();
    } catch(error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = validateUserId;

