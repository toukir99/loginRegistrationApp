const { authSchema } = require('../schemaValidate/validateAuthSchema');

// Validate Auth
const validateAuth = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const authData = { email, password };

        const { value, error } = authSchema.validate(authData);
        if (error) {
            throw new Error(`Auth Validation Error: ${error.message}`);
        }
    
        // No error occurred, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
};

module.exports = validateAuth;