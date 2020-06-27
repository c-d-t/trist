class Entity
{
  constructor(props)
  {
    const {id, ...value} = props;
    this._id = id;
    this._value = value;
  }
  
  get id()
  {
    return this._id;
  }

  equals(other)
  {
    if (!other || !other.id || other.id === this.id)
    {
      return false;
    }

    return true;
  }
}

module.exports = Entity;
