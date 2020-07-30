const ValueObject = require("../../../core/ValueObject");
const Result = require("../../../core/Result");

class Pfp extends ValueObject
{
  get value()
  {
    return this._value;
  }

  get url()
  {
    return this._value.url;
  }

  get publicKey()
  {
    return this._value.public_key;
  }

  _equals(other)
  {
    return other.value.public_key === this._value.public_key;
  }

  default()
  {
    if (this._value.public_key === -1)
    {
      return true;
    }
    return false;
  }
}

function make(pfp) {

  if (!pfp || !pfp.url || !pfp.public_key)
  {
    return Result.ok(new Pfp({
      url: 'https://res.cloudinary.com/cdt/image/upload/v1596066208/xs5keynvtrv2m5lxnvqa.jpg',
      public_key: -1,
    }));
  }
  const { url, public_key } = pfp;
  return Result.ok(new Pfp({ url, public_key }));
}

module.exports = {
  make,
};
