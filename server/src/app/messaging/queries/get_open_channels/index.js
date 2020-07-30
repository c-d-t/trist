const GetOpenChannelsApplication = require('./application');
const GetOpenChannelsController = require('./controller');
const { messagingView } = require('../../repo');

const getOpenChannels = new GetOpenChannelsApplication(messagingView);
const getOpenChannelsGet = new GetOpenChannelsController(getOpenChannels);

module.exports = getOpenChannelsGet;