const AccountRepo = require('./repo');
const accountMap = require('./map');
const accountModel = require('./models/Account');

const accountRepo = new AccountRepo(accountMap, accountModel);

module.exports = accountRepo;
