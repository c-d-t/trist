const Application = require('../../../../core/Application');
const Username = require('../../domain/username');
const Email = require('../../domain/email');
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
    let foundUser = null;
    foundUser = await this._accountRepo.findByUsername(input.usernameOrEmail);
    if (!foundUser) // login via email
    {
      foundUser = await this._accountRepo.findByEmail(input.usernameOrEmail);
    }

    if (!foundUser || !await foundUser.password.compare(input.password))
    {
      return this.failed(LoginErrors.InvalidCredentials);
    }

    const token = jwt.encode({ id: foundUser.id });
    const responseJSON = { token };
    return this.ok(responseJSON);
  }
}

module.exports = LoginApplication;
