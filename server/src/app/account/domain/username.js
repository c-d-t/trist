const ValueObject = require("../../../core/ValueObject");
const Result = require("../../../core/Result");

class Username extends ValueObject
{
  get value() {
    return this._value;
  }

  _equals(other)
  {
    return other.value === this._value;
  }
}

function makeUsername(string) {
  if (!string || !string.length) {
    return Result.fail('A username is required.');
  }

  if (string.length < 3 || string.length > 20) {
    return Result.fail('A username must be between 3 and 20 characters.');
  }

  if (/[^\w]/g.test(string)) {
    return Result.fail('A username can only contain alphanumeric characters and underscores.');
  }

  return Result.ok(new Username(string));
}

module.exports = makeUsername;
