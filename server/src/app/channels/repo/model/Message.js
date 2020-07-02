const mongoose = require('../../../../data');

const MessageSchema = mongoose.Schema({
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel'},
  body: String,
  timeCreated: Date,
});

module.exports = mongoose.model('Channel', MessageSchema);
