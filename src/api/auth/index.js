const auth = require('express').Router();
const authCtrl = require('./auth.ctrl');

auth.post('/login', authCtrl.login);

module.exports = auth;