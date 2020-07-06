const ValueObject = require('../../../core/ValueObject');
const Result = require('../../../core/Result');

class ChannelTitle extends ValueObject
{
  get value()
  {
    return this._value;
  }

  _equals(other)
  {
    return other.value === this._value;
  }
}


function make(string)
{
  if (!string || !string.length || string.length === 0 || string.length > 50)
  {
    return Result.fail('A Channel title must be between 1 and 50 characters.');
  }

  return Result.ok(new ChannelTitle(string));
}

module.exports = {
  make,
};
