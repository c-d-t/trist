const mongoose = require('../mongoose');

const ChannelSchema = mongoose.Schema({
  type: Number,
  title: String,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  paticipantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
});

module.exports = mongoose.model('Channel', ChannelSchema);