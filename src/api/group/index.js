const router = require('express').Router();
const groupCtrl = require('./groupCtrl');

router.get('/groups', groupCtrl.getGroups);
router.get('/info', groupCtrl.getGroupInfo);
router.post('/create', groupCtrl.createGroup);
router.put('/modify', groupCtrl.modifyGroup);
router.delete('/delete', groupCtrl.delete);

module.exports = router;