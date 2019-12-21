const group = require('express').Router();
const groupCtrl = require('./group.ctrl');

group.get('/show', groupCtrl.showGroupPost);
group.get('/getGroup', groupCtrl.showAllGroupPost);
group.post('/create', groupCtrl.createGroupPost);
group.post('/delete', groupCtrl.deleteGroupPost);

module.exports = group;