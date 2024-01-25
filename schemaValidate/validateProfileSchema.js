const Joi = require('joi');

// User Id  Validation Schema 
const userIdSchema = Joi.string().required();

// Profile Create Validation Schema 
const profileCreateSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    nid: Joi.number().integer().min(8).required(),
    age: Joi.number().integer().required(),
    marital_status: Joi.string().required(),
});

// Profile Update Validation Schema 
const profileUpdateSchema = Joi.object({
    user_id: Joi.string(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    nid: Joi.number().integer(),
    age: Joi.number().integer(),
    marital_status: Joi.string(),
});

module.exports = { userIdSchema, profileCreateSchema, profileUpdateSchema };