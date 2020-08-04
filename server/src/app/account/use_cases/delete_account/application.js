const Application = require("../../../../core/Application");
const Pfp = require('../../domain/pfp');
const Username = require('../../domain/username');
const Password = require('../../domain/password');
const Email = require('../../domain/email');

class DeleteAccountApplication extends Application
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
      const pfp = Pfp.make().value;
      account.changePfp(pfp);
    }

    const username = Username.makeDeleted();
    const email = Email.makeDeleted();
    const password = Password.makeDeleted();
    account.delete({ username, email, password });
    await this._accountRepo.save(account);

    return this.ok();
  }
}

module.exports = DeleteAccountApplication;
