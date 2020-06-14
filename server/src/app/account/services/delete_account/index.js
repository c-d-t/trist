const User = require('../../domain/user');
const Result = require('../../../../core/Result');
const userRepo = require('../../db');

/**
 * Soft deletes a user with userId
 * @param {Object} props
 * @param {string} props.userId 
 */
async function deleteAccount(props) {
  const userToDelete = await userRepo.getById(props.userId);
  if (!userToDelete) {
    return Result.fail({ user: 'does not exist.' });
  }
  userToDelete.delete();
  // delete account
  return Result.succeed(null);
}

module.exports = deleteAccount;
