const { updateFavoriteSchema } = require("../models/contact");

const validateFavorite = (req, res, next) => {
  const { error } = updateFavoriteSchema.validate(req.body);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
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
      .json({ message: `missing required ${missingField} field` });
  }
};

module.exports = validateFavorite;
