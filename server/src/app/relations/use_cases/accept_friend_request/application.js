const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');
const AcceptFriendRequestErrors = require('./errors');

class AcceptFriendRequestApplication extends Application
{
  constructor(relationshipRepo)
  {
    super();
    this._relationshipRepo = relationshipRepo;
  }

  /**
   * Accepts a friend request
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.friendRequestId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const friendship = await this._relationshipRepo.findById(input.friendRequestId);
    if (!friendship || friendship.status !== 1)
    {
      return this.failed(AcceptFriendRequestErrors.FriendRequestIdDoesNotExist, 'Invalid friend request.');
    }

    if (!friendship.thisAccountId == input.thisAccountId)
    {
      return this.failed(AcceptFriendRequestErrors.FriendRequestIsNotForThisAccount, 'This friend request is not for you.');
    }

    friendship.changeStatus(2);
    await this._relationshipRepo.save(friendship);

    return this.ok();
  }
}

module.exports = AcceptFriendRequestApplication;
