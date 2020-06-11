const CreateAccount = require('.');
const accountRepo = require('../../db/account_repo');

const createAccount = new CreateAccount(accountRepo);

module.exports = createAccount;