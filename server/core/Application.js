class Application
{
  ok(data)
  {
    return { success: true, data };
  }

  /**
   * Returns as failed and the type of error.
   * @param {number} errorType 
   */
  failed(errorType)
  {
    return { success: false, errorType: errorType };
  }
}

module.exports = Application;
