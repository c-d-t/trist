const Controller = require('../../../../core/Controller');

class GetFriendsController extends Controller
{
  constructor(getFriends)
  {
    super();
    this._getFriends = getFriends;
  }

  async implementation(req)
  {
    const { thisAccount } = req;

    const result = await this._getFriends.run({ thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }
  }
}

module.exports = GetFriendsController;
