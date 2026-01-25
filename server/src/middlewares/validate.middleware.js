export const validate = (schema) => {
  return (req, res, next) => {
    // abortEarly: false = return all errors, not just the first one
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      res.status(400);
      // Pass the validation error to the global error handler
      return next(new Error(errorMessages.join(", ")));
    }

    // Replace req.body with the validated (and potentially typed) value
    req.body = value;
    next();
  };
};