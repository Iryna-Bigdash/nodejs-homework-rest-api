const express = require('express');
const { userAuth: ctrl } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');
const validateUser = require('../../middlewares/validateUser');

const router = express.Router();

router.post('/register', ctrl.register );

router.post('/login', validateUser, ctrl.login )

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, ctrl.updateSubscription);

module.exports = router;