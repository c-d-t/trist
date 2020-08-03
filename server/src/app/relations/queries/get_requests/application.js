const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class GetRequestsApplication extends Application
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

    const rawRequests = await this._relationshipModel.find({ status: { $in: [0, 1] }, thisAccountId: input.thisAccountId }, '-__v -thisAccountId')
    .populate({
      path: 'otherAccountId',
      select: 'username pfp',
    });

    const requests = rawRequests.map((request) => {
      return {
        id: request._id,
        status: request.status,
        user: {
          id: request.otherAccountId._id,
          username: request.otherAccountId.username,
          pfp: request.otherAccountId.pfp.url,
        },
      };
    })

    return this.ok({ requests });
  }
}

module.exports = GetRequestsApplication;
