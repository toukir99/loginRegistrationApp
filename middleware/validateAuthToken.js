const { authTokenSchema } = require('../schemaValidate/validateAuthSchema');

// Validate Auth Token
const validateAuthToken = async (req, res, next) => {
    try {
        const authToken = req.headers.auth_token;
  
        const { value, error } = authTokenSchema.validate(authToken);
        if (error) {
            res.status(403).json(`Auth Token Validation error: ${error.message}`);
        }

        // No error occurred, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: error.message });
    }
}

module.exports = validateAuthToken;