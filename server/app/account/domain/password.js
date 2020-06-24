const ValueObject = require('../../../core/ValueObject');
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

async function makePassword(string)
{
  if (!string || !string.length)
  {
    throw new Error('Password is required.');
  }

  if (string.length < 8)
  {
    throw new Error('A password must have at least 8 characters.');
  }

  const hashedString = await bcrypt.hash(string, 10);
  return new Password(hashedString);
}

module.exports = makePassword;
