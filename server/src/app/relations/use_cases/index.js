const sendFriendRequest = require('./send_friend_request');
const acceptFriendRequest = require('./accept_friend_request');

const getFriends = require('../queries/get_friends');

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
};
