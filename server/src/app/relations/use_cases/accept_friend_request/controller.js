const Controller = require('../../../../core/Controller');
const AcceptFriendRequestErrors = require('./errors');

class AcceptFriendRequestController extends Controller
{
  constructor(acceptFriendRequest)
  {
    super();
    this._acceptFriendRequest = acceptFriendRequest;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { friendRequestId } = req.body;

    const result = await this._acceptFriendRequest.run({ friendRequestId, thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    switch (data.errorType)
    {
      case AcceptFriendRequestErrors.FriendRequestIdDoesNotExist:
        return this.notFound(data.message);
      case AcceptFriendRequestErrors.FriendRequestIsNotForThisAccount:
        return this.forbidden(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = AcceptFriendRequestController;
