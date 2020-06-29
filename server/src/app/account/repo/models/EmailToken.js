const mongoose = require('../../../../data/mongoose');

const EmailTokenSchema = mongoose.Schema({
  token: String,
  expiry: Date,
});

module.exports = mongoose.model("Email_Token", EmailTokenSchema);
