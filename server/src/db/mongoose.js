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
  console.log(`connected to ${process.env.NODE_ENV} db`);
});

mongoose.connection.once('open', async () => {
  if (process.env.NODE_ENV === 'test') {
    const collections = Object.keys(mongoose.connection.collections);
    collections.forEach(async (collectionName) => {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany();
    })
    console.log('deleted collections');
  }
});

module.exports = mongoose;