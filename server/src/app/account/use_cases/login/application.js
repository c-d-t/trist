const Application = require('../../../../core/Application');
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
   * @param {string} input.email
   * @param {string} input.password
   */
  async run(input)
  {
    const foundAccount = await this._accountRepo.findByEmail(input.email);

    if (!foundAccount || !await foundAccount.password.compare(input.password))
    {
      return this.unauthorized({ fields: 'Email or password is incorrect.' });
    }

    if (!foundAccount.isVerified)
    {
      return this.unauthorized({ account: 'You need to confirm your email address before logging in.'})
    }

    const token = jwt.encode({ id: foundAccount.id });

    const responseJSON = {
      token,
      id: foundAccount.id,
      status: foundAccount.status,
      username: foundAccount.username.value,
      pfp: foundAccount.pfp.url,
    };
    return this.ok(responseJSON);
  }
}

module.exports = LoginApplication;
