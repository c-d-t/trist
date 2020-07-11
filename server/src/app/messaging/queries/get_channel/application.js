const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class MarcoApplication extends Application
{
  constructor(channelModel)
  {
    super();
    this._channelModel = channelModel;
  }

  /**
   * @param {Object} input 
   * @param {string} input.thisAccountId
   * @param {string} input.channelId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const channel = await this._channelModel.findById(input.channelId);
    if (channelId)
    {
      
    }

    const { dmIds } = await this._channelModel.findById(input.thisAccountId)
    .populate({
      path: 'dmIds',
      populate: {
        path: 'participantIds',
        match: { _id: { $ne: input.thisAccountId } },
        select: 'username',
      },
      select: '-__v',
    });

    const dms = dmIds.map((dm) => {
      let name;
      if (dm.type === 0)
      {
        name = dm.participantIds[0].username
      }
      else
      {
        name = dm.title;
      }
      return { id: dm._id, name };
    });

    return this.ok({ dms });
  }
}

module.exports = MarcoApplication;
