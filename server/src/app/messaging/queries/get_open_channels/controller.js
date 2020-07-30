const Controller = require('../../../../core/Controller');
class GetOpenChannelsController extends Controller
{
  constructor(getOpenChannels)
  {
    super();
    this._getOpenChannels = getOpenChannels;
  }

  async implementation()
  {    
    const result = await this._getOpenChannels.run();
    const { success, data } = result;
    if (success)
    {
      this.ok(data);
    }
  }
}

module.exports = GetOpenChannelsController;
