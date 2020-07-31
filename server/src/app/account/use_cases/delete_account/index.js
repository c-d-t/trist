const { accountRepo } = require('../../repo');
const DeleteAccountController = require('./controller');
const DeleteAccountApplication = require('./application');
const imageService = require('../../../../services/image');

const deleteAccountUseCase = new DeleteAccountApplication(accountRepo, imageService);
const deleteAccount = new DeleteAccountController(deleteAccountUseCase);

module.exports = deleteAccount;
