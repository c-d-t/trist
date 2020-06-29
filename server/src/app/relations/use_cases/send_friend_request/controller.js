const Controller = require('../../../../core/Controller');
const SendFriendRequestErrors = require('./errors');

class SendFriendRequestController extends Controller
{
  constructor(sendFriendRequest) {
    super();
    this._sendFriendRequest = sendFriendRequest;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { otherAccountUsername } = req.body;

    const result = await this._sendFriendRequest.run({ thisAccountId: thisAccount.id, otherAccountUsername });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    switch (data.errorType)
    {
      case SendFriendRequestErrors.UsernameDoesNotExist:
        return this.notFound(data.message);
      case SendFriendRequestErrors.CouldNotMakeFriendRequest:
        return this.forbidden(data.message);
      case SendFriendRequestErrors.AlreadyInARelationship:
        return this.conflict(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = SendFriendRequestController;
