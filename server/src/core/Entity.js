class Entity {
  constructor(id, props) {
    this.m_id = id;
    this.m_props = props;
  }

  // ------------------ //
  // GETTERS && SETTERS //
  // ------------------ //
  getId() {
    return this.m_id;
  }

  // ------- //
  // METHODS //
  // ------- //

  /**
   * Checks if another entity is the same as this one.
   * @param {Object} otherEntity The entity to compare against
   * @returns boolean
   */
  equals(otherEntity) {
    if (!otherEntity.getId()) {
      return false;
    }
    return otherEntity.getId() === this.m_id;
  }
}

module.exports = Entity;
