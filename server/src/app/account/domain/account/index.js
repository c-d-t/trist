const Entity = require('../../../../core/Entity');
const Result = require('../../../../core/Result');
const Guard = require('../../../../util/Guard');

class Account extends Entity {
  /**
   * Creates an account domain object
   * @param {number} id
   * @param {Object} props
   * @param {Username} props.username
   * @param {Password} props.password
   * @param {string} props.userId
   */
  static make(props, id) {
    const guardedProps = {
      username: props.username,
      password: props.password,
      userId: props.userId,
    };

    const propsOrError = Guard.againstNull(guardedProps);
    if (!propsOrError.isSuccessful()) {
      throw new Error(propsOrError.getError());
    }
    return Result.succeed(new Account(id, props));
  }

  // ------------------ //
  // GETTERS && SETTERS //
  // ------------------ //
  getUsername() {
    return this.m_props.username;
  }

  getPassword() {
    return this.m_props.password;
  }

  getUserId() {
    return this.m_props.userId;
  }
}

module.exports = Account;
