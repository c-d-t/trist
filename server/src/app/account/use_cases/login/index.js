const { accountRepo } = require('../../repo');
const LoginController = require('./controller');
const LoginApplication = require('./application');

const login = new LoginApplication(accountRepo);
const loginPost = new LoginController(login);

module.exports = loginPost;
