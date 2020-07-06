const SendMessageApplication = require('./application');
const SendMessageController = require('./controller');
const { messageRepo, channelRepo, userRepo } = require('../../repo');

const sendMessage = new SendMessageApplication(messageRepo, channelRepo, userRepo);
const sendMessagePost = new SendMessageController(sendMessage);

module.exports = sendMessagePost;
