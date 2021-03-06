const ValueObject = require('../../../core/ValueObject');
const Result = require('../../../core/Result');

class MessageText extends ValueObject
{
  get value()
  {
    return this._value;
  }

  _equals(other)
  {
    return other.value === this.value;
  }
}

function make(string)
{
  string = string.trim();
  if (!string || string.length === 0)
  {
    return Result.fail('A message body is required.');
  }

  if (string.length > 500)
  {
    return Result.fail('A maximum message body is 500 characters.');
  }

  return Result.ok(new MessageText(string));
}

module.exports = {
  make,
};