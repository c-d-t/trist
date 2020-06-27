const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Account extends Entity
{
  get username()
  {
    return this._value.username;
  }

  get password()
  {
    return this._value.password;
  }

  get email()
  {
    return this._value.email;
  }

  get verified()
  {
    return this._value.verified;
  }

  get hasId()
  {
    return !!this.id;
  }

  changeUsername(newUsername)
  {
    this._value.username = newUsername;
  }

  changePassword(newPassword)
  {
    this._value.password = newPassword;
  }
}

/**
 * Makes an account object
 * @param {Object} props
 * @param {Id} props.id
 * @param {Username} props.username
 * @param {Password} props.password
 * @param {Email} props.email
 * @param {boolean} props.isVerified
 */
function makeAccount(props)
{
  Guard.againstNullBulk([ props.username, props.password, props.email, props.isVerified ]);

  return Result.ok(new Account(props));
}

module.exports = makeAccount;
