const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class MarcoApplication extends Application
{
  constructor(userModel)
  {
    super();
    this._userModel = userModel;
  }

  /**
   * @param {Object} input 
   * @param {string} input.thisAccountId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const { dmIds } = await this._userModel.findById(input.thisAccountId)
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
