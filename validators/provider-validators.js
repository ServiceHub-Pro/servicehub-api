import Joi from "joi";

export const registerProviderValidator = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('customer','provider')
});

export const loginProviderValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const updateProviderValidator = Joi.object({
    name: Joi.string(),
    avatar: Joi.string()
});