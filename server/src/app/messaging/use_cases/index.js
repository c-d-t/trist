const createDm = require('./create_dm');
const sendMessage = require('./send_message');
const joinPrivateChannel = require('./join_private_channels');

const getDms = require('../queries/get_dms');
const getChannel = require('../queries/get_channel');

module.exports = {
  createDm,
  sendMessage,
  joinPrivateChannel,
  getDms,
  getChannel,
};