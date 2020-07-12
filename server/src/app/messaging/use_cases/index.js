const createDm = require('./create_dm');
const sendMessage = require('./send_message');

const getDms = require('../queries/get_dms');
const getChannel = require('../queries/get_channel');

module.exports = {
  createDm,
  sendMessage,
  getDms,
  getChannel,
};