const Result = require('../../../../core/Result');
const userRepo = require('../../db');

/**
 * Get a user by its id
 * @param {Object} props
 * @param {string} props.userId 
 */
async function getUser(props) {
  const foundUser = await userRepo.findById(props.userId);
  if (!foundUser) {
    return Result.fail({ user: 'no user with that id.' })
  }
  return Result.succeed(foundUser);
}

module.exports = getUser;
