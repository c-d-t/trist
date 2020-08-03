const Application = require("../../../../core/Application");
const Username = require("../../domain/username");
const Password = require("../../domain/password");
const Email = require("../../domain/email");
const Result = require("../../../../core/Result");

class UpgradeApplication extends Application
{
  constructor(accountRepo, emailService)
  {
    super();
    this._accountRepo = accountRepo;
    this._emailService = emailService;
  }

  /**
   * 
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.password
   * @param {string} input.email 
   */
  async run(input)
  {
    const passwordResult = await Password.makeHashed(input.password);
    const emailResult = Email.make(input.email);
    const propsResult = Result.combine({
      password: passwordResult,
      email: emailResult,
    });
    if (propsResult.failed)
    {
      return this.failed(propsResult.error);
    }
    const password = passwordResult.value;
    const email = emailResult.value;
    
    let account = await this._accountRepo.findById(input.thisAccountId);
    if (!account)
    {
      return this.notFound();
    }
    if (account.status !== 0)
    {
      return this.unauthorized({ account: 'This account is already registered.' });
    }

    account.changeStatus(1);
    account.changePassword(password);
    account.changeEmail(email);
    
    if (!!await this._accountRepo.findByEmail(account.email.value) === true)
    {
      return this.conflict({ email: 'An account with that email already exists.' });
    }

    await this._accountRepo.save(account);
    
    // send email verification
    const responseJSON = {
      status: account.status,
    };
    return this.ok(responseJSON);
  }
}

module.exports = UpgradeApplication;
