const { accountRepo } = require('../../repo');
const UpgradeController = require('./controller');
const UpgradeApplication = require('./application');
const emailService = require('../../../../services/email');

const upgrade = new UpgradeApplication(accountRepo, emailService);
const upgradePut = new UpgradeController(upgrade);

module.exports = upgradePut;
