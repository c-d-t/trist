const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Channel extends Entity
{
  get title()
  {
    return this._value.title;
  }

  get participants()
  {
    return this._value.participants;
  }
}

/**
 * Creates a channel
 * @param {Object} props 
 * @param {string} props.id
 * @param {[string]} props.participants
 */
function makeDm(props)
{
  Guard.againstNullBulk([ props.id, props.participants ]);

  if (!props.participants.length || props.participants.length !== 2)
  {
    return Result.fail('A Dm can only have 2 participants.');
  }

  if (props.participants[0] === props.participants[1])
  {
    return Result.fail('A Dm needs two unique accounts.');
  }

  return Result.ok(new Channel({ ...props, type: 0 }));
}

function makeGroup()
{

}

module.exports = {
  makeDm,
  makeGroup,
};