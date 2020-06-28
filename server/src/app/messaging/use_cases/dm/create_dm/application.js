const Application = require('../../../../../core/Application');

class CreateDmApplication extends Application
{
  constructor(channelRepo)
  {
    super();
    this._channelRepo = channelRepo;
  }

  /**
   * 
   * @param {Object} input
   * @param {creatorId} string
   * @param {} 
   */
  async run(input)
  {

  }
}

module.exports = CreateDmApplication;
