const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Channel extends Entity
{
  get title()
  {
    return this._value.title;
  }

  get type()
  {
    return this._value.type;
  }

  get participantIds()
  {
    return this._value.participants;
  }

  changeCreatorId(accountId)
  {
    this._value.creator = accountId;
  }

  changeName(newName)
  {
    if (this._value.type !== 0)
    {
      this._value.creator = newName;
    }
  }
}

/**
 * Creates a channel
 * @param {Object} props 
 * @param {string} props.id
 * @param {[string]} props.participantIds
 */
function makeDm(props)
{
  Guard.againstNullBulk([ props.id, props.participantIds ]);

  if (props.participantIds.length < 2 || props.participantIds.length > 10)
  {
    return Result.fail('A Dm must have between 2 and 10 participants.');
  }

  const uniqueParticipants = {};
  for (let i = 0; i < props.participantIds.length; i++)
  {
    const id = props.participantIds[i];
    if (!uniqueParticipants[id])
    {
      uniqueParticipants[id] = true;
    }
    else
    {
      return Result.fail('All participants must be unique.');
    }
  }

  const type = props.participantIds.length === 2 ? 0 : 1;
  return Result.ok(new Channel({ ...props, type }));
}

module.exports = {
  makeDm,
};