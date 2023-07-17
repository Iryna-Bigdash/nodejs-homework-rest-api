const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const validateContact = require("../../middlewares/validateData");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", ctrl.getContact);

router.post("/", validateContact, ctrl.addNewContact);

router.delete("/:contactId", ctrl.deleteContact);

router.put("/:contactId", validateContact, ctrl.updateContactData);

module.exports = router;
