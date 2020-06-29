const mongoose = require('../mongoose');

const AccountSchema = mongoose.Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  status: Number, // -2=deleted -1=banned 0=guest 1=registered 2=emailVerified
  timeCreated: Date,
});

module.exports = mongoose.model('Account', AccountSchema);
