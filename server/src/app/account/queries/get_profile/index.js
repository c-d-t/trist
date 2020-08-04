const GetProfileController = require('./controller');
const GetProfileApplication = require('./application');
const Account = require('../../repo/models/Account');

const getProfileUseCase = new GetProfileApplication(Account);
const getProfile = new GetProfileController(getProfileUseCase);

module.exports = getProfile;
