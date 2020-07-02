const Application = require('../../../../core/Application');
const Channel = require('../../domain/channel');

class CreateDmApplication extends Application
{
  constructor(channelRepo)
  {
    super();
    this._channelRepo = channelRepo;
  }

  /**
   * Creates a between two participants
   * @param {Object} input 
   * @param {string} input.thisAccountId
   * @param {string} input.otherAccountId
   */
  async run(input)
  {
    const newChannel = Channel.makeDm({ participantIds: [input.thisAccountId, input.otherAccountId] });
  }
}

module.exports = CreateDmApplication;
