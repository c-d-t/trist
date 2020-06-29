class EmailService
{
  constructor(emailThinng)
  {
    this._emailThihg = emailThinng;
  }

  emailConfirmation(token)
  {
    this._emailThihg.send(token);
  }
}

module.exports = EmailService;
