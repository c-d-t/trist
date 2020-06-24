const ValueObject = require('../../../core/ValueObject');
const Result = require('../../../core/Result');

class Email extends ValueObject
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

function makeEmail(string)
{
  const basicEmailRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
  if(!basicEmailRegex.test(string))
  {
    return Result.fail('Email is not valid.');
  }

  return Result.ok(new Email(string));
}

module.exports = makeEmail;
