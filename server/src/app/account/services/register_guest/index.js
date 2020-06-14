const User = require('../../domain/user');
const Result = require('../../../../core/Result');
const userRepo = require('../../db');

/**
 * registers a guest user
 * @param {Object} props
 * @param {string} props.displayName
 */
async function registerGuest(props) {
  const userOrError = User.make(props);
  if (!userOrError.isSuccessful()) {
    return userOrError;
  }
  const user = userOrError.getValue();
  
  const savedUser = await userRepo.save(user);

  return Result.succeed(savedUser);
}

module.exports = registerGuest;