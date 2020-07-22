const { accountRepo } = require('../../repo');
const RegisterController = require('./controller');
const RegisterApplication = require('./application');

const register = new RegisterApplication(accountRepo);
const registerPost = new RegisterController(register);

module.exports = registerPost;
