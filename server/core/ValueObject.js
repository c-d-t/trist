class ValueObject
{
  constructor(value)
  {
    this._value = value;
  }

  equals(other)
  {
    if (other === null || other === undefined)
    {
      return false;
    }
    return this._equals(other);
  }
}

module.exports = ValueObject;
