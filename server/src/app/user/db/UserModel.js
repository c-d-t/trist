const mongoose = require('../../../db');

const UserSchema = mongoose.Schema({
  displayName: String,
});

module.exports = mongoose.model('User', UserSchema);
