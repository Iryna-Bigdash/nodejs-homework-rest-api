const { removeContact } = require("../../models/contacts");

/* deleted contact by id, if id correct show message 'contact deleted' or 'Not found' in in the opposite case */
const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    result
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteContact;
