const Application = require("../../../../core/Application");
const makeAccount = require("../../domain/account");
const makeUsername = require("../../domain/username");
const makePassword = require("../../domain/password");
const makeEmail = require("../../domain/email");
const Result = require("../../../../core/Result");
const RegisterErrors = require("./errors");
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
    const usernameResult = makeUsername(input.username);
    const passwordResult = await makePassword(input.password);
    const emailResult = makeEmail(input.email);
    const propsResult = Result.combine({
      username: usernameResult,
      password: passwordResult,
      email: emailResult,
    });

    if (propsResult.failed)
    {
      return this.failed(RegisterErrors.InvalidFields, propsResult.error);
    }
    const username = usernameResult.value;
    const password = passwordResult.value;
    const email = emailResult.value;

    if (!!this._accountRepo.findByUsername(username) === true)
    {
      return this.failed(RegisterErrors.UsernameAlreadyExists, "An account with that username already exists.");
    }

    if (!!this._accountRepo.findByEmail(email) === true)
    {
      return this.failed(RegisterErrors.EmailAlreadyExists, "An account with that email already exists.");
    }

    const accountResult = makeAccount({ username, password, email, isVerified: false });
    if (accountResult.failed)
    {
      return this.failed();
    }

    const newAccount = accountResult.value;
    const account = this._accountRepo.save(newAccount);
    
    // send email verification

    // make token
    const token = jwt.encode({ id: account.id });
    const responseJSON = { token };

    return this.ok(responseJSON);
  }
}

module.exports = RegisterApplication;
