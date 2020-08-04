const Application = require('../../../../core/Application');
const Relationship = require('../../domain/relationship');
const Guard = require('../../../../core/Guard');

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
   * @param {string} input.otherAccountId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);
    const accountToSendRequest = await this._accountRepo.findById(input.otherAccountId);
    if (!accountToSendRequest)
    {
      return this.notFound();
    }
    const sentFriendRequestResult = Relationship.make({
      thisAccountId: input.thisAccountId,
      otherAccountId: accountToSendRequest.id,
      status: 0,
    });
    if (sentFriendRequestResult.failed)
    {
      return this.failed('You\'re already best friends with yourself.');
    }
    
    const sentFriendRequest = sentFriendRequestResult.value;
    const existingRelationship = await this._relationshipRepo.findByAccounts(sentFriendRequest.thisAccountId, sentFriendRequest.otherAccountId);
    if (!!existingRelationship === true)
    {
      let message;
      switch (existingRelationship.status)
      {
        case -1:
          message = 'You cannot send a friend request to someone you blocked.';
          break;
        case 0:
          message = 'You already sent a friend request to that account.';
          break;
        case 1:
          message = 'That account has already sent you a friend request.';
          break;
        case 2:
          message = 'You are already friends with that account.';
          break;
      }
      return this.failed(message);
    }

    await this._relationshipRepo.save(sentFriendRequest);
    
    return this.ok({ otherAccountId: sentFriendRequest.otherAccountId });
  }
}

module.exports = SendFriendRequestApplication;
