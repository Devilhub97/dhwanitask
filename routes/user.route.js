var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller');
const auth = require('../middleware/authentication');

router.post('/login', [userController.login]);
router.post('/logout', auth.userAuthentication, [userController.logout]);

module.exports = router;