const router = require('express').Router();
const groupCtrl = require('./groupCtrl');
const commentCtrl = require('./commentCtrl');

router.get('/groups', groupCtrl.getGroups);
router.get('/info', groupCtrl.getGroupInfo);
router.post('/create', groupCtrl.createGroup);
router.put('/modify', groupCtrl.modifyGroup);
router.delete('/delete', groupCtrl.delete);

router.get('/comment', commentCtrl.getComments);
router.post('/comment', commentCtrl.write);

module.exports = router;