const CreateOpenChannelApplication = require('./application');
const CreateOpenChannelController = require('./controller');
const { userRepo, channelRepo } = require('../../repo');

const createOpenChannelUseCase = new CreateOpenChannelApplication(userRepo, channelRepo);
const createOpenChannel = new CreateOpenChannelController(createOpenChannelUseCase);

module.exports = createOpenChannel;
