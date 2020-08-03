const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Notification extends Entity
{
  get senderId()
  {
    return this._value.senderId;
  }

  get receiverId()
  {
    return this._value.receiverId;
  }

  get type()
  {
    return this._value.type;
  }

  get timeCreated()
  {
    return this._value.timeCreated;
  }
}

/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.senderId
 * @param {string} props.receiverId
 * @param {string} props.type
 * @param {string} props.timeCreated
 */
function make(props)
{
  Guard.againstNullBulk([props, props.accountId, props.receiverId, props.type]);

  return new Result.ok(new Notification({
    ...props,
    timeCreated: props.timeCreated || Date.now(),
  }));
}

module.exports = {
  make,
};
