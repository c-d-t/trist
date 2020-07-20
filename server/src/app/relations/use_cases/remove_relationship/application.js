const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class RemoveRelationshipApplication extends Application
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
   * @param {string} input.relationshipId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const friendship = await this._relationshipRepo.findById(input.relationshipId);
    if (!friendship)
    {
      return this.invalidFields('Invalid friend request.');
    }

    if (!friendship.contains(input.thisAccountId))
    {
      return this.invalidFields('You are not in that relationship.');
    }

    if (friendship.status === -1 && input.thisAccountId !== friendship.thisAccountId)
    {
      return this.invalidFields('You cannot remove a block.');
    }

    this._relationshipRepo.delete(friendship);

    return this.ok();
  }
}

module.exports = RemoveRelationshipApplication;
