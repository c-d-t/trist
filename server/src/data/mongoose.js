const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect('mongodb://localhost:27017/trist', options);

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb database.');
});

module.exports = mongoose;
