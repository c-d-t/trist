const Entity = require('../../../../core/Entity');
const Result = require('../../../../core/Result');
const Guard = require('../../../../util/Guard');
const Username = require('../username');
const DisplayName = require('../display_name');

class Account extends Entity {
  /**
   * Creates an account domain object
   * @param {Object} props
   * @param {string} props.username
   * @param {string} props.displayName
   */
  static make(props, id) {
    const usernameOrError = Username.make(props.username);
    const displayNameOrError = DisplayName.make(props.displayName);
    const passOrError = Result.combine({
      username: usernameOrError,
      displayName: displayNameOrError,
    });
    if (!passOrError.isSuccessful()) {
      return passOrError;
    }

    return Result.succeed(new Account(id, props));
  }

  // ------------------ //
  // GETTERS && SETTERS //
  // ------------------ //
  getUsername() {
    return this.m_props.username;
  }

  setUsername(newUsername) {
    const newUsernameOrError = Username.make(newUsername);
    if (!newUsernameOrError.isSuccessful()) {
      return newUsernameOrError;
    }
    this.m_props.username = newUsernameOrError.getValue();
    return Result.succeed(null);
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

  // ------- //
  // METHODS //
  // ------- //
  softDelete() {
    this.m_props.displayName = DisplayName.make('Deleted Account').getValue();
    this.m_props.username = Username.make('deleted_account');
  }
}

module.exports = Account;
