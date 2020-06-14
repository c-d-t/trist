const accountRepo = require('../../db');
const Result = require('../../../../core/Result');

/**
 * Gets an account
 * @param {Object} props
 * @param {string} props.username
 */
async function getAccount(props) {
  const foundAccount = await accountRepo.getByUsername(props.username);
  if (!foundAccount) {
    return Result.fail({ account: `${props.username} does not exist.` })
  }
  return Result.succeed(foundAccount);
}

module.exports = getAccount;
