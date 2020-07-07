const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class GetFriendsApplication extends Application
{
  constructor(relationshipModel)
  {
    super();
    this._relationshipModel = relationshipModel;
  }

  /**
   * @param {Object} input 
   * @param {string} input.thisAccountId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const rawFriends = await this._relationshipModel.find({ status: 2, thisAccountId: input.thisAccountId }, '-__v -thisAccountId -status')
    .populate({
      path: 'otherAccountId',
      select: 'username',
    });

    const friends = rawFriends.map((friendship) => {
      return {
        id: friendship._id,
        user: {
          id: friendship.otherAccountId._id,
          username: friendship.otherAccountId.username,
        },
      };
    })

    return this.ok({ friends });
  }
}

module.exports = GetFriendsApplication;
