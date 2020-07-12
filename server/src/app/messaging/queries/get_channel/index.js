const GetChannelApplication = require('./application');
const GetChannelController = require('./controller');
const { channelRepo } = require('../../repo');
const messageModel = require('../../repo/models/Message');

const getChannelUseCase = new GetChannelApplication(channelRepo, messageModel);
const getChannel = new GetChannelController(getChannelUseCase);

module.exports = getChannel;
