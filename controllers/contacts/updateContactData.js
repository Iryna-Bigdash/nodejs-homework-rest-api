const { Contact } = require("../../models/contact");

/* updates the data in a specific object, which we get by id */
const updateContactData = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});

    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactData;
