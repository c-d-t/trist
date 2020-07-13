const MessagingView = require('./messagingView');
const channelMap = require('./channelMap');
const channelModel = require('./models/Channel');
const ChannelRepo = require('./channelRepo');
const messageMap = require('./messageMap');
const messageModel = require('./models/Message');
const MessageRepo = require('./messageRepo');
const userMap = require('./userMap');
const userModel = require('./models/User');
const UserRepo = require('./userRepo');

const messagingView = new MessagingView(userModel, messageModel);
const channelRepo = new ChannelRepo(channelMap, channelModel);
const messageRepo = new MessageRepo(messageMap, messageModel);
const userRepo = new UserRepo(userMap, userModel);

module.exports = {
  channelRepo,
  messageRepo,
  userRepo,
  messagingView,
};
