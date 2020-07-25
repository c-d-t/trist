const Controller = require('../../../../core/Controller');

class CreateOpenChannel extends Controller
{
  constructor(createOpenChannel)
  {
    super();
    this._createOpenChannel = createOpenChannel;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { title } = req.body;

    const { success, data } = await this._createOpenChannel.run({ thisAccountId: thisAccount.id, title });
    if (success)
    {
      return this.ok(data);
    }

    return this.handleError(data);
  }
}

module.exports = CreateOpenChannel;
