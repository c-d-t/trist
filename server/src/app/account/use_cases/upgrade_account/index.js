const accountRepo = require('../../repo');
const UpgradeController = require('./controller');
const UpgradeApplication = require('./application');

const upgrade = new UpgradeApplication(accountRepo);
const upgradePut = new UpgradeController(upgrade);

module.exports = upgradePut;
