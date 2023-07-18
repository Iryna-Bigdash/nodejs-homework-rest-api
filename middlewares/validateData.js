const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

/**
 if all field are missing(length === 0), return  message: 'missing fields' and 400 status, if some field is missing or has incorrect data type show default error message from Joi or return message which data is missing. Else if id is wrong we receive error 'Not found' and status 404, in case of successful completion contact will update, status 200    */
const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
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

  next();
};

module.exports = validateContact;
