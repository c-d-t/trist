const Application = require('../../../../core/Application');
const Account = require('../../domain/account');
const DisplayName = require('../../domain/displayName');
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
   * @param {string} input.displayName
   */
  async run(input)
  {
    const displayNameResult = DisplayName.make(input.displayName);
    if (displayNameResult.failed)
    {
      return this.invalidFields(displayNameResult.error);
    }

    const displayName = displayNameResult.value;
    const pfp = Pfp.make().result;
    const accountResult = Account.make({ displayName, pfp, status: 0 });
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
      displayName: account.displayName.value,
      pfp: !account.pfp ? null : account.pfp.url,
    };

    return this.ok(responseJSON);  }
}

module.exports = RegisterAsGuestApplication;
