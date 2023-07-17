const { getContactById } = require("../../models/contacts");

/* get object of one contact by id in json-format with status 200, if is isn't correct, return object with message 'Not found' and status 404    */
const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;
