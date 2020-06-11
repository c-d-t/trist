import mongoose from 'mongoose';

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
};

mongoose.connect('mongodb://127.0.0.1:27017/trist_test', options);

mongoose.on('connected', () => {
  console.log('connected to db');
});

module.exports = mongoose;