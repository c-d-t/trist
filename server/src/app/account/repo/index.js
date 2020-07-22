const AccountView = require('./accountView');
const AccountRepo = require('./repo');
const accountMap = require('./map');
const accountModel = require('./models/Account');

const accountView = new AccountView(accountModel);
const accountRepo = new AccountRepo(accountMap, accountModel);

module.exports = {
  accountRepo,
  accountView,
};
