const Application = require('../../../../core/Application');
const makeUsername = require('../../domain/username');
const makeEmail = require('../../domain/email');
const LoginErrors = require('./errors');

class LoginApplication extends Application
{
  constructor(userRepo)
  {
    this._userRepo = userRepo;
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
    const usernameResult = makeUsername(input.username);
    const emailResult =  makeEmail(input.email);

    let foundUser = null;
    if (usernameResult.succeeded) // login via username
    {
      const username = usernameResult.value;
      foundUser = await this._userRepo.findById(username);
    }
    else if (emailResult.succeeded) // login via email
    {
      const email = emailResult.value;
      foundUser = await this._userRepo.findById(email);
    }

    if (!foundUser || !await foundUser.checkPassword(input.password))
    {
      return this.failed(LoginErrors.InvalidCredentials);
    }

    // make token
    const responseJSON = {
      token: ':p',
    };
    return this.ok(responseJSON);
  }
}

module.exports = LoginApplication;
