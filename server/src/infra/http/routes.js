const router = require('express').Router();
const accountController = require('../../app/account/use_cases');
const middleware = require('./middleware');

router.post('/register', (req, res) => accountController.register.run(req, res));
router.post('/login', (req, res) => accountController.login.run(req, res));
router.post('/logout', (req, res) => accountController.logout.run(req, res));

router.delete('/delete',
  middleware.authenticated(),
  (req, res) => res.json({ id: req.currentUser.id }),
);

module.exports = router;
