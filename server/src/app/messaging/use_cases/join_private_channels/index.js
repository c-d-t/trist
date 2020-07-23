const JoinRandomChatApplication = require('./application');
const JoinRandomChatController = require('./controller');
const { channelRepo, userRepo } = require('../../repo');

const joinRandomChatUseCase = new JoinRandomChatApplication(channelRepo, userRepo);
const joinRandomChat = new JoinRandomChatController(joinRandomChatUseCase);

module.exports = joinRandomChat;
