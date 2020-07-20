const router = require('express').Router();
const accountController = require('../../app/account/use_cases');
const relationsController = require('../../app/relations/use_cases');
const messagingController = require('../../app/messaging/use_cases');
const middleware = require('./middleware');

router.post('/account/register', (req, res) => accountController.register.run(req, res));
router.post('/account/login', (req, res) => accountController.login.run(req, res));
router.post('/account/logout', (req, res) => accountController.logout.run(req, res));
router.post('/account/register-as-guest', (req, res) => accountController.registerAsGuest.run(req, res));

router.use(middleware.authenticated());
router.get('/account/marco', (req, res) => accountController.marco.run(req, res));
router.put('/account/upgrade', (req, res) => accountController.upgrade.run(req, res));

router.get('/friends', (req, res) => relationsController.getFriends.run(req, res));
router.delete('/friends', (req, res) => relationsController.removeRelationship.run(req, res));
router.get('/friends/requests', (req, res) => relationsController.getRequests.run(req, res));
router.post('/friends/request', (req, res) => relationsController.sendFriendRequest.run(req, res));
router.post('/friends/accept', (req, res) => relationsController.acceptFriendRequest.run(req, res));

router.post('/channel', (req, res) => messagingController.createDm.run(req, res));
router.get('/channel', (req, res) => messagingController.getDms.run(req, res));
router.post('/channel/messages', (req, res) => messagingController.sendMessage.run(req, res));
router.get('/channel/messages', (req, res) => messagingController.getChannel.run(req, res));

module.exports = router;
