const { schemas } = require("../models/user");

const validateVerifyEmail = (req, res, next) => {
  const { error } = schemas.userEmailSchema.validate(req.body);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing required field email" });
  }

  if (error) {
    const missingField = error.details[0].context.label;
    const errorMessage = error.details[0].message;
    const dataTypeError = error.details[0].type === "any.required";

    if (!dataTypeError) {
      return res.status(400).json({
        message: `Invalid data type for ${missingField}: ${errorMessage}`,
      });
    }
    return res
      .status(400)
      .json({ message: `missing required field ${missingField}` });
  }

  next();
};

module.exports = validateVerifyEmail;
