const router = require('express').Router();
const accountController = require('../../app/account/use_cases');
const middleware = require('./middleware');

router.post('/register', (req, res) => accountController.register.run(req, res));
router.post('/login', (req, res) => accountController.login.run(req, res));
router.post('/logout', (req, res) => accountController.logout.run(req, res));
router.post('/register-as-guest', (req, res) => accountController.registerAsGuest.run(req, res));
router.put('/upgrade',
  middleware.authenticated(),
  (req, res) => accountController.upgrade.run(req, res),
);

module.exports = router;
