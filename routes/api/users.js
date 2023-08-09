const express = require('express');
const { userAuth: ctrl } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');
const validateUser = require('../../middlewares/validateUser');
const upload = require('../../middlewares/upload');

const router = express.Router();

router.post('/register', ctrl.register );

router.post('/login', validateUser, ctrl.login )

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router;