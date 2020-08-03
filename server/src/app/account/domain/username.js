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

function make(string) {
  if (!string || !string.length) {
    return Result.fail('A username is required.');
  }

  if (string.length < 1 || string.length > 30) {
    return Result.fail('A username must be between 1 and 30 characters.');
  }

  return Result.ok(new Username(string));
}

function makeDeleted() {
  return new Username(`deleted_${Math.floor(Math.random() * 9999)}`);
}

module.exports = {
  make,
  makeDeleted,
};
