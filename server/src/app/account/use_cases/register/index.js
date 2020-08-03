const { accountRepo } = require('../../repo');
const RegisterController = require('./controller');
const RegisterApplication = require('./application');
const emailService = require('../../../../services/email');

const register = new RegisterApplication(accountRepo, emailService);
const registerPost = new RegisterController(register);

module.exports = registerPost;
