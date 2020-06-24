class Result
{
  constructor(isSuccessful, value)
  {
    this._isSuccessful = isSuccessful;
    this._value = value;
  }

  get succeeded()
  {
    return this._isSuccessful;
  }

  get failed()
  {
    return !this._isSuccessful;
  }

  get error()
  {
    if (this._isSuccessful)
    {
      throw new Error('Cannot get error from successful result.');
    }
    return this._value;
  }

  get value()
  {
    if (!this._isSuccessful)
    {
      throw new Error('Cannot get value from failed result.');
    }
    return this._value;
  }
}

/**
 * Combines multiple results in an object 
 * @param {Object} results 
 * @returns Result
 */
function combine(results)
{
  const errors = {};
  const values = {};
  Object.keys(results).forEach((name) => {
    if (results[name].failed())
    {
      errors[name] = results[name].error;
    }
    else
    {
      values[name] = results[name].value;
    }
  });
  if (Object.keys(errors).length > 0)
  {
    return fail(errors);
  }
  return ok(values);
}

/**
 * Creates a successful result
 * @param {any} value 
 */
function ok(value)
{
  return new Result(true, value);
}

/**
 * Creates a failed result
 * @param {any} error 
 */
function fail(error)
{
  return new Result(false, error);
}

module.exports = {
  combine,
  ok,
  fail,
};
