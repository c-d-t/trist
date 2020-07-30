const { accountRepo } = require('../../repo');
const ChangeDisplayNameController = require('./controller');
const ChangeDisplayNameApplication = require('./application');

const changeDisplayNameUseCase = new ChangeDisplayNameApplication(accountRepo);
const changeDisplayName = new ChangeDisplayNameController(changeDisplayNameUseCase);

module.exports = changeDisplayName;
