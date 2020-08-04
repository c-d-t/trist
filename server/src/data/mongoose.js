const config = require('../config');
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

if (process.env.NODE_ENV === 'development')
{
  mongoose.connect('mongodb://localhost:27017/trist', options);
}
else
{
  mongoose.connect(config.DB_URL, options);
}

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb database.');
});

module.exports = mongoose;
