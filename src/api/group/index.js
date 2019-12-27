const router = require('express').Router();
const groupCtrl = require('./groupCtrl');
const middleWareAuth = require('../../middleware/auth');
const commentCtrl = require('./commentCtrl');

router.get('/groups', groupCtrl.getGroups);
router.get('/info', groupCtrl.getGroupInfo);
router.post('/create', middleWareAuth, groupCtrl.createGroup);
router.post('/join', middleWareAuth, groupCtrl.joinGroup);
router.put('/accept', middleWareAuth, groupCtrl.accecptJoin);
router.put('/modify', middleWareAuth, groupCtrl.modifyGroup);
router.put('/trans', middleWareAuth, groupCtrl.transferAdmin);
router.put('/lock', middleWareAuth, groupCtrl.lockGroup);
router.delete('/delete', middleWareAuth, groupCtrl.delete);
router.delete('/secession', middleWareAuth, groupCtrl.secession);


router.get('/comment', commentCtrl.getComments);
router.post('/comment', commentCtrl.write);

module.exports = router;