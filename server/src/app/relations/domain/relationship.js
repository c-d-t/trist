const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Relationship extends Entity
{
  get thisAccountId()
  {
    return this._value.thisAccountId;
  }

  get otherAccountId()
  {
    return this._value.otherAccountId;
  }

  get status()
  {
    return this._value.status;
  }

  contains(accountId)
  {
    return (this._value.thisAccountId === accountId || this._value.otherAccountId === accountId);
    
  }

  changeStatus(newStatus)
  {
    if (newStatus < -1 || newStatus > 2)
    {
      throw new Error('A relationship status must be between -1 and 2.');
    }
    this._value.status = newStatus;
  }
}

/**
 * Creates a relationship
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.thisAccountId
 * @param {string} props.otherAccountId
 * @param {number} props.status
 */
function make(props)
{
  Guard.againstNullBulk([ props.thisAccountId, props.otherAccountId, props.status ]);

  if (props.status < -1 || props.status > 2)
  {
    throw new Error('A relationship status must be between -1 and 2.');
  }

  if (props.thisAccountId == props.otherAccountId)
  {
    return Result.fail('A relationship must be between 2 unique accounts.');
  }

  return Result.ok(new Relationship(props))
}

module.exports = {
  make,
};
