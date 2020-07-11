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

  forbidden(message)
  {
    return this.failed(3, message);
  }
  
  notFound(message)
  {
    return this.failed(4, message)
  }
  
  invalidFields(message)
  {
    return this.failed(9, message);
  }
}

module.exports = Application;
