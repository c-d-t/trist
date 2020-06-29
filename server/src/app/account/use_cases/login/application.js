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
   * @param {string} input.username
   * @param {string} input.password
   * @param {string} input.email
   */
  async run(input)
  {
    const usernameResult = Username.make(input.username);
    const emailResult =  Email.make(input.email);

    let foundUser = null;
    if (usernameResult.succeeded) // login via username
    {
      const username = usernameResult.value;
      foundUser = await this._accountRepo.findByUsername(username.value);
    }
    else if (emailResult.succeeded) // login via email
    {
      const email = emailResult.value;
      foundUser = await this._accountRepo.findByEmail(email.value);
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
