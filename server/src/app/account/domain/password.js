const ValueObject = require('../../../core/ValueObject');
const Result = require('../../../core/Result');
const bcrypt = require('bcrypt');

class Password extends ValueObject {
  async compare(rawPassword)
  {
    return bcrypt.compare(rawPassword, this.value);
  }

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
  if (!string || !string.length)
  {
    return Result.fail('A password is required.');
  }
  
  return Result.ok(new Password(string));
}

async function makeHashed(string)
{
  if (!string || !string.length)
  {
    return Result.fail('A password is required.');
  }

  if (string.length < 8)
  {
    return Result.fail('A password must have at least 8 characters.');
  }

  const hashedString = await bcrypt.hash(string, 10);
  return Result.ok(new Password(hashedString));
}

module.exports = {
  make,
  makeHashed,
};
