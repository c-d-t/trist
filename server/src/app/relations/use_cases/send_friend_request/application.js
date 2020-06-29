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
      return this.failed(SendFriendRequestErrors.UsernameDoesNotExist, `An account with the username '${input.otherAccountUsername}' does not exist.`);
    }
    const sentFriendRequestResult = Relationship.make({
      thisAccountId: input.thisAccountId,
      otherAccountId: accountToSendRequest.id,
      status: 0,
    });
    if (sentFriendRequestResult.failed)
    {
      return this.failed(SendFriendRequestErrors.CouldNotMakeFriendRequest, sentFriendRequestResult.error);
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
      return this.failed(SendFriendRequestErrors.AlreadyInARelationship, message);
    }

    await this._relationshipRepo.save(sentFriendRequest);

    return this.ok();
  }
}

module.exports = SendFriendRequestApplication;
