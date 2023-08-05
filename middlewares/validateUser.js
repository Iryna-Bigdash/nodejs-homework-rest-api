const { schemas } = require("../models/user");

const validateUser = (req, res, next) => {
  const { error } = schemas.loginSchema.validate(req.body);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  if (error) {
    const missingField = error.details[0].context.label;
    const errorMessage = error.details[0].message;
    const dataTypeError = error.details[0].type === "any.required";

    if (!dataTypeError || !errorMessage) {
      return res.status(401).json({
        message: "Email or password is wrong",
      });
    }
    return res
      .status(400)
      .json({ message: `missing required ${missingField} field` });
  }

  next();
};

module.exports = validateUser;
