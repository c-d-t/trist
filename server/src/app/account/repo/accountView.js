class AccountView
{
  constructor(accountModel)
  {
    this._accountModel = accountModel;
  }

  async getProfile(userId)
  {
    return this._accountModel.findById(userId).select('displayName username');
  }
}

module.exports = AccountView;
