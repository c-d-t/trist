const Account = require('../../domain/account');
const accountRepo = require('../../db');
const Result = require('../../../../core/Result');

/**
 * Creates an account
 * @param {Object} props
 * @param {string} props.username
 * @param {string} props.password
 * @param {string} props.userId
 */
async function createAccount(props) {
  const accountOrError = Account.make(props);
  if (!accountOrError.isSuccessful()) {
    return accountOrError;
  }
  const account = accountOrError.getValue();
  await account.hashPassword();

  if (accountRepo.getByUsername(account)) {
    return Result.fail({ username: 'already exists.' });
  }

  if (accountRepo.getByUserId(account)) {
    return Result.fail({ user: 'already is registered.' });
  }

  const savedAccount = await accountRepo.save(account);

  return Result.succeed(savedAccount);
}

module.exports = createAccount;
