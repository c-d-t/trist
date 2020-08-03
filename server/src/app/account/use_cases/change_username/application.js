const Application = require("../../../../core/Application");
const Username = require('../../domain/username');

class ChangeUsernameApplication extends Application
{
  constructor(accountRepo)
  {
    super();
    this._accountRepo = accountRepo;
  }

  /**
   * 
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.username
   */
  async run(input)
  {
    const account = await this._accountRepo.findById(input.thisAccountId);
    if (!account)
    {
      return this.notFound('An account with that id does not exist.');
    }

    const usernameResult = Username.make(input.username);
    if (usernameResult.failed)
    {
      return this.invalidFields(usernameResult.error);
    }
    const username = usernameResult.value;

    account.changeUsername(username);
    await this._accountRepo.save(account);

    return this.ok();
  }
}

module.exports = ChangeUsernameApplication;
