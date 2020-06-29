const router = require('express').Router();
const accountController = require('../../app/account/use_cases');
const relationsController = require('../../app/relations/use_cases');
const middleware = require('./middleware');

router.post('/account/register', (req, res) => accountController.register.run(req, res));
router.post('/account/login', (req, res) => accountController.login.run(req, res));
router.post('/account/logout', (req, res) => accountController.logout.run(req, res));
router.post('/account/register-as-guest', (req, res) => accountController.registerAsGuest.run(req, res));
router.put('/account/upgrade',
  middleware.authenticated(),
  (req, res) => accountController.upgrade.run(req, res),
);

router.use(middleware.authenticated());
router.post('/friends/request', (req, res) => relationsController.sendFriendRequest.run(req, res));
router.post('/friends/accept', (req, res) => relationsController.acceptFriendRequest.run(req, res));

module.exports = router;