const GetChannelApplication = require('./application');
const GetChannelController = require('./controller');
const { messagingView, channelRepo } = require('../../repo');

const getChannelUseCase = new GetChannelApplication(channelRepo, messagingView);
const getChannel = new GetChannelController(getChannelUseCase);

module.exports = getChannel;
