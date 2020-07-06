const Controller = require('../../../../core/Controller');
const CreateDmErrors = require('./errors');

class CreateDmController extends Controller
{
  constructor(createDm)
  {
    super();
    this._createDm = createDm;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { otherAccountId } = req.body;

    const result = await this._createDm.run({ thisAccountId: thisAccount.id, otherAccountId });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    switch (data.errorType)
    {
      case CreateDmErrors.OtherUserDoesNotExist:
        return this.notFound(data.message);
      case CreateDmErrors.DmAlreadyExists:
        return this.forbidden(data.message);
      case CreateDmErrors.InvalidFields:
        return this.invalidFields(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = CreateDmController;
