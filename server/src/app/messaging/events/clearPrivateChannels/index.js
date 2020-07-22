const ClearPrivateChannels = require('./clearPrivateChannels');
const channel = require('../../repo/models/Channel');
const message = require('../../repo/models/Message');

const clearPrivateChannels = new ClearPrivateChannels(channel, message);

module.exports = clearPrivateChannels;
