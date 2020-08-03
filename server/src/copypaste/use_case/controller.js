const Controller = require('../../../../core/Controller');

class _Controller extends Controller
{
  constructor(u)
  {
    super();
    this._u = u;
  }

  async implementation(req)
  {
    const { success, data } = await this._u.run({

    });

    if (success)
    {
      return this.ok(data);
    }

    this.handleError(data);
  }
}

module.exports = _Controller;
