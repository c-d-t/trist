const Controller = require('../../../../core/Controller');

class MarcoController extends Controller
{
  constructor(marco)
  {
    super();
    this._marco = marco;
  }

  async implementation(req)
  {
    const { thisAccount } = req;

    const result = await this._marco.run({ thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }
  }
}

module.exports = MarcoController;
