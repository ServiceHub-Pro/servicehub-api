import Joi from "joi";

export const registerUserValidator = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    contact: Joi.number().required(),
    avatar: Joi.string(),
    role: Joi.string().valid('user','customer')
});

export const loginUserValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const updateProfileValidator = Joi.object({
    name: Joi.string(),
    avatar: Joi.string()
});