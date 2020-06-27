const mongoose = require('mongoose');

mongoose.connect('http:localhost:27017/trist');

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb database.');
});

module.exports = mongoose;
