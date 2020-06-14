const Entity = require('../../../../core/Entity');
const Result = require('../../../../core/Result');
const Password = require('../password');

class Account extends Entity {
  /**
   * 
   * @param {Object} props
   * @param {string} props.password
   * @param {string} id 
   */
  static make(props, id) {
    const displayNameOrError = Password.make(props.password);
    const passOrError = Result.combine({
      displayName: displayNameOrError,
    });
    if (!passOrError.isSuccessful()) {
      return passOrError;
    }

    return Result.succeed(new User(id, props));
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

  // ------- //
  // METHODS //
  // ------- //
  async hashPassword() {
    await this.m_props.password.hash();
  }

  async comparePassword(rawPassword) {
    await this.m_props.password.compare(rawPassword);
  }
}

module.exports = Account;
