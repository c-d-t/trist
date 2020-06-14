const Entity = require('../../../../core/Entity');
const DisplayName = require('../display_name');
const Result = require('../../../../core/Result');

class User extends Entity {
  /**
   * 
   * @param {Object} props
   * @param {string} props.displayName
   * @param {string} id 
   */
  static make(props, id) {
    const displayNameOrError = DisplayName.make(props.displayName);
    const passOrError = Result.combine({
      displayName: displayNameOrError,
    });
    if (!passOrError.isSuccessful()) {
      return passOrError;
    }
    return Result.succeed(new User(id, props));
  }

  getDisplayName() {
    return this.m_props.displayName;
  }

  setDisplayName(newDisplayName) {
    const newDisplayNameOrError = DisplayName.make(newDisplayName);
    if (!newDisplayNameOrError.isSuccessful()) {
      return newDisplayNameOrError;
    }
    this.m_props.displayName = newDisplayNameOrError.getValue();
    return Result.succeed(null);
  }

  softDelete() {
    this.m_props.displayName = DisplayName.make('Deleted Account').getValue();
  }
}

module.exports = User;
