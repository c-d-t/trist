const Application = require('../../../../core/Application');
const LoginErrors = require('./errors');
const jwt = require('../../services/jwt');

class LoginApplication extends Application
{
  constructor(accountRepo)
  {
    super();
    this._accountRepo = accountRepo;
  }

  /**
   * Checks if a user exists with username/email and password
   * @param {Object} input
   * @param {string} input.usernameOrEmail
   * @param {string} input.password
   */
  async run(input)
  {
    let foundAccount = null;
    foundAccount = await this._accountRepo.findByUsername(input.usernameOrEmail);
    if (!foundAccount) // login via email
    {
      foundAccount = await this._accountRepo.findByEmail(input.usernameOrEmail);
    }

    if (!foundAccount || !await foundAccount.password.compare(input.password))
    {
      return this.failed(LoginErrors.InvalidCredentials);
    }

    const token = jwt.encode({ id: foundAccount.id });
    const responseJSON = {
      token,
      id: foundAccount.id,
      username: foundAccount.username.value,
      displayName: foundAccount.displayName.value,
    };
    return this.ok(responseJSON);
  }
}

module.exports = LoginApplication;
