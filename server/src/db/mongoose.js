const config = require('../config');
const mongoose = require('mongoose');

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

switch(process.env.NODE_ENV) {
  case 'test':
    mongoose.connect('mongodb://127.0.0.1:27017/trist_test', options);
    break;
  case 'development':
    mongoose.connect('mongodb://127.0.0.1:27017/trist', options);
    break;
  case 'production':
    mongoose.connect(config.DB_URL, options);
    break;
  default:
    break;
}

mongoose.connection.on('connected', () => {
  console.log('connected to db');
});

module.exports = mongoose;