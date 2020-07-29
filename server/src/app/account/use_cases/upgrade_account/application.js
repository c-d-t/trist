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
   * @param {string} input.username
   * @param {string} input.password
   * @param {string} input.email 
   */
  async run(input)
  {
    const usernameResult = Username.make(input.username);
    const passwordResult = await Password.makeHashed(input.password);
    const emailResult = Email.make(input.email);
    const propsResult = Result.combine({
      username: usernameResult,
      password: passwordResult,
      email: emailResult,
    });
    if (propsResult.failed)
    {
      return this.failed(propsResult.error);
    }
    const username = usernameResult.value;
    const password = passwordResult.value;
    const email = emailResult.value;
    
    let newAccount = await this._accountRepo.findById(input.thisAccountId);
    if (!newAccount)
    {
      return this.notFound();
    }
    if (newAccount.status !== 0)
    {
      return this.unauthorized({ account: 'This account is already registered.' });
    }

    newAccount.changeStatus(1);
    newAccount.changeUsername(username);
    newAccount.changePassword(password);
    newAccount.changeEmail(email);
    
    if (!!await this._accountRepo.findByUsername(newAccount.username.value) === true)
    {
      return this.conflict({ username: 'An account with that username already exists.' });
    }
    
    if (!!await this._accountRepo.findByEmail(newAccount.email.value) === true)
    {
      return this.conflict({ email: 'An account with that email already exists.' });
    }

    await this._accountRepo.save(newAccount);
    
    // send email verification

    return this.ok();
  }
}

module.exports = UpgradeApplication;
