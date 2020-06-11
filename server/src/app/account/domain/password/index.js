const Result = require('../../../../core/Result');
const bcrypt = require('bcrypt');

class Password {
  constructor(value, isHashed) {
    this.m_value = value;
    this.m_isHashed = isHashed;
  }

  static make(value, isHashed = false) {
    if (!value.length || value.length < 8) {
      return Result.fail({ 'password': 'minimum of 8 characters.' });
    }

    return Result.succeed(new Password(value, isHashed));
  }

  async hash() {
    if (this.m_isHashed) {
      throw new Error('Cannot hash a password that is already hashed.');
    }

    this.m_value = await bcrypt.hash(this.m_value, 10);
    this.m_isHashed = true;
  }

  async compare(rawPassword) {
    return await bcrypt.compare(rawPassword, this.m_value);
  }

  toString() {
    if (!this.m_isHashed) {
      throw new Error('Cannot get an unhashed password. Hash it first with \'hash()\'');
    }
    return this.m_value;
  }

  equals(otherPassword) {
    if (!otherPassword.toString()) {
      return false;
    }

    return otherPassword.toString() === this.m_value;
  }
}

module.exports = Password;
