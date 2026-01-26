import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
  category: Joi.string().max(100).required(),
  image: Joi.string().uri().allow('').optional(),
  featured: Joi.boolean().optional(),
  available: Joi.boolean().optional(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).positive().optional(),
  category: Joi.string().max(100).optional(),
  image: Joi.string().uri().allow('').optional(),
  featured: Joi.boolean().optional(),
  available: Joi.boolean().optional(),
});