const Joi = require('joi');

// Auth Validation Schema 
const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Auth Token Validation Schema 
const authTokenSchema = Joi.string().required();

module.exports = { authSchema, authTokenSchema };