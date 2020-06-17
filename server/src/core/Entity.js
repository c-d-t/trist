class Entity {
  constructor(id, props) {
    this._id = id;
    this._props = props;
  }

  getId() {
    return this._id;
  }

  equals(entity) {
    if (!entity || !entity.getId()) {
      return false;
    }
    return entity.getId() === this._id;
  }
}