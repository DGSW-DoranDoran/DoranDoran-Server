const router = require('express').Router();
const auth = require('./auth');
const group = require('./group');

router.use('/auth', auth);
router.use('/group', group);

module.exports = router;