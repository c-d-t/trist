const createDm = require('./create_dm');
const sendMessage = require('./send_message');

const getDms = require('../queries/get_dms');

module.exports = {
  createDm,
  sendMessage,
  getDms,
};