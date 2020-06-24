const Application = require("../../../../core/Application");
const makeAccount = require("../../domain/account");
const makeUsername = require("../../domain/username");
const makePassword = require("../../domain/password");
const makeEmail = require("../../domain/email");
const Result = require("../../../../core/Result");
const RegisterErrors = require("./errors");

class RegisterApplication extends Application
{
  constructor(userRepo, emailService)
  {
    this._userRepo = userRepo;
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
      return this.failed(RegisterErrors.InvalidFields);
    }

    const accountResult = makeAccount({ ...propsResult.value, isVerified: false });
    if (accountResult.failed)
    {
      return this.failed();
    }

    const account = accountResult.value;
    this._userRepo.save(account);
    
    // send email verification

    // make token
    const responseJSON = {
      token: ':p',
    };

    this.ok(responseJSON);
  }
}

module.exports = RegisterApplication;
