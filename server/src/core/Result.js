class Result {
  constructor(isSuccessful, result) {
    this.m_isSuccessful = isSuccessful;
    this.m_result = result;
  }

  // -------- //
  // CREATORS //
  // -------- //
  static succeed(value) {
    return new Result(true, value);
  }

  static fail(error) {
    return new Result(false, error);
  }

  // ------------------ //
  // GETTERS && SETTERS //
  // ------------------ //
  isSuccessful() {
    return this.m_isSuccessful;
  }

  getValue() {
    if (!this.m_isSuccessful) {
      throw new Error('Cannot get value of unsuccessful result. Try \'getError()\' instead.');
    }

    return this.m_result;
  }

  getError() {
    if (this.m_isSuccessful) {
      throw new Error('Cannot get error of successful result. Try \'getValue()\' instead.');
    }

    return this.m_result;
  }

  // ------- //
  // METHODS //
  // ------- //
  /**
   * Combines an object of results into a single result.
   * @param {Object} results The result objects to combine.
   */
  static combine(results) {
    const errors = {};
    Object.keys(results).forEach((name) => {
      if (!results[name].isSuccessful()) {
        errors[name] = results[name].getError();
      }
    })
    if (Object.keys(errors).length > 0) {
      return this.fail(errors);
    }
    return this.succeed(null);
  }
}

module.exports = Result;
