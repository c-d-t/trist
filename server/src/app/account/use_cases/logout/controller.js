const Controller = require('../../../../core/Controller');

class LogoutController extends Controller {
  async implementation()
  {
    this._res.clearCookie('jwt');
    return this.ok();
  }
}

module.exports = LogoutController;
