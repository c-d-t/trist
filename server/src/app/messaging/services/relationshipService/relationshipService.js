class RelationshipService
{
  constructor(relationshipRepo)
  {
    this._relationshipRepo = relationshipRepo;
  }

  async areFriends(accountIdOne, accountIdTwo)
  {
    const foundRelationship = await this._relationshipRepo.findByAccounts(accountIdOne, accountIdTwo);
    if (!foundRelationship || foundRelationship.type !== 2)
    {
      return false;
    }
    return true;
  }

  async hasBlock(accountIdOne, accounntIdTwo)
  {
    const [relationshipOne, relationshipTwo] = await Promise.all([
      this._relationshipRepo.findByAccounts(accountIdOne, accounntIdTwo),
      this._relationshipRepo.findByAccounts(accounntIdTwo, accountIdOne),
    ]);

    if (relationshipOne.type === -1 || relationshipTwo.type === -1)
    {
      return true;
    }
    return false;
  }
}

module.exports = RelationshipService;