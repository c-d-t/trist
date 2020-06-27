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
  failed(errorType, message)
  {
    return { success: false, data: { errorType, message } };
  }
}

module.exports = Application;
