const group = require('express').Router();
const commentCtrl = require('./comment.ctrl');

group.get('/comment', commentCtrl.getComment);
group.post('/comment', commentCtrl.postComment);

module.exports = group;