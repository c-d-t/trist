const mongoose = require('../../../db');

const UserSchema = mongoose.Schema({
  displayName: String,
  username: String,
});

module.exports = mongoose.model('User', UserSchema);
