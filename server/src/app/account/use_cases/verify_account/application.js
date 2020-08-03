const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class VerifiyAccountApplication extends Application
{
  constructor(accountRepo, jwt)
  {
    super();
    this._jwt = jwt;
    this._accountRepo = accountRepo;
  }

  /**
   * @param {Object} input
   * @param {string} input.token
   */
  async run(input)
  {
    const data = this._jwt.decodeEmail(input.token);
    if (!data || data.id === null || data.id === undefined)
    {
      return this.invalidFields();
    }
    const { id } = data;
    const verifiedAccount = await this._accountRepo.findById(id);
    if (!verifiedAccount)
    {
      return this.notFound();
    }
    verifiedAccount.upgrade();
    await this._accountRepo.save(verifiedAccount);

    return this.ok();
  }
}

module.exports = VerifiyAccountApplication;
