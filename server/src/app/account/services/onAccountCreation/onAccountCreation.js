class OnAccountCreation
{
  constructor(makeMessagingUser)
  {
    this._makeMessagingUser = makeMessagingUser;
  }

  async run(accountId)
  {
    this._makeMessagingUser.run({ accountId });
  }
}

module.exports = OnAccountCreation;
