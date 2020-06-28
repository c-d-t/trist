const ValueObject = require('../../../core/ValueObject');
const Result = require('../../../core/Result');

class Body extends ValueObject
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
  if (!string || string.length === 0)
  {
    return Result.fail('A message body is required.');
  }

  if (string.length > 500)
  {
    return Result.fail('A maximum message body is 500 characters.');
  }

  return Result.ok(new Body(string));
}

module.exports = {
  make,
};