const router = require('express').Router();
const authCtrl = require('./authCtrl');

router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);
router.get('/info', authCtrl.findInfo);

module.exports = router;