const mongoose = require('../../../../data');

const ChannelSchema = mongoose.Schema({
  type: Number,
  title: String,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  participantIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
});

module.exports = mongoose.model('Channel', ChannelSchema);
