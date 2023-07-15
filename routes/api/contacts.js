const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const express = require("express");

const router = express.Router();

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

/* get array of all contacts in json-format with status 200 */
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

/* get object of one contact by id in json-format with status 200, if is isn't correct, return object with message 'Not found' and status 404    */
router.get("/:contactId", async (req, res, next) => {
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
});

/* add new contact to array, before adding validate(by Joi) received data, if some field is missing or have incorrect data type show error. */
router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      const missingField = error.details[0].context.label;
      const errorMessage =
        error.message || `missing required ${missingField} field`;
      return res.status(400).json({ message: errorMessage });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

/* deleted contact by id, if id correct show message 'contact deleted' or 'Not found' in in the opposite case */
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    result
      ? res.status(200).json({ message: "contact deleted" })
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

/* updates the data in a specific object, which we get by id, if all field are missing(length === 0), return  message: 'missing fields' and 400 status, if some field is missing or has incorrect data type show default error message from Joi or return message which data is missing. Else if id is wrong we receive error 'Not found' and status 404, in case of successful completion contact will update, status 200    */
router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    if (error) {
      const missingField = error.details[0].context.label;
      const errorMessage =
        error.message || `missing required ${missingField} field`;
      return res.status(400).json({ message: errorMessage });
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    result
      ? res.status(200).json(result)
      : res.status(404).json({ message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
