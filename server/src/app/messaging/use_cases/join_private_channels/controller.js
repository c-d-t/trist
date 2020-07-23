const Controller = require('../../../../core/Controller');

class JoinRandomChatController extends Controller
{
  constructor(joinRandomChat)
  {
    super();
    this._joinRandomChat = joinRandomChat;
  }

  async implementation(req)
  {
    const { thisAccount } = req;

    const result = await this._joinRandomChat.run({ thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }

    return this.handleError(data);
  }
}

module.exports = JoinRandomChatController;
