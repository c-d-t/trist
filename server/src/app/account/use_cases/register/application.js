const Application = require("../../../../core/Application");
const Account = require("../../domain/account");
const Pfp = require('../../domain/pfp');
const Username = require("../../domain/username");
const Password = require("../../domain/password");
const Email = require("../../domain/email");
const Result = require("../../../../core/Result");
const onAccountCreation = require('../../services/onAccountCreation');
const jwt = require('../../services/jwt');

class RegisterApplication extends Application
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
      return this.invalidFields(propsResult.error);
    }
    const username = usernameResult.value;
    const password = passwordResult.value;
    const email = emailResult.value;
    const pfp = Pfp.make().value;

    const newAccountResult = Account.make({
      username,
      password,
      email,
      pfp,
      status: 1,
    });
    if (newAccountResult.failed)
    {
      return this.failed();
    }
    const newAccount = newAccountResult.value;
    
    if (!!await this._accountRepo.findByEmail(newAccount.email.value) === true)
    {
      return this.conflict({ email: 'An account with that email already exists.' });
    }

    const account = await this._accountRepo.save(newAccount);

    await onAccountCreation.run(account.id);

    // make email token
    const token = jwt.encodeEmail({ id: account.id });
    const url = 'https://tristchat.herokuapp.com/confirm/' + token;
    await this._emailService.emailConfirmation(account.email.value, url, account.username.value);

    return this.ok();
  }
}

module.exports = RegisterApplication;
