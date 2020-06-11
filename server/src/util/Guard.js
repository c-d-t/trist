const Result = require('../core/Result');

/**
 * Checks if any value in an object is undefined or null.
 * @param {Object} toCheck The values to check
 * @returns Result
 */
const againstNull = (toCheck) => {
  const errors = {};
  Object.keys(toCheck).forEach((name) => {
    if (toCheck[name] === null || toCheck[name] === undefined) {
      errors[name] = `cannot be null or undefined.`;
    }
  });
  if (Object.keys(errors).length > 0) {
    return Result.fail(errors);
  }
  return Result.succeed(null);
};

module.exports = {
  againstNull,
};
