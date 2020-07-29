const Controller = require('../../../../core/Controller');

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
      global._eventEmitter.emitEventToAccount(data.otherAccountId, 'friend:receive', { accountId: data.otherAccountId });
      return this.ok();
    }

    return this.handleError(data);
  }
}

module.exports = SendFriendRequestController;
