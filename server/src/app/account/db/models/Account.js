import mongoose from '../../../../db';

const AccountSchema = mongoose.Schema({
  username: String,
  password: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Account', AccountSchema);
