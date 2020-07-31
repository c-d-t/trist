const { accountRepo } = require('../../repo');
const ChangePfpController = require('./controller');
const ChangePfpApplication = require('./application');
const imageService = require('../../../../services/image');

const changePfpUseCase = new ChangePfpApplication(accountRepo, imageService);
const changePfp = new ChangePfpController(changePfpUseCase);

module.exports = changePfp;
