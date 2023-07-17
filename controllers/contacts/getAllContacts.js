const { listContacts } = require("../../models/contacts");

/* get array of all contacts in json-format with status 200 */
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
