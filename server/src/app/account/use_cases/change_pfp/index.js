const { accountRepo } = require('../../repo');
const ChangeDisplayNameController = require('./controller');
const ChangeDisplayNameApplication = require('./application');
const imageService = require('../../../../services/image');

const changeDisplayNameUseCase = new ChangeDisplayNameApplication(accountRepo, imageService);
const changeDisplayName = new ChangeDisplayNameController(changeDisplayNameUseCase);

module.exports = changeDisplayName;
