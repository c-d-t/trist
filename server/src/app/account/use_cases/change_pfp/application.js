const Application = require("../../../../core/Application");
const Pfp = require('../../domain/pfp');

class ChangePfpApplication extends Application
{
  constructor(accountRepo, imageService)
  {
    super();
    this._accountRepo = accountRepo;
    this._imageService = imageService;
  }

  /**
   * 
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.file
   */
  async run(input)
  {
    const account = await this._accountRepo.findById(input.thisAccountId);
    if (!account)
    {
      return this.notFound('An account with that id does not exist.');
    }

    if (!account.pfp.isDefault)
    {
      await this._imageService.delete(account.pfp.publicKey);
    }

    const pfpInfo = await this._imageService.upload(input.file);

    const pfp = Pfp.make(pfpInfo).value;

    account.changePfp(pfp);
    await this._accountRepo.save(account);

    return this.ok({ pfp: account.pfp.url });
  }
}

module.exports = ChangePfpApplication;
