const router = require('express').Router();
const authCtrl = require('./authCtrl');

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

module.exports = router;