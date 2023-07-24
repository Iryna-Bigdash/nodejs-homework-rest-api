const {Contact} = require('../../models/contact')

/* add new contact to array, before adding validate(by Joi) received data, if some field is missing or have incorrect data type show error. */
const addNewContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addNewContact;
