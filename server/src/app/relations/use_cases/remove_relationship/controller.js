const Controller = require('../../../../core/Controller');

class RemoveRelationshipController extends Controller
{
  constructor(removeRelationship)
  {
    super();
    this._removeRelationship = removeRelationship;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { relationshipId } = req.query;

    const result = await this._removeRelationship.run({ relationshipId, thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    this.handleError(data);
  }
}

module.exports = RemoveRelationshipController;
