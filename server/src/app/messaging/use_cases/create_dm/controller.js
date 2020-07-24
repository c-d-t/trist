const Controller = require('../../../../core/Controller');

class CreateDmController extends Controller
{
  constructor(createDm)
  {
    super();
    this._createDm = createDm;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { otherAccountId } = req.body;

    const result = await this._createDm.run({ thisAccountId: thisAccount.id, otherAccountId });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    return this.handleError(data);
  }
}

module.exports = CreateDmController;
