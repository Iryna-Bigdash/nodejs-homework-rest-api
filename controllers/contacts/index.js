const getAllContacts = require('./getAllContacts');
const getContact = require('./getContact');
const addNewContact = require('./addNewContact');
const deleteContact = require('./deleteContact');
const updateContactData = require('./updateContactData');
const updateFavorite = require('./updateFavorite');


module.exports = {
    getAllContacts,
    getContact,
    addNewContact,
    deleteContact,
    updateContactData,
    updateFavorite
}
