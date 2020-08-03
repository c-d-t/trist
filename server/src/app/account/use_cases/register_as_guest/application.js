const Application = require('../../../../core/Application');
const Account = require('../../domain/account');
const Username = require('../../domain/username');
const Pfp = require('../../domain/pfp');
const onAccountCreation = require('../../services/onAccountCreation');
const jwt = require('../../services/jwt');

class RegisterAsGuestApplication extends Application
{
  constructor(accountRepo)
  {
    super();
    this._accountRepo = accountRepo;
  }

  /**
   * Registers a guest account
   * @param {Object} input 
   * @param {string} input.username
   */
  async run(input)
  {
    const usernameResult = Username.make(input.username);
    if (usernameResult.failed)
    {
      return this.invalidFields({ username: usernameResult.error });
    }

    const username = usernameResult.value;
    const pfp = Pfp.make().value;
    const accountResult = Account.make({ username, pfp, status: 0 });
    if (accountResult.failed)
    {
      return this.failed(accountResult.error);
    }

    const newAccount = accountResult.value;
    const account = await this._accountRepo.save(newAccount);
    
    await onAccountCreation.run(account.id);
    
    const token = jwt.encode({ id: account.id });
    const responseJSON = {
      token,
      id: account.id,
      status: account.status,
      username: account.username.value,
      pfp: account.pfp.url,
    };

    return this.ok(responseJSON);  }
}

module.exports = RegisterAsGuestApplication;
