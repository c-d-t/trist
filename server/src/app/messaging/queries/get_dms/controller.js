const Controller = require('../../../../core/Controller');
class GetDmsController extends Controller
{
  constructor(getDms)
  {
    super();
    this._getDms = getDms;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    
    const result = await this._getDms.run({ thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      this.ok(data);
    }
  }
}

module.exports = GetDmsController;
