const Application = require('../../../../core/Application');
const Relationship = require('../../domain/relationship');
const Guard = require('../../../../core/Guard');
const SendFriendRequestErrors = require('./errors');

class SendFriendRequestApplication extends Application
{
  constructor(relationshipRepo, accountRepo)
  {
    super();
    this._relationshipRepo = relationshipRepo;
    this._accountRepo = accountRepo;
  }

  /**
   * Creates a friend request
   * @param {Object} input 
   * @param {string} input.thisAccountId
   * @param {string} input.otherAccountUsername
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const accountToSendRequest = await this._accountRepo.findByUsername(input.otherAccountUsername);
    if (!accountToSendRequest)
    {
      return this.failed(SendFriendRequestErrors.UsernameDoesNotExist, 'An account with that username does not exist.');
    }

    const sentFriendRequestResult = Relationship.make({
      thisAccountId: input.thisAccountId,
      otherAccountId: accountToSendRequest.id,
      type: 1,
    })
    if (sentFriendRequestResult.failed)
    {
      return this.failed(SendFriendRequestErrors.CouldNotMakeFriendRequest, sentFriendRequestResult.error);
    }

    const sentFriendRequest = sentFriendRequestResult.value;
    const existingRelationship = this._relationshipRepo.findByAccounts(sentFriendRequest);
    if (!!existingRelationship === true)
    {
      switch (existingRelationship.type)
      {
        case 1:
          return this.failed(SendFriendRequestErrors.existingRelationship, 'You already sent a friend request to that account.');
        case 2:
          return this.failed(SendFriendRequestErrors.existingRelationship, 'That account has already sent you a friend request.');
        case 3:
          return this.failed(SendFriendRequestErrors.existingRelationship, 'You are already friends with that account.');
        default:
          return this.failed();
      }
    }

    await this._relationshipRepo.save(sentFriendRequestResult);

    return this.ok();
  }
}

module.exports = SendFriendRequestApplication;
