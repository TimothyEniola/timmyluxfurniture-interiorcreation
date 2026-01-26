import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "any.required": "Name is required",
    "string.max": "Name cannot exceed 100 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
  }),
  full_name: Joi.string().max(100).optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
