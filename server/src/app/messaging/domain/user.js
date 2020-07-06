const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class User extends Entity
{
  get dmIds()
  {
    return this._value.dmIds;
  }

  get openDms()
  {
    return this._value.openDms;
  }

  isEmpty()
  {
    return this._value.dmIds.length === 0 ? true : false;
  }

  addDmId(newDmId)
  {
    if (!this._value.dmIds.includes(newDmId))
    {
      this._value.dmIds.push(newDmId);
    }
  }

  removeDmId(dmIdToRemove)
  {
    this._value.dmIds.filter((dmId) => dmId !== dmIdToRemove);
  }
}

/**
 * @param {Object} props 
 * @param {string} props.accountId
 * @param {[string]} props.dmIds
 * @param {Boolean} props.openDms
 */
function make(props)
{
  Guard.againstNullBulk([props.accountId, props.dmIds, props.openDms]);

  const { accountId, ...rest } = props;
  return Result.ok(new User({ id: accountId, ...rest}));
}

module.exports = {
  make,
};
