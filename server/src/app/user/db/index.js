const AccountRepo = require('./AccountRepo');

const AccountModel = require('./AccountModel');
const AccountMap = require('./AccountMap');

const accountRepo = new AccountRepo(AccountModel, AccountMap);

module.exports = accountRepo;
