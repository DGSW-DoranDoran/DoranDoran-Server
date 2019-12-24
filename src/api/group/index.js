const router = require('express').Router();
const groupCtrl = require('./groupCtrl');
const middleWareAuth = require('../../middleware/auth');
const commentCtrl = require('./commentCtrl');

router.get('/groups', groupCtrl.getGroups);
router.get('/info', groupCtrl.getGroupInfo);
router.post('/create', middleWareAuth, groupCtrl.createGroup);
router.put('/modify', middleWareAuth, groupCtrl.modifyGroup);
router.delete('/delete', middleWareAuth, groupCtrl.delete);

router.get('/comment', commentCtrl.getComments);
router.post('/comment', commentCtrl.write);

module.exports = router;