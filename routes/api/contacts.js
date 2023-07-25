const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const validateContact = require("../../middlewares/validateData");
const isValidId = require("../../middlewares/isValidId");
const validateFavorite = require("../../middlewares/validateFavorite");

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContact);

router.post("/", validateContact, ctrl.addNewContact);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put("/:contactId", isValidId, validateContact, ctrl.updateContactData);

router.patch("/:contactId/favorite", isValidId, validateFavorite, ctrl.updateStatusContact);

module.exports = router;
