const router = require('express').Router();
const accountController = require('../../app/account/use_cases');

router.post('/register', (req, res) => accountController.register.run(req, res));
router.post('/login', (req, res) => accountController.login.run(req, res));
router.post('/logout', (req, res) => accountController.logout.run(req, res));

module.exports = router;
