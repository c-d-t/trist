const SendMessageApplication = require('./application');
const SendMessageController = require('./controller');
const { messageRepo, channelRepo, userRepo } = require('../../repo');
const eventEmitter = require('../../../../infra/events');

const sendMessage = new SendMessageApplication(messageRepo, channelRepo, userRepo, eventEmitter);
const sendMessagePost = new SendMessageController(sendMessage);

module.exports = sendMessagePost;
