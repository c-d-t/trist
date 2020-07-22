const JoinRandomChatApplication = require('./application');
const JoinRandomChatController = require('./controller');
const { channelRepo, userRepo } = require('../../repo');
const eventEmitter = require('../../../../infra/events');

const joinRandomChatUseCase = new JoinRandomChatApplication(channelRepo, userRepo, eventEmitter);
const joinRandomChat = new JoinRandomChatController(joinRandomChatUseCase);

module.exports = joinRandomChat;
