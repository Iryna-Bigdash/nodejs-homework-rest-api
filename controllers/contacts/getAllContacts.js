const { Contact } = require('../../models/contact');

/* get array of all contacts in json-format with status 200 */
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
