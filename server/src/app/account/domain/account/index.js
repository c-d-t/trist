const Entity = require('../../../../core/Entity');
const Result = require('../../../../core/Result');
const Guard = require('../../../../util/Guard');
const Username = require('../username');
const Password = require('../password');

class Account extends Entity {
  /**
   * Creates an account domain object
   * @param {Object} props
   * @param {string} props.username
   * @param {string} props.password
   * @param {number} id
   */
  static make(props, id) {
    const usernameOrError = Username.make(props.username);
    const passwordOrError = Password.make(props.password);
    
    const passOrError = Result.combine({
      username: usernameOrError,
      password: passwordOrError,
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

  getPassword() {
    return this.m_props.password;
  }

  setPassword(newPassword) {
    const newPasswordOrError = Password.make(newPassword);
    if (!newPasswordOrError.isSuccessful()) {
      return newPasswordOrError;
    }
    this.m_props.password = newPasswordOrError.getValue();
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
    this.m_props.username = Username.make('deleted');
    this.m_props.password = Password.make('deleted', true);
  }

  async hashPassword() {
    await this.m_props.password.hash();
  }

  async comparePassword(rawPassword) {
    await this.m_props.password.compare(rawPassword);
  }
}

module.exports = Account;
