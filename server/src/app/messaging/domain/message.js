const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Message extends Entity
{
  get authorId()
  {
    return this._value.authorId;
  }

  get channelId()
  {
    return this._value.channelId;
  }

  get timeCreated()
  {
    return this._value.timeCreated;
  }

  get text()
  {
    return this._value.text;
  }

  edit(newMessageText)
  {
    this._value.text = newMessageText;
  }
}

/**
 * @param {Object} props 
 * @param {string} props.id
 * @param {string} props.authorId
 * @param {string} props.channelId
 * @param {Date} props.timeCreated
 * @param {MessageText} props.text
 */
function make(props)
{
  Guard.againstNullBulk([props.authorId, props.channelId, props.text]);

  return Result.ok(new Message({
    ...props,
    timeCreated: !props.timeCreated ? Date.now() : props.timeCreated,
  }));
}

module.exports = {
  make,
};
