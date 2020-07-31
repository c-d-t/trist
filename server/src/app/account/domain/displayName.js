const ValueObject = require("../../../core/ValueObject");
const Result = require("../../../core/Result");

class DisplayName extends ValueObject
{
  get value()
  {
    return this._value;
  }

  get isEmpty()
  {
    return this.value.length === 0;
  }

  _equals(other)
  {
    return other.value === this._value;
  }
}

function make(string) {
  if (!string || !string.length) {
    return Result.ok(new DisplayName(''));
  }

  if (string.length > 50) {
    return Result.fail('A display name has a maximum of 40 characters.');
  }

  return Result.ok(new DisplayName(string));
}

function makeDeleted()
{
  return new DisplayName('deleted_account');
}

module.exports = {
  make,
  makeDeleted,
};