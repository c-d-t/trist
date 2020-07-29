const mongoose = require('../../../../data/mongoose');

const AccountSchema = mongoose.Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  type: Number, // -1=deleted 0=guest 1=registered 2=emailVerified
  timeCreated: Date,
});

module.exports = mongoose.model('Account', AccountSchema);
