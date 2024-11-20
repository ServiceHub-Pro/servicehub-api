import Joi from "joi";

export const addBookingValidator = Joi.object({
    service: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
  });

