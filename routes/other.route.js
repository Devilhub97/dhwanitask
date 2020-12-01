var express = require('express');
var router = express.Router();

const otherController = require('../controllers/other.controller');
const auth = require('../middleware/authentication');

router.post('/createstate', auth.userAuthentication, [otherController.createState]);
router.get('/getstatelist', auth.userAuthentication, [otherController.getStateList]);
router.post('/createdistrict', auth.userAuthentication, [otherController.createDistrict]);
router.get('/getdistrict/:stateid', auth.userAuthentication, [otherController.getDistrict]);
router.post('/createchildprofile', auth.userAuthentication, [otherController.createChildProfile]);
router.get('/getchildprofile', auth.userAuthentication, [otherController.getChildProfile])

module.exports = router;