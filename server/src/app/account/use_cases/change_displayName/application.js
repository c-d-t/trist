const Application = require("../../../../core/Application");
const DisplayName = require('../../domain/displayName');

class ChangeDisplayNameApplication extends Application
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
   * @param {string} input.displayName
   */
  async run(input)
  {
    const account = await this._accountRepo.findById(input.thisAccountId);
    if (!account)
    {
      return this.notFound('An account with that id does not exist.');
    }

    const displayNameResult = DisplayName.make(input.displayName);
    if (displayNameResult.failed)
    {
      return this.invalidFields(displayNameResult.error);
    }
    const displayName = displayNameResult.value;

    if (account.isGuest && displayName.isEmpty)
    {
      return this.invalidFields({ account: 'A guest account cannot have an empty displayName' })
    }

    account.changeDisplayName(displayName);
    await this._accountRepo.save(account);

    return this.ok();
  }
}

module.exports = ChangeDisplayNameApplication;
