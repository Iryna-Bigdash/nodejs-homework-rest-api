const { updateContact } = require("../../models/contacts");

/* updates the data in a specific object, which we get by id */
const updateContactData = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactData;
