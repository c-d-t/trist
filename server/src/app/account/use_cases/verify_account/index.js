const VerifyAccountApplication = require('./application');
const VerifyAccountController = require('./controller');
const { accountRepo } = require('../../repo');
const jwt = require('../../services/jwt');

const verifyAccountUseCase = new VerifyAccountApplication(accountRepo, jwt);
const verifyAccount = new VerifyAccountController(verifyAccountUseCase);

module.exports = verifyAccount;
