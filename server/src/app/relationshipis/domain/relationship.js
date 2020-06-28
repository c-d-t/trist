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

  get type()
  {
    return this._value.type;
  }
}

/**
 * Creates a relationship
 * @param {Object} props 
 * @param {string} props.thisAccountId
 * @param {string} props.otherAccountId
 * @param {number} props.type
 */
function make(props)
{
  Guard.againstNullBulk([ props.thisAccountId, props.otherAccountId, props.type ]);

  if (props.type < -1 || props.type > 3)
  {
    throw new Error('A friendship type must be between -1 and 3.');
  }

  if (props.thisAccountId === props.otherAccountId)
  {
    Result.fail('A friendship must be between 2 unique accounts.');
  }

  Result.ok(new Relationship(props))
}

module.exports = {
  make,
};
