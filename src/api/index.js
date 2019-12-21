const router = require('express').Router();

const auth = require('./auth');
router.use('/auth', auth);

const group = require('./group');
router.use('/group', group);

module.exports = router;
