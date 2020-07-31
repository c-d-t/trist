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
    return this._value.publicId;
  }

  get isDefault()
  {
    if (this._value.publicId === -1)
    {
      return true;
    }
    return false;
  }

  _equals(other)
  {
    return other.value.publicId === this._value.publicId;
  }

  default()
  {
    if (this._value.publicId === -1)
    {
      return true;
    }
    return false;
  }
}

/**
 * 
 * @param {Object} pfp
 * @param {string} pfp.url
 * @param {string} pfp.publicId 
 */
function make(pfp) {
  if (!pfp || !pfp.url || !pfp.publicId)
  {
    return Result.ok(new Pfp({
      url: 'https://res.cloudinary.com/cdt/image/upload/v1596066208/xs5keynvtrv2m5lxnvqa.jpg',
      publicId: -1,
    }));
  }
  const { url, publicId } = pfp;
  return Result.ok(new Pfp({ url, publicId }));
}

module.exports = {
  make,
};
