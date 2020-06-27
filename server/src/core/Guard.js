const Result = require("./Result");

function againstNull(value)
{
  if (value === undefined || value === null)
  {
    throw new Error('ERR_MISSING_OR_UNDEFINED');
  }
}

/**
 * Checks an array against null
 * @param {Array} values 
 */
function againstNullBulk(values)
{
  values.forEach((value) => {
    againstNull(value);
  });
}

module.exports = {
  againstNull,
  againstNullBulk,
};
