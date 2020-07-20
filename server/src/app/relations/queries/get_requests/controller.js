const Controller = require('../../../../core/Controller');

class GetRequestsController extends Controller
{
  constructor(getRequests)
  {
    super();
    this._getRequests = getRequests;
  }

  async implementation(req)
  {
    const { thisAccount } = req;

    const result = await this._getRequests.run({ thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }
  }
}

module.exports = GetRequestsController;
