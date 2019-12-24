const router = require('express').Router();
const groupCtrl = require('./groupCtrl');
const middleWareAuth = require('../../middleware/auth');

router.get('/groups', groupCtrl.getGroups);
router.get('/info', groupCtrl.getGroupInfo);
router.post('/create', groupCtrl.createGroup);
router.put('/modify', middleWareAuth, groupCtrl.modifyGroup);
router.delete('/delete', middleWareAuth, groupCtrl.delete);

module.exports = router;