const Controller = require('../../../../core/Controller');

class GetProfileController extends Controller
{
  constructor(getProfile)
  {
    super();
    this._getProfile = getProfile;
  }

  async implementation(req)
  {
    const { accountId } = req.query;

    const result = await this._getProfile.run({ accountId });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }
  }
}

module.exports = GetProfileController;
