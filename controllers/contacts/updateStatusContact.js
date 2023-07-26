// /* updates the favorite field in an object, which we get by id */
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
