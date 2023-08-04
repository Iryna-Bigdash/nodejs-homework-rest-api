const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const validateContact = require("../../middlewares/validateData");
const isValidId = require("../../middlewares/isValidId");
const validateFavorite = require("../../middlewares/validateFavorite");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:contactId", authenticate, isValidId, ctrl.getContact);

router.post("/", authenticate, validateContact, ctrl.addNewContact);

router.delete("/:contactId", authenticate, isValidId, ctrl.deleteContact);

router.put("/:contactId", authenticate, isValidId, validateContact, ctrl.updateContactData);

router.patch("/:contactId/favorite", authenticate, isValidId, validateFavorite, ctrl.updateStatusContact);

module.exports = router;
