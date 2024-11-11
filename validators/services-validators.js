import Joi from "joi";

export const addServiceValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required()
});

export const updateServiceValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().optional(),
    category: Joi.string().required(),
    location: Joi.string().required()
});