const { Contact } = require('../../models/contact');

/* get array of all contacts in json-format with status 200 */
/* add pagination 1page limit 20 contacts */
/* add filter for favorite to get all contacts with favorite status */

const getAllContacts = async (req, res, next) => {
  try {
    const {_id: owner} = req.user;
    const {page = 1, limit = 20, favorite} = req.query;
    const skip = (page - 1) * limit;

    if (favorite === 'true') {
     const contacts = await Contact.find({ owner, favorite: true });
     res.status(200).json(contacts);
    }

    const contacts = await Contact.find({owner}, '-createdAt -updatedAt', {skip, limit});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;
