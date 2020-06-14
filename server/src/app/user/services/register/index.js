const User = require('../../domain/user');
const Result = require('../../../../core/Result');
const userRepo = require('../../db');
const accountServices = require('../../../account/services');
const accountRepo = require('../../../account/db');

/**
 * Registers a user
 * @param {Object} props
 * @param {string} props.currentUserId
 * @param {string} props.username
 * @param {string} props.password
 * @param {string} props.displayName
 * @returns User and account
 */
async function register(props) {
  let userId = props.currentUserId;
  if (!props.currentUserId) {
    const userOrError = User.make({ displayName: props.displayName });
    if (!userOrError.isSuccessful()) {
      return userOrError;
    }
    const user = userOrError.getValue();
    const currentUser = await userRepo.save(user);
    userId = currentUser.getId();
  }
  
  const accountOrError = await accountServices.createAccount({
    username: props.username,
    password: props.password,
    userId,
  });

  if (!accountOrError.isSuccessful()) {
    return accountOrError;
  }

  return Result.succeed({ user: savedUser, account: savedAccount });
}

module.exports = register;